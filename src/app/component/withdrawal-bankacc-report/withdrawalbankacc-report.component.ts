import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx'; 
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable'

import { IMultiSelectOption  } from 'ngx-bootstrap-multiselect';
import {IMultiSelectSettings } from 'ngx-bootstrap-multiselect';
import {IMultiSelectTexts} from 'ngx-bootstrap-multiselect';


declare const getCurrentDate: any;
declare var $: any;

export class AppModule {
}
@Component({
  selector: 'app-user',
  templateUrl: './withdrawalbankacc-report.component.html',
  styleUrls: ['./withdrawalbankacc-report.component.css'],
  providers: [DatePipe]

})
export class WithdrawalBankAccReportComponent implements OnInit {
  fromdate: string ='';
  todate: string = '';
  status: string= '';
  type: string= '';
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
  myDate = new Date();
  userFinancialRptList = [];
  userFinancialRptPdfList = [];
  adminList = [];
  adminObj : any;
  ad_name : any;
  myOptions: IMultiSelectOption[];
  myUpdOptions: IMultiSelectOption[];
  optionsModel: number[];
  codeNumberList = [];
  mycodeOptions: IMultiSelectOption[];
  codeoptionsModel: number[];
  mySettings: IMultiSelectSettings;
  myTexts: IMultiSelectTexts;

  constructor(private toastr: ToastrService,private datePipe: DatePipe,private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService,) {
    this.fromdate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.filename_date = this.datePipe.transform(this.myDate,'dd-MM-yyyy');
  }
  ngOnInit(): void {
    this.getCurrentAdmin();
    this.getAllAdmins();
    this.getAccountCodeNumber();

    // Settings configuration
    this.mySettings = {
      enableSearch: true,
      checkedStyle: 'checkboxes',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true,
      showCheckAll : true,
      showUncheckAll : true,
      autoUnselect : true,
      pullRight : false,
      closeOnSelect : false
    };

    // Text configuration
    this.myTexts = {
      checkAll: 'Select all',
      uncheckAll: 'Unselect all',
      checked: 'item selected',
      checkedPlural: 'items selected',
      searchPlaceholder: 'Find',
      searchEmptyResult: 'Nothing found...',
      searchNoRenderText: 'Type in search box to see results...',
      defaultTitle: 'Select',
      allSelected: 'All selected',
    };

  }

  ngAfterContentChecked() {
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
  getAllAdmins()
  {
    this.adminList =[];
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token );
    this.http.get(this.funct.ipaddress + 'admin/GetAllAdmin', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adminList = this.dto.Response;
        this.myOptions = this.adminList;
      }
    );
  }
  getAccountCodeNumber()
  {
    this.adminList =[];
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token );
    this.http.get(this.funct.ipaddress + 'transaction/getAccountCodeNumber', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("Code number list is :  "+this.dto.Response)
        this.codeNumberList = this.dto.Response;
        this.mycodeOptions = this.codeNumberList;
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
   onChange() {
    console.log("in onchange "+ this.optionsModel);
  }
 onChangeCode()
  {
    console.log("in onchange code "+ this.codeoptionsModel);
  }
   bankAccountDetailReport(){
    var repType = '';
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.userFinancialRptList = [];
    this.userFinancialRptPdfList = [];
    var grand_total = 0;
    if(this.report_option == '')
    {
      this.report_option = 'excel';
    }
    this.filename = "withdrawalbankAccountDetail_"+this.filename_date;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    var formData = new FormData();
    console.log("Code number lenght : "+this.codeoptionsModel.length)
   
    if(this.optionsModel.length == 0 && this.codeoptionsModel.length == 0)
    {
      this.toastr.error('Please select account holder', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      this.spinner.hide();
      return;
    }
    formData.append("fromdate", this.fromdate);
    formData.append("todate", this.todate);
    formData.append("adminId", this.optionsModel.toString());
    //formData.append("codeNumbes",this.codeoptionsModel.toString())
     if(this.report_option == 'excel')
        {
           repType = '.xlsx';
        }
        if(this.report_option == 'pdf')
        {
            repType = '.pdf';
        }
        if(this.report_option == "csv")
        {
          repType = '.csv';
        } 
      this.http.post(this.funct.ipaddress + 'userfinancialreport/withdrawalbankaccountdetailreport', formData, { headers: headers})
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(data => {
        this.spinner.hide();
        this.dto.Response = {};
        this.dto.Response = data;
        this.dto.Response.forEach((row: any) => {
          var result = row.amount.toString().replace(/,/g, "");
          grand_total = grand_total + parseInt(result) ;
          this.userFinancialRptList.push(Object.values(row));
          this.userFinancialRptPdfList.push(Object.values(row));
        })
        if(this.report_option == "pdf")
        {
          var pdfname = this.filename + repType;
          var totalList = ['', '', '', '','','','Grand Total',grand_total.toLocaleString()];
          this.userFinancialRptList.push(totalList)
          this.convert(this.userFinancialRptList,pdfname);
        }
      if(this.report_option == "excel")
      {
      const title = 'Withdrawal Bank Account Report';
      const header = ['No', 'Requested Date','Approved Date','Requested By','Account Number','Bank Type','Approved By','Amount'];
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Withdrawal Bank Account Report');
      const titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
      worksheet.addRow([]);
      const subTitleRow = worksheet.addRow(['Printed Date : '+this.filename_date]);
      worksheet.mergeCells('A3:D3');
      worksheet.mergeCells('A1:D2');
      worksheet.addRow(['Printed By : '+this.ad_name]);
      worksheet.mergeCells('A4:C4');
      const headerRow = worksheet.addRow(header);
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
        this.userFinancialRptList.forEach(d => {
        const row = worksheet.addRow(d);
        const qty = row.getCell(8).value;
        var result = qty.toString().replace(/,/g, "");
        tot = parseInt(result) + tot;
        row.getCell(8).alignment = {horizontal : 'right'}
        }
      );
      worksheet.getColumn(2).width = 25;
      worksheet.getColumn(3).width = 25;
      worksheet.getColumn(4).width = 25;
      worksheet.getColumn(5).width = 25;
      worksheet.getColumn(6).width = 25;
      worksheet.getColumn(7).width = 25;

      //worksheet.addRow([]); 

      // Footer Row
      const footerRow = worksheet.addRow([]);
      footerRow.getCell(7).value = 'Grand Total';
      footerRow.getCell(8).value = tot.toLocaleString();
      footerRow.getCell(8).alignment = {horizontal : 'right'};
      footerRow.getCell(7).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(7).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      footerRow.getCell(7).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
      };
      footerRow.getCell(8).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
     
      workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, this.filename + repType);
      });
   }
   if(this.report_option == 'csv')
   {
      this.downloadFile(data, this.filename+repType)
   }
            this.toastr.success('Withdrawal Bank Account Detail Reporting', 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          this.spinner.hide();
          });
  }
  convert(list, pdfname){
    var doc = new jsPDF('p', 'pt','a4');
    const head = [['No', 'Requested Date','Approved Date','Requested By','Account Number','Bank Type','Approved By','Amount']];
    // define custom font
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Withdrawal Bank Account Report', 40, 20);
    doc.text('Printed By: '+this.ad_name+' - From Date : '+this.fromdate+' - To Date : '+this.todate,40,40);
    doc.text('Printed Date : '+this.filename_date,40,60);   
    autoTable(doc,
    {
    head: head,
    body: list,
    startY: 75,
    styles: { 
      overflow: "linebreak",
      font : "Pyidaungsu-1.8_Regular"
  },
    didDrawCell: (list) => {
      if (list.section === 'body') {
      }
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
      let csvData = this.ConvertToCSV(data, ['sr_no', 'created_date_Str', 'updated_date_Str', 'userName', 'account_no','bankName','amount']);
      console.log(csvData)
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
