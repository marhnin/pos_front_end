import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import Responsive from 'datatables.net-responsive'; /*for responsive not working event datatable */

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-threedbet-record',
  templateUrl: './threedbet-record.component.html',
  styleUrls: ['./threedbet-record.component.css']
})
export class ThreedbetRecordComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  singleDate: string = '';
  singleDate1: string = '';
  status: string= '';
  threedbetList: any;
  idIndex: any;
  idIndex2: any;
  phoneNo: '';
  userList: [];
  token: any;
  threeDBetDetailDTOList;
  threeDBetDetailDTOList_temp;

  id;
  phoneNo2: '';
  totalAmount;
  createdDate: '';
  userName: '';
  date : any;
  fromtodayDate : any;
  fromChangeDate : any;
  toDate : any;
  totodayDate : any;
  toChangeDate : any;
  constructor(private toastr: ToastrService,private storage: LocalStorageService,private spinner: NgxSpinnerService, private dto: DtoService, 
    private http: HttpClient, private funct: FunctService, private router: Router,private datepipe: DatePipe,) { 
    this.phoneNo = '';
    this.idIndex = 1;
    this.idIndex2 = 1;
    //this.getActiveUsers();

    this.date = new Date();
    this.fromtodayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.date);

    this.toDate = new Date();
    this.totodayDate = this.datepipe.transform(this.toDate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.date);

    this.search();
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

    this.threeDBetDetailDTOList = [];

    this.dtOptions = {
      responsive: {
        details: {
            renderer: Responsive.renderer.listHiddenNodes()
        }
    },
      order:[]
    }

    this.dtOptions2 = {
      responsive: true,
      order:[]
    }

    this.dtOptions.columnDefs = [
     { targets: [4], orderable: false }

    ];

    this.dtOptions2.columnDefs = [
      { targets: [0], orderable: false }
     ];

    
    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload(true);
      }, 5);
    }
    else{
      this.storage.clear('loadFlag');
    }
  }

  onChangeSingle(){
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }
  onChangeSingle1(){
    $(document).ready(function () {
      this.singleDate1 = $("#singleDate1").val();
    });
  }

  getActiveUsers() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.http.get(this.funct.ipaddress + 'user/active-users', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userList = this.dto.Response.data.userDTOList;
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
      var id = 'tblthreedbet' + this.idIndex;
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

  search(){
    this.threedbetList = [];
    var id = 'tblthreedbet' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    this.singleDate1 = $("#singleDate1").val();
    if(this.singleDate == null || this.singleDate == 'undefined')
    this.fromChangeDate = this.fromtodayDate;
    else
     this.fromChangeDate = this.singleDate;

     if(this.singleDate1 == null || this.singleDate1 == 'undefined')
       this.toChangeDate = this.totodayDate;
     else
      this.toChangeDate = this.singleDate1;

    this.singleDate1 = $("#singleDate1").val();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    console.log("h::: " + this.fromChangeDate + " " + this.phoneNo +" "+this.toChangeDate)
    params = params.set('fromDate',this.fromChangeDate).set("toDate",this.toChangeDate).set('phoneNo',this.phoneNo); // here
    this.http.get(this.funct.ipaddress + 'threedbet/GetListbyParams', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.threedbetList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }

  goModal(id, phoneNo, userName, totalAmount, createdDate){
    var id1 = 'tblthreedbetdetail' + this.idIndex2;
    var table = $('#' + id1).DataTable();
    table.destroy();
    this.idIndex2 = this.idIndex2 +1;

    this.spinner.show();

    this.id = id;
    this.phoneNo2 = phoneNo;
    this.userName = userName;
    this.totalAmount = totalAmount;
    this.createdDate = createdDate;

    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('threedbet_id', id);
    this.http.get(this.funct.ipaddress + 'threedbet/Get3DdetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.threeDBetDetailDTOList_temp = this.dto.Response;//.data.threeDBetDetailDTOList; // here
        this.threeDBetDetailDTOList = this.threeDBetDetailDTOList_temp.results;
        console.log("AKP: " +JSON.stringify(this.threeDBetDetailDTOList));
        this.dtTrigger2.next();
      }
    ); 

    this.spinner.hide();
    $('#browseAccountData').modal("show");
  }

}
