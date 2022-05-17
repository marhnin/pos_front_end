import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-withdraw-check',
  templateUrl: './withdraw-check-list.component.html',
  styleUrls: ['./withdraw-check-list.component.css']
})
export class AgentWithdrawCheckComponent implements OnInit {

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
  
  name : string = '';
  refCode : string = '';
  amount : any;
  something : any;
  
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private funct: FunctService, private datepipe: DatePipe) {
    this.idIndex = 1;
    this.idpendingIndex = 1;
    this.idcheckedIndex = 1;
    this.idapproveIndex = 1;
    this.iddeniedIndex = 1;

    this.search()

    this.date = new Date();
    console.log("this.date>> " + this.date);
    this.alltodayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');
    console.log("this.alltodayDate>> " + this.alltodayDate);

    this.pendingdate = new Date();
    console.log("this.pendingdate>> " + this.pendingdate);
    this.pendingtodayDate = this.datepipe.transform(this.pendingdate, 'MMM dd, yyyy');
    console.log("this.pendingtodayDate>> " + this.pendingtodayDate);

    this.checkeddate = new Date();
    console.log("this.checkeddate>> " + this.checkeddate);
    this.checkedtodayDate = this.datepipe.transform(this.checkeddate, 'MMM dd, yyyy');
    console.log("this.checkedtodayDate>> " + this.checkedtodayDate);

    this.approvedate = new Date();
    console.log("this.approvedate>> " + this.approvedate);
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.approvetodayDate);

    this.denieddate = new Date();
    console.log("this.denieddate>> " + this.denieddate);
    this.deniedtodayDate = this.datepipe.transform(this.denieddate, 'MMM dd, yyyy');
    console.log("this.deniedtodayDate>> " + this.deniedtodayDate);
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
    
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }

  onChangePending() {
    $(document).ready(function () {
      this.pendingDate = $("#pendingDate").val();
    });
  }

  onChangeChecked(){
    $(document).ready(function () {
      this.checkedDate = $("#checkedDate").val();
    });
  }

  onChangeApprove() {
    $(document).ready(function () {
      this.approveDate = $("#approveDate").val();
    });
  }

  onChangeDenied() {
    $(document).ready(function () {
      this.deniedDate = $("#deniedDate").val();
    });
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
    console.log("this.singleDate" + this.singleDate);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    //params = params.set('createdDate',this.singleDate).set('status',this.status).set('accountNo', this.accountNo).set('id',this.withdrawId);
    params = params.set('createdDate', this.singleDate).set('status', this.status).
             set('accountNo', this.accountNo).set('amount',this.amount).set('name',this.name).set('refcode',this.refCode);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-withdraws-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawList = this.dto.Response.data.agentFinancialTransactionDTOList;
        console.log("this.withdrawList>> " + JSON.stringify(this.withdrawList));
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
    console.log("this.pendingDate" + this.pendingDate);

    if (this.pendingDate == '' || this.pendingDate == undefined) {
      console.log("date if case");
      this.pendingchangeDate = this.pendingtodayDate;
    }
    else {
      console.log("date else case");
      this.pendingchangeDate = this.pendingDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('createdDate', this.singleDate).set('status', 'PENDING').
    set('accountNo', this.pendingaccountNo).set('amount',this.amount).set('name',this.name).set('refcode',this.refCode);
  //  params = params.set('createdDate', this.pendingchangeDate).set('status', 'PENDING').set('accountNo', this.pendingaccountNo);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-withdraws-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawPendingList = this.dto.Response.data.agentFinancialTransactionDTOList;
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
    console.log("this.checkedDate" + this.checkedDate);

    if (this.checkedDate == '' || this.checkedDate == undefined) {
      console.log("date if case");
      this.checkedchangeDate = this.checkedtodayDate;
    }
    else {
      console.log("date else case");
      this.checkedchangeDate = this.checkedDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('createdDate', this.singleDate).set('status', 'CHECKED').
    set('accountNo', this.checkedaccountNo).set('amount',this.amount).set('name',this.name).set('refcode',this.refCode);
   // params = params.set('createdDate', this.checkedchangeDate).set('status', 'CHECKED').set('accountNo', this.checkedaccountNo);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-withdraws-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawCheckedList = this.dto.Response.data.agentFinancialTransactionDTOList;
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

    if (this.approveDate == '' || this.approveDate == undefined) {
      console.log("date if case");
      this.approvechangeDate = this.approvetodayDate;
    }
    else {
      console.log("date else case");
      this.approvechangeDate = this.approveDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('createdDate', this.singleDate).set('status','APPROVED').
    set('accountNo', this.approveaccountNo).set('amount',this.amount).set('name',this.name).set('refcode',this.refCode);
  //  params = params.set('createdDate', this.approvechangeDate).set('status', 'APPROVED').set('accountNo', this.approveaccountNo);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-withdraws-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawApproveList = this.dto.Response.data.agentFinancialTransactionDTOList;
        console.log("this.withdrawPendingList>> " + JSON.stringify(this.withdrawPendingList));
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
    console.log("this.deniedDate" + this.deniedDate);
    if (this.deniedDate == '' || this.deniedDate == undefined) {
      console.log("date if case");
      this.deniedchangeDate = this.deniedtodayDate;
    }
    else {
      console.log("date else case");
      this.deniedchangeDate = this.deniedDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('createdDate', this.singleDate).set('status', 'DENIED').
    set('accountNo', this.deniedaccountNo).set('amount',this.amount).set('name',this.name).set('refcode',this.refCode);
   // params = params.set('createdDate', this.deniedchangeDate).set('status', 'DENIED').set('accountNo', this.deniedaccountNo);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-withdraws-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.withdrawDeniedList = this.dto.Response.data.agentFinancialTransactionDTOList;
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
