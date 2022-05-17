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
  selector: 'app-payment-info',
  templateUrl: './payment_info.component.html',
  styleUrls: ['./payment_info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions2 : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2 : Subject<any> = new Subject();

  accountNo: string = '';
  type: string = '';
  status: string = '';
  paymentList: any;
  idIndex: any;
  idIndex2 : any;
  token: any;
  bankName : any;
  account_no : any;
  code_number : any;
  account_name : any;
  paymentBankAccountHolderDetaiList : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private toastr: ToastrService,) {
    this.idIndex = 1;
    this.idIndex2 = 1;
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

    this.dtOptions2 = {
      responsive: true,
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
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblpayment';
      $('#tblpayment').dataTable();
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
    this.paymentList = [];
    var id = 'tblpayment';
  //var table = $('#' + id).DataTable();
    this.idIndex = this.idIndex + 1;
    $('#tblpayment').dataTable().fnClearTable();
    $('#tblpayment').dataTable().fnDestroy();
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    params = params.set('accountNo', this.accountNo).set('status', this.status);
    this.http.get(this.funct.ipaddress + 'payment/GetPaymentDetailListPyParams', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response;
        console.log(JSON.stringify(this.paymentList))
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



  goModal(id,  accountNo, bankName, codeNumber , accountName){
    var id1 = 'paymentBankAccountHolderDetaiList' + this.idIndex2;
    var table = $('#' + id1).DataTable();
    table.destroy();
    this.idIndex2 = this.idIndex2 +1;
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    this.paymentBankAccountHolderDetaiList = [];
     params = params.set('paymentDetailId', id);
    this.http.get(this.funct.ipaddress + 'payment/GetAccountHolderDetaiList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentBankAccountHolderDetaiList = this.dto.Response;
        this.account_no = accountNo;
        this.bankName = bankName;
        this.code_number = codeNumber;
        this.account_name = accountName;
        console.log("AKP: " +JSON.stringify(this.paymentBankAccountHolderDetaiList));
        this.dtTrigger2.next();
      }
    ); 
    this.spinner.hide();
    $('#browseAccountHolderList').modal("show");
  }

}
