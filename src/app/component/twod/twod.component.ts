import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-twod',
  templateUrl: './twod.component.html',
  styleUrls: ['./twod.component.css']
})
export class TwodComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  singleDate: string = '';
  time: string= '';
  number: string= '';
  twodList: any;
  idIndex: any;
  date : any;
  alltodayDate : any;
  allchangeDate  : any;

  constructor(private storage: LocalStorageService, private toastr: ToastrService, private spinner: NgxSpinnerService, private dto: DtoService, 
    private http: HttpClient, private funct: FunctService, private router: Router,private datepipe: DatePipe) { 
    this.idIndex = 1;
    this.date = new Date();
    this.alltodayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');
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
      order:[]
    }

    this.dtOptions.columnDefs = [
      { targets: [4], orderable: false }

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

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblTwoD' + this.idIndex;
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
    this.twodList = [];
    var id = 'tblTwoD' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    if(this.singleDate == 'undefined' || this.singleDate == null)
    {
      this.allchangeDate = this.alltodayDate;
    }
    else
     this.allchangeDate = this.singleDate;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    let formData = new FormData();
    formData.append("for_date_time",this.allchangeDate);
    formData.append("for_time",this.time);
    formData.append("number",this.number);
    console.log(this.singleDate)
    params = params.set('for_date_time',this.allchangeDate).set('for_time',this.time).set('number', this.number);
    this.http.get(this.funct.ipaddress + 'result/twod-results-by-params', {params: params,headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twodList = this.dto.Response;//.data.resultDTOList;
        console.log("this.twodList>> " +JSON.stringify(this.twodList));
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }
}
