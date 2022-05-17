import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-oddentry',
  templateUrl: './oddentry.component.html',
  styleUrls: ['./oddentry.component.css']
})
export class OddEntryComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  idIndex: any;
  date: string = '';
  oddlist: any;
  holidayDate: any;
  holidaytodayDate: any;
  changeDate: string = '';
  status: string = '';
  
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private router: Router,
    private dto: DtoService,private toastr: ToastrService, private http: HttpClient, private funct: FunctService, private datepipe: DatePipe) {
    this.idIndex = 1;

    // this.holidayDate = new Date();
    // console.log("this.holidayDate>> " + this.holidayDate);
    // this.holidaytodayDate = this.datepipe.transform(this.holidayDate, 'MMM dd, yyyy');
    // console.log("this.holidaytodayDate>> " + this.holidaytodayDate);

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
      { targets: [4], orderable: false }
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

  onChangeDate() {
    $(document).ready(function () {
      this.date = $("#date").val();
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
      var id = 'tblodd' + this.idIndex;
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
    this.oddlist = [];
    var id = 'tblodd' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.date = $("#date").val();
    if(this.date == 'undefined' || this.date == null)
       this.changeDate = this.holidaytodayDate;
    else
       this.changeDate = this.date;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('odddate', this.changeDate); 
    this.http.get(this.funct.ipaddress + 'odd/GetList', {params: params, headers: headers })
    .pipe(
         catchError(this.handleError.bind(this))
      )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.oddlist = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }
}
