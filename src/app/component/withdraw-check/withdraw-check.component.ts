import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { ToastrService } from 'ngx-toastr';


import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-withdraw-check',
  templateUrl: './withdraw-check.component.html',
  styleUrls: ['./withdraw-check.component.css']
})
export class WithdrawCheckComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dtElement1: DataTableDirective;
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();

  dtElement2: DataTableDirective;
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject();

  dtElement3: DataTableDirective;
  dtOptions3: DataTables.Settings = {};
  dtTrigger3: Subject<any> = new Subject();

  dtElement4: DataTableDirective;
  dtOptions4: DataTables.Settings = {};
  dtTrigger4: Subject<any> = new Subject();

  status: string = '';

  singleDate: string = '';
  pendingDate: string = '';
  checkedDate: string = '';
  approveDate: string = '';
  deniedDate: string = '';

  accountNo: string = '';
  pendingaccountNo: string = '';
  checkedaccountNo: string = '';
  approveaccountNo: string = '';
  deniedaccountNo: string = '';

  withdrawList: any;
  withdrawPendingList: any;
  withdrawCheckedList: any;
  withdrawApproveList: any;
  withdrawDeniedList: any;

  idIndex: any;
  idpendingIndex: any;
  idcheckedIndex: any;
  idapproveIndex: any;
  iddeniedIndex: any;

  date: any;
  pendingdate: any;
  checkeddate: any;
  approvedate: any;
  denieddate: any;
  
  //add the following vars
  alltoDate: string = ''; 
  alltodate : any;
  alltodaytodate : any;
  alltodaytodatechangeDate : any;
  alltodatechangeDate : any; 
  pendingtodate : any;
  pendingtoDate : any;
  pendingtodaytodate : any;
  pendingtodatechangeDate : any;
  addedtoDate : any;
  addedtodate : any;
  addedtodaytodate : any;
  addedtodatechangeDate : any;
  approvetodate :any;
  approvetoDate : any;
  approvetodaytodate : any;
  approvetodatechangeDate : any;
  deniedtodate : any;
  deniedtoDate : any;
  deniedtodaytodate : any;
  deniedtodatechangeDate : any;

  allchangeDate: any;
  pendingtodayDate: any;
  checkedtodayDate: any;
  approvetodayDate: any;
  deniedchangeDate: any;

  alltodayDate: any;
  pendingchangeDate: any;
  checkedchangeDate: any;
  approvechangeDate: any;
  deniedtodayDate: any;

  constructor( private toastr: ToastrService, private storage: LocalStorageService, private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private funct: FunctService, private datepipe: DatePipe) {
    this.idIndex = 1;
    this.idpendingIndex = 1;
    this.idcheckedIndex = 1;
    this.idapproveIndex = 1;
    this.iddeniedIndex = 1;

    this.date = new Date();
    this.alltodayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');
  
    this.pendingdate = new Date();
    this.pendingtodayDate = this.datepipe.transform(this.pendingdate, 'MMM dd, yyyy');

    this.checkeddate = new Date();
    this.checkedtodayDate = this.datepipe.transform(this.checkeddate, 'MMM dd, yyyy');

    this.approvedate = new Date();
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');

    this.denieddate = new Date();
    this.deniedtodayDate = this.datepipe.transform(this.denieddate, 'MMM dd, yyyy');

    //add the follwoing 
    this.alltodate = new Date();
    this.alltodaytodatechangeDate = this.datepipe.transform(this.alltodate, 'MMM dd, yyyy');

    this.pendingtodate = new Date(); 
    this.pendingtodaytodate = this.datepipe.transform(this.pendingtodate, 'MMM dd, yyyy');

    this.addedtodate = new Date();  //use for check tab
    this.addedtodaytodate = this.datepipe.transform(this.addedtodate, 'MMM dd, yyyy');

    this.approvetodate = new Date();  //add this
    this.approvetodaytodate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');

    this.deniedtodate = new Date();  //add this
    this.deniedtodaytodate = this.datepipe.transform(this.deniedtodate, 'MMM dd, yyyy');

    this.search()
    console.log("this all todate is : "+this.alltodayDate);
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

    this.dtOptions = {
      responsive: true,
      order: []
    }

    this.dtOptions.columnDefs = [
      { targets: [9], orderable: false }
    ];

    this.dtOptions1 = {
      responsive: true,
      order: []
    }

    this.dtOptions1.columnDefs = [
      { targets: [9], orderable: false }
    ];


    this.dtOptions2 = {
      responsive: true,
      order: []
    }

    this.dtOptions2.columnDefs = [
      { targets: [9], orderable: false }
    ];

    this.dtOptions3 = {
      responsive: true,
      order: []
    }

    this.dtOptions3.columnDefs = [
      { targets: [9], orderable: false }
    ];

    this.dtOptions4 = {
      responsive: true,
      order: []
    }

    this.dtOptions4.columnDefs = [
      { targets: [9], orderable: false }
    ];

    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
      }, 5);
    }
    else {
      this.storage.clear('loadFlag');
    }
  }

  ngAfterViewInit(){
    console.log('ContactsComponent - ngAfterViewInit()');
    //this.dtTrigger.next();
    //this.dtTrigger1.next();
    //this.dtTrigger2.next();
   // this.dtTrigger3.next();
   // this.dtTrigger4.next();

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns().every(function () {
            const that = this;
            $('input', this.footer()).on('keyup change', function () {
                console.log('search(): ' + that.search());
                console.log('value: ' + this['value']);
                if (that.search() !== this['value']) {
                    that.search(this['value'])
                        .draw();
                }
            });
        });
      });
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }

  onChangeAllToDate() {
    $(document).ready(function () {
      this.alltoDate = $("#alltodate").val();
    });
  }

  onChangePending() {
    $(document).ready(function () {
      this.pendingDate = $("#pendingDate").val();
    });
  }

  onChangePendingToDate()
  {
    $(document).ready(function () {
      this.pendingtoDate = $("#pendingtodate").val();
    });
  }
  onChangeChecked(){
    $(document).ready(function () {
      this.checkedDate = $("#checkedDate").val();
    });
  }
  onChangeAddedToDate()  //use as check
  {
    $(document).ready(function () {
      this.addedtoDate = $("#addedtodate").val();
    });
  }

  onChangeApprove() {
    $(document).ready(function () {
      this.approveDate = $("#approveDate").val();
    });
  }

  onChangeApproveToDate()
  {
    $(document).ready(function () {
      this.approvetoDate = $("#approvetodate").val();
    });
  }

  onChangeDenied() {
    $(document).ready(function () {
      this.deniedDate = $("#deniedDate").val();
    });
  }

  onChangeDeniedToDate()
  {
    $(document).ready(function () {
      this.deniedtoDate = $("#deniedtoDate").val();
    }); 
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
      var id1 = 'tblWithdraw' + this.idIndex;
      var table1 = $('#' + id1).DataTable();

      var id2 = 'tblpendingWithdraw' + this.idpendingIndex;
      var table2 = $('#' + id2).DataTable();

      var id3 = 'tblcheckedWithdraw' + this.idcheckedIndex;
      var table3 = $('#' + id3).DataTable();
    
      var id4 = 'tblapproveWithdraw' + this.idapproveIndex;
      var table4 = $('#' + id4).DataTable();

      var id5 = 'tbldeniedWithdraw' + this.iddeniedIndex;
      var table5 = $('#' + id5).DataTable();

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

  search() {
    this.withdrawList = [];
    var id = 'tblWithdraw' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    this.alltoDate = $("#alltodate").val();

    if (this.singleDate == '' || this.singleDate == undefined) {
      console.log("date if case" + this.alltodayDate);
      this.allchangeDate = this.alltodayDate;
    }
    else {
      console.log("date else case");
      this.allchangeDate = this.singleDate;
    }
  
    if (this.alltoDate == '' || this.alltoDate == undefined) {
      console.log("date if case for to date" + this.alltodaytodate);
      this.alltodatechangeDate = this.alltodaytodatechangeDate;
    }
    else {
      console.log("date else case");
      this.alltodatechangeDate = this.alltoDate;
    }
    console.log("this.singleDate" + this.allchangeDate);
    console.log("this.alltodate in all search is " + this.alltodatechangeDate);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    //params = params.set('createdDate',this.singleDate).set('status',this.status).set('accountNo', this.accountNo).set('id',this.withdrawId);
    //edit here
    params = params.set('fromDate', this.allchangeDate).set('toDate',this.alltodatechangeDate).set('status', '').set('accountNo', this.accountNo);
    this.http.get(this.funct.ipaddress + 'transaction/withdraws-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawList = this.dto.Response;//.data.userFinancialTransactionDTOList;
      // console.log("this.withdrawList>> " + JSON.stringify(this.withdrawList));
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  pendingSearch() {
    this.withdrawPendingList = [];
    var id = 'tblpendingWithdraw' + this.idpendingIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idpendingIndex = this.idpendingIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.pendingDate = $("#pendingDate").val();
    this.pendingtoDate = $("#pendingtodate").val();
    console.log("this.pendingDate" + this.pendingDate);

    if (this.pendingDate == '' || this.pendingDate == undefined) {
      console.log("date if case");
      this.pendingchangeDate = this.pendingtodayDate;
    }
    else {
      console.log("date else case");
      this.pendingchangeDate = this.pendingDate;
    }

    if (this.pendingtoDate == '' || this.pendingtoDate == undefined) {
      console.log("date if cas in pending");
      this.pendingtodatechangeDate = this.pendingtodaytodate;
    }
    else {
      console.log("date else case in pending");
      this.pendingtodatechangeDate = this.pendingtoDate;
    }
    console.log("this.pendingtodatechangeDate" + this.pendingtodatechangeDate);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    //edit here
    params = params.set('fromDate', this.pendingchangeDate).set('toDate',this.pendingtodatechangeDate).set('status', 'PENDING').set('accountNo', this.pendingaccountNo);
    this.http.get(this.funct.ipaddress + 'transaction/withdraws-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawPendingList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        console.log("this.withdrawPendingList>> " + JSON.stringify(this.withdrawPendingList));
        this.dtTrigger1.next();
        this.spinner.hide();
      });
  }

  checkedSearch(){
    this.withdrawCheckedList = [];
    var id = 'tblcheckedWithdraw' + this.idcheckedIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idcheckedIndex = this.idcheckedIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.checkedDate = $("#checkedDate").val();
    this.addedtoDate = $("#addedtodate").val();
    console.log("this.checkedDate" + this.checkedDate);

    if (this.checkedDate == '' || this.checkedDate == undefined) {
      console.log("date if case");
      this.checkedchangeDate = this.checkedtodayDate;
    }
    else {
      console.log("date else case");
      this.checkedchangeDate = this.checkedDate;
    }
    //use as check
    if (this.addedtoDate == '' || this.addedtoDate == undefined) {
      console.log("date if case in added to date");
      this.addedtodatechangeDate = this.addedtodaytodate;
    }
    else {
      console.log("date else case in added to date");
      this.addedtodatechangeDate = this.addedtoDate;
    }
    console.log("this.checkedtodatechangeDate" + this.addedtodatechangeDate);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    //edit here
    params = params.set('fromDate', this.checkedchangeDate).set('toDate',this.addedtodatechangeDate).set('status', 'CHECKED').set('accountNo', this.checkedaccountNo);
    this.http.get(this.funct.ipaddress + 'transaction/withdraws-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawCheckedList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        console.log("this.withdrawCheckedList>> " + JSON.stringify(this.withdrawCheckedList));
        this.dtTrigger4.next();
        this.spinner.hide();
      });
  }

  approveSearch() {
    this.withdrawApproveList = [];
    var id = 'tblapproveWithdraw' + this.idapproveIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idapproveIndex = this.idapproveIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.approveDate = $("#approveDate").val();
    console.log("this.approveDate" + this.approveDate);
    this.approvetoDate = $("#approvetodate").val();

    if (this.approveDate == '' || this.approveDate == undefined) {
      console.log("date if case");
      this.approvechangeDate = this.approvetodayDate;
    }
    else {
      console.log("date else case");
      this.approvechangeDate = this.approveDate;
    }

    if (this.approvetoDate == '' || this.approvetoDate == undefined) {
      console.log("date if case in approve to date");
      this.approvetodatechangeDate = this.approvetodaytodate;
    }
    else {
      console.log("date else case");
      this.approvetodatechangeDate = this.approvetoDate;
    }
    console.log("Approve todate change date is : "+ this.approvetodatechangeDate)

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    //edit here
    params = params.set('fromDate', this.approvechangeDate).set('toDate',this.approvetodatechangeDate).set('status', 'APPROVED').set('accountNo', this.approveaccountNo);
    this.http.get(this.funct.ipaddress + 'transaction/withdraws-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawApproveList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        console.log("this.withdrawApprovedList>> " + JSON.stringify(this.withdrawApproveList));
        this.dtTrigger2.next();
        this.spinner.hide();
      });
  }

  deniedSearch() {
    this.withdrawDeniedList = [];
    var id = 'tbldeniedWithdraw' + this.iddeniedIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.iddeniedIndex = this.iddeniedIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.deniedDate = $("#deniedDate").val();
    this.deniedtoDate = $("#deniedtodate").val();

    console.log("this.deniedDate" + this.deniedDate);
    if (this.deniedDate == '' || this.deniedDate == undefined) {
      console.log("date if case");
      this.deniedchangeDate = this.deniedtodayDate;
    }
    else {
      console.log("date else case");
      this.deniedchangeDate = this.deniedDate;
    }

    if (this.deniedtoDate == '' || this.deniedtoDate == undefined) {
      console.log("date if case");
      this.deniedtodatechangeDate = this.deniedtodaytodate;
    }
    else {
      console.log("date else case");
      this.deniedtodatechangeDate = this.deniedtoDate;
    }
    console.log("this.deniedtodatechangeDate" + this.deniedtodatechangeDate);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    //edit here
    params = params.set('fromDate', this.deniedchangeDate).set('toDate',this.deniedtodatechangeDate).set('status', 'DENIED').set('accountNo', this.deniedaccountNo);
    this.http.get(this.funct.ipaddress + 'transaction/withdraws-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawDeniedList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        console.log("this.withdrawDeniedList>> " + JSON.stringify(this.withdrawDeniedList));
        this.dtTrigger3.next();
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
  

}
