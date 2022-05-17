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
  selector: 'app-blockbankaccount',
  templateUrl: './blockbankaccount.component.html',
  styleUrls: ['./blockbankaccount.component.css']
})
export class BlockBankAccountComponent implements OnInit {
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
  blockId : any;

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
      { targets: [0], orderable: true }
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
    var id = 'tblodd' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.oddlist = [];
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.date = $("#date").val();
    if(this.date == 'undefined' || this.date == null)
       this.changeDate = 'undefined';
    else
       this.changeDate = this.date;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('fordate', this.changeDate); 
    this.http.get(this.funct.ipaddress + 'transaction/blockaccounts-by-params', {params: params, headers: headers })
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

  delete(event){
    this.blockId = event.target.id;
    console.log(this.blockId)
    $('#deleteData1').modal("show");
  }

  deleteOk() {
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let formData= new FormData();
    formData.append("id",this.blockId);
    this.http.post(this.funct.ipaddress + 'transaction/blockAccountDelete', formData, {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/block-bank-acc-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      });
  }

}
