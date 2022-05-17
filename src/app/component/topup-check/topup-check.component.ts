import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-topup-check',
  templateUrl: './topup-check.component.html',
  styleUrls: ['./topup-check.component.css']
})
export class TopupCheckComponent implements OnInit {

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

  dtElementacc: DataTableDirective;
  dtOptionsacc: DataTables.Settings = {};
  dtTriggeracc: Subject<any> = new Subject();


  singleDate: string = '';
  approveDate: string = '';
  addedDate: string = '';

  alltoDate: string = ''; //add this
  alltodate : any;

  pendingDate: string = '';
  deniedDate: string = '';
  status: string = '';
  accountNo: string = '';
  approveaccountNo: string = '';
  addedaccountNo: string = '';
  pendingaccountNo: string = '';
  deniedaccountNo: string = '';
  topupallList: any;
  topupapproveList: any;
  topupaddList: any;
  topuppengingList: any;
  topupdeniedList: any;
  idIndex: any;
  idapproveIndex: any;
  idaddIndex: any;
  idpendingIndex: any;
  iddeniedIndex: any;
  topupId: any;
  approvedate: any;
  addeddate: any;

  todate : any; //add this
  approvetodate :any;
  approvetoDate : any;
  addedtoDate : any;
  addedtodate : any;
  pendingtodate : any;
  pendingtoDate : any;
  deniedtodate : any;
  deniedtoDate : any;
  
  alltodaytodate : any;
  approvetodaytodate : any;
  addedtodaytodate : any;
  pendingtodaytodate : any;
  deniedtodaytodate : any;
   
  alltodatechangeDate : any; //add this
  approvetodatechangeDate : any;
  pendingtodatechangeDate : any;
  deniedtodatechangeDate : any;
  addedtodatechangeDate : any;
  
  pendingdate: any;
  denieddate: any;
  alldate: any;

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
  added_date2 : any;
  accountDetailList : any;
  total_today_reach_amt : any;
  total_my_amount :any;
  accidIndex : any;

  constructor(private storage: LocalStorageService,private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,private toastr: ToastrService, private datepipe: DatePipe) { 
    this.idIndex = 1;
    this.idapproveIndex = 1;
    this.idaddIndex = 1;
    this.idpendingIndex = 1;
    this.iddeniedIndex = 1;
    this.accidIndex = 1;

    this.approvedate = new Date();
    console.log("this.approvedate>> " + this.approvedate);
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.approvetodayDate);

    this.addeddate = new Date();
    console.log("this.addeddate>> " + this.addeddate);
    this.addtodayDate = this.datepipe.transform(this.addeddate, 'MMM dd, yyyy');
    console.log("this.addtodayDate>> " + this.addtodayDate);

    this.pendingdate = new Date();
    console.log("this.pendingdate>> " + this.pendingdate);
    this.pendingtodayDate = this.datepipe.transform(this.pendingdate, 'MMM dd, yyyy');
    console.log("this.pendingtodayDate>> " + this.pendingtodayDate);

    this.denieddate = new Date();
    console.log("this.denieddate>> " + this.denieddate);
    this.deniedtodayDate = this.datepipe.transform(this.denieddate, 'MMM dd, yyyy');
    console.log("this.deniedtodayDate>> " + this.deniedtodayDate);

    this.alldate = new Date();
    console.log("this.alldate>> " + this.alldate);
    this.alltodayDate = this.datepipe.transform(this.alldate, 'MMM dd, yyyy');
    console.log("this.alltodayDate>> " + this.alltodayDate);


    this.alltodate = new Date();  //add this
    console.log("this.allltodate>> " + this.alltodate);
    this.alltodaytodate = this.datepipe.transform(this.alltodate, 'MMM dd, yyyy');

    this.approvetodate = new Date();  //add this
    console.log("this.approvetodate>> " + this.approvetodate);
    this.approvetodaytodate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');

    this.addedtodate = new Date();  //add this
    console.log("this.addedtodate>> " + this.addedtodate);
    this.addedtodaytodate = this.datepipe.transform(this.addedtodate, 'MMM dd, yyyy');

    this.pendingtodate = new Date();  //add this
    console.log("this.pendingtodate>> " + this.pendingtodate);
    this.pendingtodaytodate = this.datepipe.transform(this.pendingtodate, 'MMM dd, yyyy');

    this.deniedtodate = new Date();  //add this
    console.log("this.deniedtodate>> " + this.deniedtodate);
    this.deniedtodaytodate = this.datepipe.transform(this.deniedtodate, 'MMM dd, yyyy');

    //this.allSearch()
    this.pendingSearch();
    //this.approveSearch()
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

    this.topupId = this.route.snapshot.paramMap.get("id");
    this.dtOptions = {
      responsive: true,
      order: []
    }

    this.dtOptions.columnDefs = [
      { targets: [9], orderable: true }
    ];

    this.dtOptions1 = {
      responsive: true,
      order: []
    }

    this.dtOptions1.columnDefs = [
      { targets: [9], orderable: true }
    ];

    this.dtOptions2 = {
      responsive: true,
      order: []
    }

    this.dtOptions2.columnDefs = [
      { targets: [9], orderable: true }
    ];

    this.dtOptions3 = {
      responsive: true,
      order: []
    }

    this.dtOptions3.columnDefs = [
      { targets: [9], orderable: true }
    ];

    this.dtOptions4 = {
      responsive: true,
      order: []
    }

    this.dtOptions4.columnDefs = [
      { targets: [9], orderable: true }
    ];

    this.dtOptionsacc = {
      responsive: true,
      order: []
    }
    this.dtOptionsacc.columnDefs = [
      
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

  onChangeAdded() {
    $(document).ready(function () {
      this.addedDate = $("#addedDate").val();
    });
  }

  onChangeAddedToDate()
  {
    $(document).ready(function () {
      this.addedtoDate = $("#addedtodate").val();
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
      var id1 = 'tblTopup' + this.idIndex;
      var table1 = $('#' + id1).DataTable();

      var id2 = 'tblapproveTopup' + this.idapproveIndex;
      var table2 = $('#' + id2).DataTable();

      var id3 = 'tbladdTopup' + this.idaddIndex;
      var table3 = $('#' + id3).DataTable();

      var id4 = 'tblpendingTopup' + this.idpendingIndex;
      var table4 = $('#' + id4).DataTable();

      var id5 = 'tbldeniedTopup' + this.iddeniedIndex;
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

  allSearch(){
    this.topupallList = [];
    var id = 'tblTopup' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    this.alltoDate = $("#alltodate").val();
    if (this.singleDate == '' || this.singleDate == undefined) {
      console.log("date if case");
      this.allchangeDate = this.alltodayDate;
    }
    else {
      console.log("date else case");
      this.allchangeDate = this.singleDate;
    }
  
    if (this.alltoDate == '' || this.alltoDate == undefined) {
      console.log("date if case for to date");
      this.alltodatechangeDate = this.alltodaytodate;
    }
    else {
      console.log("date else case");
      this.alltodatechangeDate = this.alltoDate;
    }
    console.log("All to date change date is : "+this.alltodatechangeDate)
    let headers = new HttpHeaders();
    
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('fromDate',this.allchangeDate).set('toDate',this.alltodatechangeDate).set('status', '').set('accountNo', this.accountNo);
    
    this.http.get(this.funct.ipaddress + 'transaction/topups-by-params',{ params: params,headers:headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.topupallList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }
  
  approveSearch() {
    this.topupapproveList = [];
    var id = 'tblapproveTopup' + this.idapproveIndex;
    var table = $('#' + id).DataTable();
    this.dto.token = this.storage.retrieve('token');
    table.destroy();
    this.idapproveIndex = this.idapproveIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.approveDate = $("#approveDate").val();
    this.approvetoDate = $("#approvetodate").val();
    console.log("this.approveDate>> " + this.approveDate);
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
    params = params.set('fromDate', this.approvechangeDate).set("toDate",this.approvetodatechangeDate).set('status', 'APPROVED').set('accountNo', this.approveaccountNo);
  
    this.http.get(this.funct.ipaddress + 'transaction/topups-by-params',{ params: params, headers : headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.topupapproveList = this.dto.Response;//data.userFinancialTransactionDTOList;
        this.approveaccountNo = '';
        this.approveDate = '';
        this.dtTrigger1.next();
        this.spinner.hide();
      });
  }

  addedSearch() {
    this.topupaddList = [];
    var id = 'tbladdTopup' + this.idaddIndex;
    this.dto.token = this.storage.retrieve('token');
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idaddIndex = this.idaddIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.addedDate = $("#addedDate").val();
    this.addedtoDate = $("#addedtodate").val();
    if (this.addedDate == '' || this.addedDate == undefined) {
      console.log("date if case");
      this.addedchangeDate = this.addtodayDate;
    }
    else {
      console.log("date else case");
      this.addedchangeDate = this.addedDate;
    }

    if (this.addedtoDate == '' || this.addedtoDate == undefined) {
      console.log("date if case");
      this.addedtodatechangeDate = this.addedtodaytodate;
    }
    else {
      console.log("date else case");
      this.addedtodatechangeDate = this.addedtoDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('fromDate', this.addedchangeDate).set("toDate",this.addedtodatechangeDate).set('status', 'ADDED').set('accountNo', this.addedaccountNo);
     this.http.get(this.funct.ipaddress + 'transaction/topups-by-params',{ params: params, headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.topupaddList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        this.addedaccountNo = '';
        this.addedDate = '';
        this.dtTrigger2.next();
        this.spinner.hide();
      });
  }

  pendingSearch(){
    console.log ("Active Tab");
    this.topuppengingList = [];
    var id = 'tblpendingTopup' + this.idpendingIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idpendingIndex = this.idpendingIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.pendingDate = $("#pendingDate").val();
    this.pendingtoDate = $("#pendingtodate").val();

    if (this.pendingDate == '' || this.pendingDate == undefined) {
      console.log("date if case");
      this.pendingchangeDate = this.pendingtodayDate;
    }
    else {
      console.log("date else case");
      this.pendingchangeDate = this.pendingDate;
    }

    if (this.pendingtoDate == '' || this.pendingtoDate == undefined) {
      console.log("date if case");
      this.pendingtodatechangeDate = this.pendingtodaytodate;
    }
    else {
      console.log("date else case");
      this.pendingtodatechangeDate = this.pendingtoDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    console.log(this.dto.token);
    params = params.set('fromDate', this.pendingchangeDate).set("toDate",this.pendingtodatechangeDate).set('status', 'PENDING').set('accountNo', this.pendingaccountNo);
   //user-financial/topups-by-params { params: params, headers: headers }
    this.http.get(this.funct.ipaddress + 'transaction/topups-by-params',{ params: params, headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.topuppengingList = this.dto.Response; //.data.userFinancialTransactionDTOList;
        this.pendingaccountNo = '';
        this.pendingDate = '';
        this.dtTrigger3.next();
        this.spinner.hide();
      });
  }

  deniedSearch(){
    this.topupdeniedList = [];
    var id = 'tbldeniedTopup' + this.iddeniedIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.iddeniedIndex = this.iddeniedIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.deniedDate = $("#deniedDate").val();
    this.deniedtoDate = $("#deniedtodate").val();

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
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    params = params.set('fromDate', this.deniedchangeDate).set("toDate",this.deniedtodatechangeDate).set('status', 'DENIED').set('accountNo', this.deniedaccountNo);
   
    this.http.get(this.funct.ipaddress + 'transaction/topups-by-params',{headers: headers, params: params})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.topupdeniedList = this.dto.Response;//.data.userFinancialTransactionDTOList;
        this.deniedaccountNo = '';
        this.deniedDate = '';
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

/*XXXXXXXXXXXXX DELETE XXXXXXXXXXXXXXXXXXXX*/
  deleteOk()
  {
    
  }

  /*My amount -2021-10-05*/
  goModal(){

    this.accountDetailList = [];
    var id = 'tblServicePhone' + this.accidIndex;
    var table = $('#' + id).DataTable();
    table.destroy();

    this.accidIndex = this.accidIndex + 1;
    let headers = new HttpHeaders();
    this.dto.token = this.storage.retrieve('token');
     headers = headers.set('Authorization', this.dto.token);
     this.http.get(this.funct.ipaddress + 'payment/GetAccountDetailByAdminID', {headers: headers}).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.accountDetailList = this.dto.Response;
        var tot = 0, mytot = 0;

         for (let i = 0; i < this.accountDetailList.length; i++) {
          tot = parseInt(this.accountDetailList[i].today_reach_amt) + tot;
          mytot = parseInt(this.accountDetailList[i].my_amount) + mytot;
       }
       this.total_today_reach_amt = new Intl.NumberFormat().format(tot);
       this.total_my_amount= new Intl.NumberFormat().format(mytot);
       this.dtTriggeracc.next();
      });
    $('#accountDetailData').modal("show");

  }
  

}
