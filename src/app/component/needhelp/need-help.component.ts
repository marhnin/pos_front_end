import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Responsive from 'datatables.net-responsive'; /*for responsive not working event datatable */

import { Subject } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-needhelp',
  templateUrl: './need-help.component.html',
  styleUrls: ['./need-help.component.css']
})
export class NeedHelpComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions2 : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2 : Subject<any> = new Subject();
  providerName: string = '';
  gameCode: string = '';
  type: string = '';
  status: string = '';
  needHelpList: any;
  idIndex: any;
  token: any;
  idIndex2 : any;
  pid : any;
  name : any;

constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private toastr: ToastrService,) {
    this.idIndex = 1;
    this.status = 'ACTIVE';
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
      responsive: {
        details: {
            renderer: Responsive.renderer.listHiddenNodes()
        }
    },
      order: []
    }
    this.dtOptions.columnDefs = [
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

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblprovider' + this.idIndex;
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
        var id = 'tblneedhelp' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    this.needHelpList = [];
    this.http.get(this.funct.ipaddress + 'needHelp/getNeedHelpListByParams', {headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.needHelpList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteNeedHelpById(id)
  {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', id);
    this.http.get(this.funct.ipaddress + 'needHelp/delete', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.search();
          this.toastr.success(this.dto.Response.message, 'Success!', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
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