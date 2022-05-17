import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common';
import { ɵangular_packages_platform_browser_animations_animations_f } from '@angular/platform-browser/animations';
declare var $: any;

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-topup-check-detail-update',
  templateUrl: './topup-check-detail-update.component.html',
  styleUrls: ['./topup-check-detail-update.component.css'],
  providers: [DatePipe]
})
export class TopupCheckDetailUpdateComponent implements OnInit {

  singleDate: any;
  userFinancialTransactionDTO: any;
  token: any;
  userFinancialTransactionId: any;
  date: any;
  updatedDate :any;
  dateStr: string = '';
  phoneNo: '';
  amount:any;
  userList: [];
  paymentId: 0;
  paymentList: [];
  statusList: [];
  model : any;
  clickkbzpay: any = false;
  clickwavepay: any = false;
  kbzpaymentId: any = 7;
  wavepaymentId: any = 9;
  paymentAccList : any;

  constructor(public datePipe: DatePipe,private storage: LocalStorageService, private route: ActivatedRoute, private http: HttpClient, private dto: DtoService, private spinner: NgxSpinnerService, private toastr: ToastrService,
    private router: Router, private funct: FunctService) {
   // this.getActiveUsers();
    this.getAssignedPayments();
    this.getStatusList(); //need to use
    $('#deleteBtn').remove();
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload();
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }
    this.userFinancialTransactionId = this.route.snapshot.paramMap.get("id");
    if (this.userFinancialTransactionId != null) {
      $(document).ready(function () {
      });
      this.userFinancialTransactionDTO = {
        id: 0,
        phoneNo: '',
        status: '',
        transactionNo: '',
        paymentId: 0,
        forDateTime: '',
        type: 'TOPUP',
        amount : ''
      };
      this.getUserFinancialTransactionById();
    }
  }

  ngOnInit(): void {

    this.model = {
      tranId: '',
      status: '',
      account_no : ''
    } //add new
  }

  //getActiveUsers() {
  //  this.token = this.storage.retrieve('token');
  //  let headers = new HttpHeaders();
  //  headers = headers.set('Authorization', this.token);
  //  this.http.get(this.funct.ipaddress + 'transaction/getAllactiveUsers',{headers: headers}).subscribe(
  //    result => {
  //      this.dto.Response = {};
  //      this.dto.Response = result;
  //      this.userList = this.dto.Response;//data.userDTOList;
  //      console.log(this.userList)
  //    }
  //  );
  //}

  getStatusList() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('type', 'TOPUP');
    this.http.get(this.funct.ipaddress + 'transaction/getStatusList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.statusList = this.dto.Response;
      }
    );
  }

  getAssignedPayments() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',this.token);
    let params = new HttpParams();
    params = params.set('type', 'TOPUP');
    this.http.get(this.funct.ipaddress + 'payment/topuplistPayment', {  headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response;
      }
    );
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
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

  getUserFinancialTransactionById() {
    $(document).ready(function () {
      $("#phoneNo").prop('disabled', true);
      $("#paymentId").prop('disabled', true);
      $("#paymentId1").prop('disabled', true);
      $("#singleDate").prop('disabled', true);
      $("#transactionNo").prop('disabled', true);
      $("#amount").prop('disabled', true);
    });
     this.token = this.storage.retrieve('token');
     let headers = new HttpHeaders();
     headers = headers.set('Authorization',  this.token);
     let params = new HttpParams();
     params = params.set('tranId', this.userFinancialTransactionId);
     this.http.get(this.funct.ipaddress + 'transaction/GetDetailTopupList', { params: params, headers: headers }) 
     .pipe(
      catchError(this.handleError.bind(this))
     )
     .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userFinancialTransactionDTO = this.dto.Response;
        this.date = this.userFinancialTransactionDTO.created_date_string_1;
        this.phoneNo = this.userFinancialTransactionDTO.phone_no;
        this.paymentId = this.userFinancialTransactionDTO.payment_id;
        this.amount = this.userFinancialTransactionDTO.amount;

        if ( this.userFinancialTransactionDTO.payment_id == '7') {
          this.clickkbzpay = true;
          this.clickwavepay = false;
        }
        else {
          this.clickwavepay = true;
          this.clickkbzpay = false;
        }
        if(this.userFinancialTransactionDTO.status == "APPROVED"){ 
          $(document).ready(function () {
            $('#approvestatus').prop('disabled', true);
            $('#idsave').prop('disabled', true);
            $('#acc').prop('disabled', true);/*XXXXXX*/

          });
        }
        else{
          $(document).ready(function () {
            $(document).ready(function () {
            $('#approvestatus').prop('disabled', false);
            $('#idsave').prop('disabled', false);
          });
          });
        }
        if(this.userFinancialTransactionDTO.status == "ADDED"){ //if status is already added
            this.userFinancialTransactionDTO.name = this.userFinancialTransactionDTO.admin_name;
           //  $('#deleteBtn').show();
            // $('#approvestatus').prop('disabled', true);
            // $('#idsave').remove();
        }
        $("#"+this.paymentId).css('filter','grayscale(0%)');
        this.getPaymentById();//call method
      }
    );
  }
  getPaymentById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('id', this.paymentId.toString());
    this.http.get(this.funct.ipaddress + 'payment/GetAccountDetailByPaymentID', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentAccList = this.dto.Response;
        this.paymentAccList.push(" ");
      });
  }
  flagAcc()
  {
    this.model.account_no = $("#acc").val();
  }

  edit() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    if(this.userFinancialTransactionDTO.status != 'DENIED' && this.userFinancialTransactionDTO.status != 'ADDED')
    {
      if( this.model.account_no == "" ||  this.model.account_no == undefined ||  this.model.account_no == null)
      {
        this.toastr.error("Please choose account number", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        return;
      }
    }
    else
    {
      this.model.account_no = '0000';
    }
    this.spinner.show();
    headers = headers.set('Authorization', this.token);
    const formData = new FormData();
    formData.append("tranId", this.userFinancialTransactionId); 
    formData.append("status", this.userFinancialTransactionDTO.status);
    formData.append("account_no", this.userFinancialTransactionDTO.account_id); /*XXXXXXXX*/

    var res = this.http.post(this.funct.ipaddress + 'transaction/progressTransactionPoint',formData,{headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/topup-check-list']).then(() => {
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
 
  editCancel() {
    this.getUserFinancialTransactionById();
  }
/*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
 deleteData(){
    $('#deleteData1').modal("show");
    }
    deleteOk()
    {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    const formData = new FormData();
    formData.append("tranId", this.userFinancialTransactionId); 
    this.http.post(this.funct.ipaddress + 'transaction/deleteTransaction', formData, {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if(this.dto.Response.status == 'Success'){
          this.spinner.hide();
            this.router.navigate(['/topup-check-list']).then(() => {
              this.toastr.success(this.dto.Response.message, 'Success!', {
                timeOut: 3000,
                positionClass: 'toast-top-right'
              });
            })
        }
        else{
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      });
    }

  onChangeSingle() {
    $(document).ready(function () {
      this.date = $("#singleDate").val();
    });
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;

  }


}
