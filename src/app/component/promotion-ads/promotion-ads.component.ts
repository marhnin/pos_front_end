
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-ads',
  templateUrl: './promotion-ads.component.html',
  styleUrls: ['./promotion-ads.component.css']
})
export class PromotionAdsComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  status: string = '';
  adsList: any;
  idIndex: any;
  token: any;
  singleDate : any;
  name : any;
  allchangeDate : any;
  alldate: any;
  alltodayDate : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private toastr: ToastrService,private datepipe: DatePipe) {
    this.idIndex = 1;
    this.alldate = new Date();
    console.log("this.alldate>> " + this.alldate);
    this.alltodayDate = this.datepipe.transform(this.alldate, 'MMM dd, yyyy');
    console.log("this.alltodayDate>> " + this.alltodayDate);

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

    this.dtOptions = {
      responsive: true,
      order: []
    }

    this.dtOptions.columnDefs = [
      { targets: [4], orderable: false }
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

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblads' + this.idIndex;
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
    this.adsList = [];
    var id = 'tblads' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    
    this.singleDate = $("#singleDate").val();
    console.log(this.dto.token);
  /*  if (this.singleDate == '' || this.singleDate == undefined) {
      console.log("date if case");
      this.allchangeDate = this.alltodayDate;
    }
    else {
      console.log("date else case");
      this.allchangeDate = this.singleDate;
    }*/
    console.log("Single change date is : "+this.singleDate)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('status', this.status).set("created_date",this.singleDate).set('name',this.name);
    
    this.http.get(this.funct.ipaddress + 'promotion/promotionadsByparams', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adsList = this.dto.Response;
        console.log("this.adsList>> " + JSON.stringify(this.adsList));
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }
}

