import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { ToastrService } from 'ngx-toastr';


import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-threed-result-configuration',
  templateUrl: './threed-result-configuration.component.html',
  styleUrls: ['./threed-result-configuration.component.css']
})
export class ThreedResultConfigurationComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  fromDate: string = '';
  toDate: string = '';
  status: string = '';
  threedResultConfiguration: any;
  threedbetamountlimitList: any;
  idIndex: any;
  date : any;
  fromchangedate : any;
  todate: any;
  tochangedate : any;
  fromtodaydate : any;
  totodaydate : any;

  constructor(private toastr: ToastrService,private storage: LocalStorageService, private spinner: NgxSpinnerService, private dto: DtoService,
    private http: HttpClient, private funct: FunctService, private router: Router,private datepipe: DatePipe) {
   this.idIndex = 1;

   this.date = new Date();
   this.fromtodaydate = this.datepipe.transform(this.date, 'MMM dd, yyyy');

   this.todate = new Date();
   this.totodaydate = this.datepipe.transform(this.todate, 'MMM dd, yyyy');
   
   this.status = 'ACTIVE';

   this.search()
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
      { targets: [7], orderable: false }
    ];

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

  onChangeFromDate() {
    $(document).ready(function () {
      this.fromDate = $("#fromDate").val();
    });
  }

  onChangeToDate() {
    $(document).ready(function () {
      this.toDate = $("#toDate").val();
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
      var id = 'tblThreeDResultConfig' + this.idIndex;
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

  search() {
    this.threedResultConfiguration = [];
    var id = 'tblThreeDResultConfig' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();
    if(this.fromDate =='undefined' || this.fromDate == null)
    {
      this.fromchangedate ='undefined' ;//this.fromtodaydate;
    }
    else
    {
      this.fromchangedate = this.fromDate;
    }
    if(this.toDate == 'undefined' || this.toDate == null)
    {
      this.tochangedate = 'undefined';//this.totodaydate;
    }
    else
      this.tochangedate = this.toDate;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    console.log(this.fromchangedate)
    params = params.set('fromDate', this.fromchangedate).set('toDate', this.tochangedate).set('status', this.status);
    this.http.get(this.funct.ipaddress + 'threedconfig/GetList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>>> " + JSON.stringify(this.dto.Response));
        this.threedResultConfiguration = this.dto.Response;//.data.threeDResultConfigDTOList;
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

}
