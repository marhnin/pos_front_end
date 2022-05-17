import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { ToastrService } from 'ngx-toastr';


import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-customerservice',
  templateUrl: './sale-promoter.component.html',
  styleUrls: ['./sale-promoter.component.css']
})
export class SalePromoterComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  phoneNo: string= '';
  name: string= '';
  referralCode: string= '';
  status: string= '';
  agentList: any;
  idIndex: any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private funct: FunctService) {
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
      responsive: true,
      order:[]
    }

    this.dtOptions.columnDefs = [
      { targets: [12], orderable: true }

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
      var id = 'tblAgent' + this.idIndex;
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
    this.agentList = [];
    var id = 'tblAgent' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status).set('role_name', 'SALE_PROMOTER');
    this.http.get(this.funct.ipaddress + 'agent/agentsByparams', { params: params, headers: headers } )
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
