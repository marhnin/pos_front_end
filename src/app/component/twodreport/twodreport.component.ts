import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'; 
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

declare const getCurrentDate: any;
declare var $: any;

export class AppModule {
}
@Component({
  selector: 'app-user',
  templateUrl: './twodreport.component.html',
  styleUrls: ['./twodreport.component.css'],
  providers: [DatePipe]

})
export class TwoReportComponent implements OnInit {
  fromdate: string ='';
  todate: string = '';
  section: string= '';
  report_option : string ='';
  choose_msg : string = '';
  isActive : boolean = false;
  ispdfActive : boolean = false;
  iscsvActive : boolean = false;
  dtTrigger: Subject<any> = new Subject();
  clickkbzpay: any = true;
  clickwavepay: any = false;
  csvrep: any = false;
  filename : string = "";
  filename_date :any ;
  grand_total : any;
  twodBetRptList = [];
  twodBetPdfRptList =[];
  myDate = new Date();
  adminObj : any;
  ad_name : any;
  constructor(private toastr: ToastrService,private datePipe: DatePipe,private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService,) {
    this.fromdate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.filename_date = this.datePipe.transform(this.myDate,'dd-MM-yyyy HH:mm:ss');
  }
  ngOnInit(): void {
    this.getCurrentAdmin();
  }

  getCurrentAdmin() {
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',this.dto.token);
    this.http.get(this.funct.ipaddress + 'admin/GetCurrentAdminDetail', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adminObj = this.dto.Response;
        this.ad_name = this.adminObj.name;
      }
    );
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
    return throwError(error);
    }
    OkLogout()
    {
      window.location.href ="./ad-login";
    } 

  getReportOption(options)
  {
    this.report_option = options;
    this.choose_msg = "You choose "+this.report_option;
    if(options == "excel")
    {
       this.clickkbzpay =true;
       this.clickwavepay = false;
       this.csvrep =false;
    }
    if(options == "pdf")
    {
       this.clickkbzpay =false;
       this.clickwavepay = true;
       this.csvrep =false;
    }
    if(options == "csv")
       {
        this.clickkbzpay =false;
        this.clickwavepay = false;
        this.csvrep =true;
       }
   }

    /*name of the excel-file which will be downloaded. */ 
fileName= 'ExcelSheet.xlsx';  
exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       /* save to file */
       XLSX.writeFile(wb, this.filename);
    }

   twodReport(){
    var fromdate = this.fromdate;
    var todate = this.todate;
    var section = this.section;
    var report_option = this.report_option;
    var repType = '';
    var grand_total = 0;
    this.spinner.show();
    this.twodBetRptList = [];
    this.twodBetPdfRptList =[];
    this.dto.token = this.storage.retrieve('token');
    if(this.report_option =='')
    {
      this.report_option = 'excel';
    }
    this.filename = "twoDBetHistory"+section+"_"+this.filename_date;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);//.set('Accept', 'application/json').set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.set('fordate',this.fromdate).set('section',this.section).set('report_option', this.report_option);
     if(this.report_option == 'excel')
        {
           repType = ".xlsx";
        }
        if(this.report_option == 'pdf')
        {
            repType = ".pdf";
        }
        if(this.report_option == "csv")
        {
          repType = ".csv";
        }
      this.http.get(this.funct.ipaddress + 'twodreport/twodhistoryreport', { params: params, headers: headers})
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(data => {
        this.spinner.hide();
        this.dto.Response = {};
        this.dto.Response = data;
        this.dto.Response.forEach((row: any) => {
          var result = row.total_amount_Str.toString().replace(/,/g, "");
          grand_total = grand_total + parseInt(result) ;
          this.twodBetRptList.push(Object.values(row))
          this.twodBetPdfRptList.push(Object.values(row));
        })
        if(this.report_option == "pdf")
        {
          var pdfname = this.filename + repType;
          var totalList = ['', '', '', 'Grand Total',grand_total.toLocaleString()];
          this.twodBetPdfRptList.push(totalList)
          this.convert(this.twodBetPdfRptList,pdfname);
        }
        if(this.report_option == "excel")
        {
                // Excel Title, Header, Data
                var title = '';
                if(this.section == ''){
                   title = 'TwoD Bet History Report (All)';
                }
                else
                   title = 'TwoD Bet History Report ('+this.section+')';
                const header = ['No', 'Bet Date', 'Bet Time', '2D Number', 'Amount'];
                // Create workbook and worksheet
                const workbook = new Workbook();
                const worksheet = workbook.addWorksheet('TwoD Bet History Report');
                // Add Row and formatting
                const titleRow = worksheet.addRow([title]);
                titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
                worksheet.addRow([]);
                const subTitleRow = worksheet.addRow(['Printed Date/Time : '+this.filename_date]);
                worksheet.mergeCells('A3:D3');
                worksheet.mergeCells('A1:D2');
                  // Blank Row
                worksheet.addRow(['Printed By : '+this.ad_name]);
                worksheet.mergeCells('A4:D4');
                  // Add Header Row
                const headerRow = worksheet.addRow(header);
                  // Cell Style : Fill and Border
                  headerRow.eachCell((cell, number) => {
                  cell.fill = {
                  type: 'gradient',
                  gradient: 'angle',
                  degree: 0,
                  stops: [
                    {position:0, color:{argb:'FF0000FF'}},
                    {position:0.5, color:{argb:'FFFFFFFF'}},
                    {position:1, color:{argb:'FF0000FF'}}
                  ],
                  };
                  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                  cell.alignment = {horizontal:'center' };
                  });
                  // Add Data and Conditional Formatting
                  var tot = 0;
                  this.twodBetRptList.forEach(d => {
                  const row = worksheet.addRow(d);
                  const qty = row.getCell(5).value;
                  var result = qty.toString().replace(/,/g, "");
                  tot = parseInt(result) + tot;
                  row.alignment = {horizontal :'center',wrapText: true}
                  }
              );
              worksheet.getColumn(2).width = 25;
              worksheet.getColumn(4).width = 15;
              worksheet.getColumn(5).alignment = { horizontal: 'right', wrapText: true };
              // Footer Row
              const footerRow = worksheet.addRow([]);
              footerRow.getCell(4).value = 'Grand Total';
              footerRow.getCell(5).value = tot.toLocaleString();
              footerRow.getCell(4).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFCCFFE5' }
              };
              footerRow.getCell(4).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
              footerRow.getCell(5).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFCCFFE5' }
              };
              footerRow.getCell(5).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
           
              workbook.xlsx.writeBuffer().then((data: any) => {
              const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              fs.saveAs(blob, this.filename + repType);
              });
        }
        if(this.report_option == 'csv')
        {
           this.downloadFile(data, this.filename+repType)
        }
          this.toastr.success('2D Bet History Report success', 'Success!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        this.spinner.hide();
        });
  }

  convert(list, pdfname){
      var doc = new jsPDF('p', 'pt','a4');
      const head = [['No', 'Bet Date', 'Bet Time', '2D Number', 'Amount']];
      doc.setFontSize(12);
      doc.setTextColor(0);
      var tot = 0;
      var rows1 = [];
      rows1.push("Total = "+40);
      var title = '';
      if(this.section == ''){
         title = '2D Bet History Report (All)';
      }
      else
         title = '2D Bet History Report ('+this.section+')';
      doc.text(title, 40, 20);
      doc.text('Printed By : '+this.ad_name+' - Printed Date : '+this.filename_date,40,40);
      autoTable(doc,
      {
      head: head,
      body: list,
      startY: 50,
      styles: { overflow: "linebreak" },
      didDrawCell: (list) => {
      },
      didParseCell:(list)=>{
        var rows = list.table.body;
        if (list.row.index === rows.length - 1) {
            list.cell.styles.fillColor = [239, 154, 154];
        }
      }
      })
      doc.save(pdfname);
      }
      downloadFile(data, filename) {
        let csvData = this.ConvertToCSV(data, ['sr_no','twod_number', 'bet_date_Str','bet_time','total_amount_Str']);
        console.log(csvData)//'\ufeff' +
        let blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      let row = '';
      for (let index in headerList) {
          row += headerList[index] + ',';
      }
      row = row.slice(0, -1);
      str += row + '\r\n';
      for (let i = 0; i < array.length; i++) {
          let line = '';
          for (let index in headerList) {
             let head = headerList[index];
             var d = array[i][head];
             if(d != null)
             {
             if(d.toString().includes(","))
                d = d.toString().replace(/,/g, "");
             }
             line +=  d + ",";
          }
          line = line.slice(0,-1);
          str += line + '\r\n';
      }
    return str;
    }
}
