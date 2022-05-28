import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr'; 
import { Subject } from 'rxjs';
import { isThisQuarter } from 'date-fns';
import { Console } from 'console';
import { th } from 'date-fns/locale';

declare var $: any;

@Component({
  selector: 'app-userforgotpassword',
  templateUrl: './userforgotpassword.component.html',
  styleUrls: ['./userforgotpassword.component.css']
})
export class UserforgotpasswordComponent implements OnInit {

  @ViewChild(DataTableDirective)
  token: any;
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
 

  dtElement3: DataTableDirective;
  dtOptions3: DataTables.Settings = {};
  dtTrigger3: Subject<any> = new Subject();

  dtElement4: DataTableDirective;
  dtOptions4: DataTables.Settings = {};
  dtTrigger4: Subject<any> = new Subject();
 
  dtElement5: DataTableDirective;
  dtOptions5: DataTables.Settings = {};
  dtTrigger5: Subject<any> = new Subject();
 
 
  approveFromDate: string = '';  
  pendingFromDate: string = '';
  deniedFromDate: string = '';
  status: string = '';
  accountNo: string = '';
  approvephoneno: string = ''; 
  pendingphoneno: string = '';
  deniedphoneno: string = '';
  inactivatedphoneno: string= '';
  
  fgpwdapproveList: any; 
  fgpwdppengingList: any;
  fgpwddeniedList: any;
  fgpinactivatedList: any;

  idIndex: any;
  idapproveIndex: any; 
  idpendingIndex: any;
  iddeniedIndex: any; 
  inactivatedIndex: any;
  approvefromdate: any; 
  pendingfromdate: any;
  deniedfromdate: any;
 

  todate : any; //add this
  approvetodate :any;
  approveToDate : any; 
  pendingtodate : any;
  pendingToDate : any; 
  deniedtodate : any;
  deniedToDate : any;
   
  approvetodaytodate : any;
  addedtodaytodate : any;
  pendingtodaytodate : any;
  deniedtodaytodate : any;
   
  alltodatechangeDate : any; //add this
  approvetodatechangeDate : any;
  pendingtodatechangeDate : any;
  deniedtodatechangeDate : any;
  addedtodatechangeDate : any;
  
  
 

  approvetodayDate: any;
  addtodayDate: any;
  pendingtodayDate: any;
  deniedtodayDate: any;
  alltodayDate: any;

  approvechangeDate: any;
  addedchangeDate: any;
  pendingchangeDate: any;
  deniedchangeDate: any;
  allchangeDate: any;

  tranNo2 : any;
  totalAmount2 : any;
  admin_name2 : any; 
  accountDetailList : any;
  total_today_reach_amt : any;
  total_my_amount :any;
  accidIndex : any;

  constructor(private storage: LocalStorageService,private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,private toastr: ToastrService, private datepipe: DatePipe) { 
    this.idIndex = 1;
    this.idapproveIndex = 1; 
    this.idpendingIndex = 1;
    this.iddeniedIndex = 1;
    this.inactivatedIndex = 1;
    this.accidIndex = 1;

    this.approvefromdate = new Date(); 
    this.approvetodayDate = this.datepipe.transform(this.approvefromdate, 'MMM dd, yyyy'); 
 
    this.pendingfromdate = new Date(); 
    this.pendingtodayDate = this.datepipe.transform(this.pendingfromdate, 'MMM dd, yyyy'); 

    this.deniedfromdate = new Date(); 
    this.deniedtodayDate = this.datepipe.transform(this.deniedfromdate, 'MMM dd, yyyy'); 
  
    this.approvetodate = new Date();  //add this 
    this.approvetodaytodate = this.datepipe.transform(this.approvetodate, 'MMM dd, yyyy');

  
    this.pendingtodate = new Date();  //add this 
    this.pendingtodaytodate = this.datepipe.transform(this.pendingtodate, 'MMM dd, yyyy');

    this.deniedtodate = new Date();  //add this 
    this.deniedtodaytodate = this.datepipe.transform(this.deniedtodate, 'MMM dd, yyyy');
 
    this.pendingSearch(); 
  }
  ngOnInit(): void {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  
    this.dtOptions1 = {
      responsive: true,
      order: []
    }
  
    this.dtOptions3 = {
      responsive: true,
      order: []
    } 
  

    this.dtOptions4 = {
      responsive: true,
      order: []
    }
    this.dtOptions5 = {
      responsive: true,
      order: []
    }
   
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload();
      }, 5);
    }
    else {
      this.storage.clear('loadFlag');
    } 
  }
 

  onChangeApproveFromDate() {
    $(document).ready(function () {
      this.approveFromDate = $("#approvefromdate").val();
    });
  }

  onChangeApproveToDate()
  {
    $(document).ready(function () {
      this.approvetoDate = $("#approvetodate").val();
    });
  }
 

  onChangePendingFromDate() {
    $(document).ready(function () {
      this.pendingFromDate = $("#pendingfromdate").val();
    });
  }

  onChangePendingToDate()
  {
    $(document).ready(function () {
      this.pendingtoDate = $("#pendingtodate").val();
    });
  }

  onChangeDeniedFromDate() {
    $(document).ready(function () {
      this.deniedFromDate = $("#deniedfromdate").val();
    });
  }

  onChangeDeniedToDate()
  {
    $(document).ready(function () {
      this.deniedtoDate = $("#deniedtodate").val();
    }); 
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 500)
    {
      this.spinner.hide();
      this.toastr.error('Please check connection', 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
    if(error.status == 403)
    {
      this.spinner.hide(); 

      var id2 = 'tblapproveTopup' + this.idapproveIndex;
      var table2 = $('#' + id2).DataTable();
  
      var id4 = 'tblpendingTopup' + this.idpendingIndex;
      var table4 = $('#' + id4).DataTable();

      var id5 = 'tbldeniedTopup' + this.iddeniedIndex;
      var table5 = $('#' + id5).DataTable();

      var id6  = 'tblinactivate' + this.inactivatedIndex;
      var table6 =  $('#' + id6).DataTable();
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
  
  approveSearch() {
    this.fgpwdapproveList = [];
    var id = 'tblapprove' + this.idapproveIndex;
    var table = $('#' + id).DataTable();
    this.dto.token = this.storage.retrieve('token');
    table.destroy();
    this.idapproveIndex = this.idapproveIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.approveFromDate = $("#approveFromDate").val();
    this.approveToDate = $("#approveToDate").val();
    console.log("this.approveDate>> " + this.approveToDate);
    if (this.approveToDate == '' || this.approveToDate == undefined) {
      console.log("date if case");
      this.approvechangeDate = this.approvetodayDate;
    }
    else {
      console.log("date else case");
      this.approvechangeDate = this.approveFromDate;
    }

    if (this.approveToDate == '' || this.approveToDate == undefined) {
      this.approvetodatechangeDate = this.approvetodaytodate;
    }
    else {
      console.log("date else case");
      this.approvetodatechangeDate = this.approveToDate;
    }
    console.log("Approve todate change date is : "+ this.approvetodatechangeDate)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('requestStatus','1')
    .set('fromDate', this.approvechangeDate)
    .set("toDate",this.approvetodatechangeDate) 
    .set('phoneno', this.approvephoneno.trim());
  
    this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordGetAllRequestData',{ params: params, headers : headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.fgpwdapproveList = this.dto.Response;//data.userFinancialTransactionDTOList;
        console.log ( JSON.stringify(this.dto.Response));
        this.approvephoneno = '';
        this.approveFromDate = '';
        this.dtTrigger1.next();
        this.spinner.hide();
      });
  }
 

  pendingSearch(){
    console.log ("Active Tab");
    this.fgpwdppengingList = [];
    var id = 'tblpending' + this.idpendingIndex; 
    var table = $('#' + id).DataTable(); 
    table.destroy();
    console.log(id);
    this.idpendingIndex = this.idpendingIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.pendingFromDate = $("#pendingFromDate").val();
    this.pendingToDate = $("#pendingToDate").val();

    if (this.pendingFromDate == '' || this.pendingFromDate == undefined) {
      console.log("date if case");
      this.pendingchangeDate = this.pendingtodayDate;
    }
    else {
      console.log("date else case");
      this.pendingchangeDate = this.pendingFromDate;
    }

    if (this.pendingToDate == '' || this.pendingToDate == undefined) {
      console.log("date if case");
      this.pendingtodatechangeDate = this.pendingtodaytodate;
    }
    else {
      console.log("date else case");
      this.pendingtodatechangeDate = this.pendingToDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    console.log(this.dto.token);
    params = params.set('requestStatus','0')
    .set('fromDate', this.pendingchangeDate)
    .set("toDate",this.pendingtodatechangeDate) 
    .set('phoneno', this.pendingphoneno); 
   //user-financial/topups-by-params { params: params, headers: headers }
    this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordGetAllRequestData',{ params: params, headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.fgpwdppengingList = this.dto.Response; //.data.userFinancialTransactionDTOList;
        this.pendingphoneno = '';
        this.pendingFromDate = '';
        this.dtTrigger3.next();
        this.spinner.hide();
      });
  }

  inActivedUserSearch(){
    this.fgpinactivatedList = [];
    var id = 'tblinactivate' + this.inactivatedIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.inactivatedIndex = this.inactivatedIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    params = params.set('phoneno', this.inactivatedphoneno);
     console.log("Phone no" + this.inactivatedphoneno);
     console.log("ip addres  " +this.funct.ipaddress);
    this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordInActivedUserList',{headers: headers, params: params})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.fgpinactivatedList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        console.log(JSON.stringify(this.dto.Response));
        this.inactivatedphoneno = ''; 
        this.dtTrigger5.next();
        this.spinner.hide();
      });

  }
  reActive(phone_no){
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
  
    var formData = new FormData();  
    formData.append("phone_no", phone_no); 
    this.http.post(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordReActiveByPhoneNo', formData,{ headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;  
        if (this.dto.Response.status == 'Success'){
          this.spinner.hide();
          this.router.navigate(['/userforgotpassword']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          });
        } 
      }
    );
  }
  rejectedSearch(){
    this.fgpwddeniedList = [];
    var id = 'tbldenied' + this.iddeniedIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.iddeniedIndex = this.iddeniedIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.deniedFromDate = $("#deniedFromDate").val();
    this.deniedtodate = $("#deniedToDate").val();

    if (this.deniedFromDate == '' || this.deniedFromDate == undefined) {
      console.log("date if case");
      this.deniedchangeDate = this.deniedtodayDate;
    }
    else {
      console.log("date else case");
      this.deniedchangeDate = this.deniedFromDate;
    }

    if (this.deniedToDate == '' || this.deniedToDate == undefined) {
      console.log("date if case");
      this.deniedtodatechangeDate = this.deniedtodaytodate;
    }
    else {
      console.log("date else case");
      this.deniedtodatechangeDate = this.deniedToDate;
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    params = params.set('requestStatus','4')
    .set('fromDate', this.deniedchangeDate)
    .set("toDate",this.deniedtodatechangeDate) 
    .set('phoneno', this.deniedphoneno);

 
    this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordGetAllRequestData',{headers: headers, params: params})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.fgpwddeniedList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        this.deniedphoneno = '';
        this.deniedFromDate = '';
        this.dtTrigger4.next();
        this.spinner.hide();
      });
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }  
  ngOnDestroy(): void {
    this.dtTrigger3.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger4.unsubscribe();
    this.dtTrigger5.unsubscribe(); 
  }
}
