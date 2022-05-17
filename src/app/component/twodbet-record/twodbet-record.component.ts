import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import Responsive from 'datatables.net-responsive'; /*for responsive not working event datatable */

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-twodbet-record',
  templateUrl: './twodbet-record.component.html',
  styleUrls: ['./twodbet-record.component.css']
})
export class TwodbetRecordComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  singleDate: string = '';
  status: string= '';
  twodbetList: any;
  idIndex: any;
  time: string= '';
  phoneNo: '';
  userList: [];
  token: any;

  idIndex2: any;
  id;
  phoneNo2: '';
  totalAmount;
  createdDate: '';
  userName: '';
  twoDBetDetailDTOList;
  twoDBetDetailDTOList_temp : any;
  date : any;
  todayDate : any;
  changeDate : any;

  constructor(  private toastr: ToastrService, private storage: LocalStorageService,private spinner: NgxSpinnerService, private dto: DtoService, 
    private http: HttpClient, private funct: FunctService, private router: Router, private datepipe: DatePipe,) { 
    this.phoneNo = '';
    this.idIndex = 1;
    this.idIndex2 = 1;

    this.date = new Date();
    this.todayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');

    //this.getActiveUsers();
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

    this.twoDBetDetailDTOList = [];

    this.dtOptions = {
      // responsive: {
      //   details: {
      //       renderer: Responsive.renderer.listHiddenNodes()
      //   },
      // },
      order:[]
    }

    this.dtOptions2 = {
      responsive: true,
      order:[]
    }

    this.dtOptions.columnDefs = [
    ];

    this.dtOptions2.columnDefs = [
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

  onChangeSingle(){
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }


  getActiveUsers() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
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
      var id = 'tbltwodbet' + this.idIndex;
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
    this.spinner.show();
    this.twodbetList = [];
    var id = 'tbltwodbet' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    if(this.singleDate == null || this.singleDate == 'undefined')
    {
      this.changeDate = this.todayDate;
    }
    else
     this.changeDate = this.singleDate;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('createdDate',this.changeDate).set('time',this.time).set('phoneNo',this.phoneNo); // here
    this.http.get(this.funct.ipaddress + 'twodbet/GetListbyParams', {params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twodbetList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }

  goModal(id, phoneNo, userName, totalAmount, createdDate){
    var id1 = 'tbltwodbetdetail' + this.idIndex2;
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
     params = params.set('twodbet_id', id);
    this.http.get(this.funct.ipaddress + 'twodbet/Get2DdetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twoDBetDetailDTOList_temp = this.dto.Response;
        this.twoDBetDetailDTOList = this.twoDBetDetailDTOList_temp.results;
        this.dtTrigger2.next();
      }); 
    this.spinner.hide();
    $('#browseAccountData').modal("show");
  }

}
