import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

declare const getCurrentDate: any;
declare var $: any;

export class AppModule {
}
@Component({
  selector: 'app-user',
  templateUrl: './userstatementsreport.component.html',
  styleUrls: ['./userstatementsreport.component.css'],
  providers: [DatePipe]

})
export class UserStatementsReportComponent implements OnInit {
  fromdate: string ='';
  todate: string = '';
  name: string= '';
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
  constructor(private datePipe: DatePipe,private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService,) {
    this.fromdate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.todate = this.datePipe.transform(this.myDate,'yyyy-MM-dd');
    this.filename_date = this.datePipe.transform(this.myDate,'dd-MM-yyyy');
  }
  ngOnInit(): void {
    
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
   statemntsReport(){
    var fromdate = this.fromdate;
    var todate = this.todate;
    var report_option = this.report_option;
    var repType = '';
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    console.log(this.dto.token);
    if(this.report_option =='')
    {
      this.report_option = 'excel';
    }
    this.filename = "userStatementsReport"+"_"+this.filename_date;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token).set('Accept', 'application/json').set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.set('fromdate',this.fromdate).set('todate',this.todate).set("name",this.name).set('report_option', this.report_option);
     if(this.report_option == 'excel')
        {
           repType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        }
        if(this.report_option == 'pdf')
        {
            repType = 'application/pdf';
        }
        if(this.report_option == "csv")
        {
          repType = "application/vnd.ms-excel";
        }
      this.http.get(this.funct.ipaddress + 'user/userstatementsreport', { params: params, headers: headers,responseType: 'arraybuffer'})
      .subscribe(data => {
        var file = new Blob([data],{type: repType});
        var fileURL = URL.createObjectURL(file);
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.download = this.filename;
        fileLink.click();
        this.dtTrigger.next();
        this.spinner.hide();
        });
  }
}
