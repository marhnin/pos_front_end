import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctService } from '../../service/funct.service';
import { DtoService } from '../../service/dto.service';
import { DatePipe } from '@angular/common'

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  phoneNo: string= '';
  name: string= '';
  referralCode: string= '';
  status: string= '';
  userList: any;
  idIndex: any;
  approvedate : any;
  approvetodayDate : any;
  approveDate : any;
  allchangedate : any;

  approvetodate : any;
  allchangetodate : any;
  approvetodayToDate : any;
  approvetoDate : any;
  /*XXXXXXXXXXXX*/
  config: any;
  collection = [];
  page = 1;
  passenger: any; 
  itemsPerPage =  10;
  totalItems : any; 
  itemsPerPageFront =  10;
  appVersionList :[];
  appVersion : any;

  /*newtotal items*/
  newTotalItems : any;

  constructor(private storage: LocalStorageService,private datepipe: DatePipe, private toastr: ToastrService,private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,) {
    this.idIndex = 1;
   // this.status = 'ACTIVE';
    this.approvedate = new Date();
    console.log("this.approvedate>> " + this.approvedate);
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.approvetodayDate);

    this.approvetodate = new Date();
    console.log("this.approvetodate>> " + this.approvetodate);
    this.approvetodayToDate = this.datepipe.transform(this.approvetodate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.approvetodayToDate);
    this.getAllAppVersion();
    //this.search();
    this.getAllData();
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
      order:[],
      paging: false,
      info : true,
      dom: "Bfrltip",
      // language: {
      //   info: "Showing _START_ to _END_ of _MAX_ entries",
      //   lengthMenu: "Display _MENU_ records per page",
      // },
      // pageLength : 10
    }

    this.dtOptions.columnDefs = [
      { targets: [12], orderable: true }

    ];

    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 5);
    }
    else{
      this.storage.clear('loadFlag');
    }


  }

  ngAfterViewInit(){

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
      var id = 'tblUser' + this.idIndex;
      var table = $('#' + id).DataTable();
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
 
    getAllData() {
      this.userList = [];
      var id = 'tblUser' + this.idIndex;
      var table = $('#' + id).DataTable();
      table.destroy();
      this.idIndex = this.idIndex +1;
      this.spinner.show();
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams(); //.set('register_date',this.allchangedate).set('register_todate',this.allchangetodate)
      this.approveDate = $("#approveDate").val();
      this.approvetoDate = $("#approvetoDate").val();
      if (this.approveDate == '' || this.approveDate == undefined) {
        this.allchangedate = this.approvetodayDate;
      }
      else {
        this.allchangedate = this.approveDate;
      }
  
      if (this.approvetoDate == '' || this.approvetoDate == undefined) {
        this.allchangetodate = this.approvetodayToDate;
      }
      else {
        this.allchangetodate = this.approvetoDate;
      }
      params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
      .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate)
      .set("pageNumber","1").set("rowsOfPage","10");
      this.http.get(this.funct.ipaddress + 'user/userByparams_1', { params: params, headers: headers } ).subscribe((data: any) => {
        this.dto.Response = {};
        this.dto.Response = data.results;
        this.userList = this.dto.Response;
        this.totalItems = data.totalRows;
        this.dtTrigger.next();
        this.spinner.hide();
      })
    }

    gty(page: any){
      this.userList = [];
      var id = 'tblUser' + this.idIndex;
      var table = $('#' + id).DataTable();
     
      table.destroy();
      this.idIndex = this.idIndex +1;
      this.spinner.show();
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams();
      this.approveDate = $("#approveDate").val();
    this.approvetoDate = $("#approvetoDate").val();
    if (this.approveDate == '' || this.approveDate == undefined) {
      this.allchangedate = this.approvetodayDate;
    }
    else {
      this.allchangedate = this.approveDate;
    }

    if (this.approvetoDate == '' || this.approvetoDate == undefined) {
      this.allchangetodate = this.approvetodayToDate;
    }
    else {
      this.allchangetodate = this.approvetoDate;
    }
      params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
      .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate)
      .set("pageNumber",page).set("rowsOfPage",this.itemsPerPage.toString());
      this.http.get(this.funct.ipaddress + 'user/userByparams_1', { params: params, headers: headers } ).subscribe((data: any) => {
        this.dto.Response = {};
        this.dto.Response = data.results;
        this.userList = this.dto.Response;
        this.totalItems = data.totalRows;
        this.dtTrigger.next();
        this.spinner.hide();
      })
    }

    getAllAppVersion()
    {
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.dto.token);
      let params = new HttpParams();
      this.http.get(this.funct.ipaddress + 'user/getAllAppVersion', {headers: headers }).subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.appVersionList = this.dto.Response;
        }
      );
    }

  search(){
    this.spinner.show();
    this.userList = [];
    var id = 'tblUser' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    this.approveDate = $("#approveDate").val();
    this.approvetoDate = $("#approvetoDate").val();
    if (this.approveDate == '' || this.approveDate == undefined) {
      this.allchangedate = this.approvetodayDate;
    }
    else {
      this.allchangedate = this.approveDate;
    }

    if (this.approvetoDate == '' || this.approvetoDate == undefined) {
      this.allchangetodate = this.approvetodayToDate;
    }
    else {
      this.allchangetodate = this.approvetoDate;
    }
    
    params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
    .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate);//.set("pageNumber","2").set("rowsOfPage","10");
	  this.http.get(this.funct.ipaddress + 'user/userByparams', { params: params, headers: headers } )
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(  
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userList = this.dto.Response;
        this.page =  0
        this.dtTrigger.next();
        this.spinner.hide();
     
      }
    );
  }

  onChangeApprove() {
    $(document).ready(function () {
      this.approveDate = $("#approveDate").val();
    });
  }

  onChangeApproveTo()
  {
    $(document).ready(function () {
      this.approvetoDate = $("#approvetoDate").val();
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 /*XXXXXXXXXXXXXXXXXXXXXXXX*/
  pageChange(newPage: number) {
    this.router.navigate(['/user-list'], { queryParams: { page: newPage } });
  }


}
