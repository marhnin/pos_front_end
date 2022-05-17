import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-withdraw-check-detail',
  templateUrl: './withdraw-check-detail.component.html',
  styleUrls: ['./withdraw-check-detail.component.css']
})
export class WithdrawCheckDetailComponent implements OnInit {

  singleDate: any;
  userFinancialTransactionDTO: any;
  token: any;
  userFinancialTransactionId: any;
  date: any;
  dateStr: string = '';

  phoneNo: '';
  userList: [];
  paymentId: 0;
  paymentList: [];
  statusList: [];

  clickkbzpay: any = false;
  clickwavepay: any = false;
  clickwavemoney: any = false;
  clickcbpay : any = false;
  kbzpaymentId: any = 12;
  wavepaymentId: any = 11;
  wavemoneypaymentId: any = 10;
  cbpayId : any = 8;
  accid : any;
  approvedBankId: any;

  constructor(public datePipe: DatePipe,private storage: LocalStorageService, private route: ActivatedRoute, private http: HttpClient, private dto: DtoService, private spinner: NgxSpinnerService, private toastr: ToastrService, 
    private router: Router, private funct: FunctService) {
    this.getAssignedPayments();
    this.getStatusList();
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
    if (this.userFinancialTransactionId == null) {
      this.phoneNo = '';
      $(document).ready(function () {
        $('#status').remove();
      });

      this.userFinancialTransactionDTO = {
      //  id: 0,
        phone_no: '',
    //    status: 'ADDED',
        account_no: '',
        payment_id: 0,
      //  forDateTime: '',
      //  type: 'WITHDRAW',
        amount: '',
        wavePassword: ''
      }
      //this.date = new Date();
    }
    else {
      $(document).ready(function () {
      });
      this.userFinancialTransactionDTO = {
        id: 0,
        phoneNo: '',
        status: '',
        accountNo: '',
        paymentId: 0,
        forDateTime: '',
        type: 'WITHDRAW',
        amount: '',
        wavePassword: ''
      };
      this.getUserFinancialTransactionById();
    }
  }

  ngOnInit(): void {
  }
  getStatusList() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('type', 'WITHDRAW');
    this.http.get(this.funct.ipaddress + 'transaction/getStatusList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.statusList = this.dto.Response;
        console.log('sts::::: ' + this.statusList);
      }
    );
  }

  getAssignedPayments() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',this.token);
    let params = new HttpParams();
    params = params.set('type', 'WITHDRAW'); 
    this.http.get(this.funct.ipaddress + 'payment/withdrawallistPayment', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response;
        console.log("Payment list is :"+ JSON.stringify(this.paymentList))
      }
    );
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 406)
    {
      this.spinner.hide();
      this.toastr.error("Bank Account Approved Fail", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      this.toastr.error("Limited Access", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
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
      $("#paymentId2").prop('disabled', true);
      $("#singleDate").prop('disabled', true);
      $("#accountNo").prop('disabled', true);
      $("#amount").prop('disabled', true);
      $("#wp").prop('disabled', true);
    });

    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('tranId', this.userFinancialTransactionId);
    this.http.get(this.funct.ipaddress + 'transaction/GetDetailList', { params: params, headers: headers })
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
      
       $("#"+this.paymentId).css('filter','grayscale(0%)');  //new code
          if(this.userFinancialTransactionDTO.isFirsttimeUsed == true)
          {
            $("#approvedAccBtn").prop('disabled', false);
            console.log("xxxxxxxxxxxxxxx true")
            this.accid = this.userFinancialTransactionDTO.accid;
            this.approvedBankId = this.userFinancialTransactionDTO.payment_id;
          }
          else
          {
            $("#approvedAccBtn").prop('disabled', true);
          }
        if (this.userFinancialTransactionDTO.wavePassword == null) {
          console.log('wave pass null cond');
          $(document).ready(function () {
            $('#wavePassword').remove();
            $('#wavePassword1').remove();
          });
        }
        if(this.userFinancialTransactionDTO.status == "APPROVED" ){
          $(document).ready(function () {
            $('#approvestatus').prop('disabled', true);
            $('#idsave').prop('disabled', true);
          });
        }
        else{
          $(document).ready(function () {
            $('#approvestatus').prop('disabled', false);
            $('#idsave').prop('disabled', false);
          });
        }
      }
    );
  } //this.userFinancialTransactionDTO.isFirsttimeUsed == true

  goApprove()
  {
    var formData = new FormData();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    formData.append("accid", this.accid);
   // formData.append("payment_id",this.approvedBankId);
    this.http.post(this.funct.ipaddress + 'userbankaccount/edituserBankAccount', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/withdraw-check-detail', this.userFinancialTransactionId]).then(() => { 
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
         window.location.href = window.location.href;
         $('#idsave').prop('disabled', false);
         $("#approvedAccBtn").prop('disabled', true);
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
    );
  }

  goSave() {
    if (this.userFinancialTransactionId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  goCancel() {
    if (this.userFinancialTransactionId == null) {
      this.cancel();
    }
    else {
      this.editCancel();
    }
  }

  cancel() {
    this.userFinancialTransactionDTO = {
      id: 0,
      phoneNo: '',
      status: 'ADDED',
      accountNo: '',
      paymentId: 0,
      forDateTime: '',
      type: 'WITHDRAW',
      amount: '',
      wavePassword: '',
    }
  }

  editCancel() {
    this.getUserFinancialTransactionById();
  }

  save() {
    this.spinner.show();
    if (this.phoneNo != '') {
      if (this.paymentId != null) {
        if (this.userFinancialTransactionDTO.accountNo != '') {
          var accountNo = this.userFinancialTransactionDTO.accountNo;
          if (accountNo.toString().length == 6) {
            if (this.userFinancialTransactionDTO.amount != '') {
              this.token = this.storage.retrieve('token');
              let headers = new HttpHeaders();
              headers = headers.set('Authorization', this.token);
              var a = this.date;
              console.log("Date1: " + a.getUTCDate());
              a.setDate(a.getDate() + 1);
              console.log("Date: " + a);
              var date = a.getUTCDate();
              console.log("day: " + date);
              var month = a.getUTCMonth() + 1;
              var year = a.getUTCFullYear();
              var monthStr = '';
              var dayStr = '';
              var yearStr = '';
              var forDateTime = '';
              var timeStr = '';
              if (date.toString().length > 1) {
                dayStr = '' + date;
              }
              else {
                dayStr = '0' + date;
              }

              if (month.toString().length > 1) {
                monthStr = '' + month;
              }
              else {
                monthStr = '0' + month;
              }

              yearStr = '' + year;
              timeStr = "12:00:00";

              forDateTime = yearStr + '-' + monthStr + '-' + dayStr + ' ' + timeStr;
              this.userFinancialTransactionDTO.forDateTime = forDateTime;
              this.userFinancialTransactionDTO.phoneNo = this.phoneNo;
              this.userFinancialTransactionDTO.paymentId = this.paymentId;
              console.log('userFinancialTransactionDTO: ' + JSON.stringify(this.userFinancialTransactionDTO));
              this.http.post(this.funct.ipaddress + 'user-financial/request-transaction', this.userFinancialTransactionDTO, { headers: headers })
              .pipe(
                catchError(this.handleError.bind(this))
               )
              .subscribe(
                result => {
                  this.dto.Response = {};
                  this.dto.Response = result;
                  if (this.dto.Response.status == 'Success') {
                    this.spinner.hide();
                    this.router.navigate(['/withdraw-check-list']).then(() => {
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
                }
              );

            }
            else {
              this.spinner.hide();
              this.toastr.error('Please enter amount', 'Invalid input!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
            }
          }
          else {
            this.spinner.hide();
            this.toastr.error('Transaction no. should be 6 numbers', 'Invalid input!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }

        }
        else {
          this.spinner.hide();
          this.toastr.error('Please enter transaction no.', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
      else {
        this.spinner.hide();
        this.toastr.error('Please choose payment', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }
    else {
      this.spinner.hide();
      this.toastr.error('Please choose user', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }

  }

  edit() {
    this.spinner.show();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.userFinancialTransactionDTO.id = this.userFinancialTransactionId;
    this.userFinancialTransactionDTO.type = "WITHDRAW";
    var formData = new FormData();
    if(this.userFinancialTransactionDTO.isFirsttimeUsed == true && this.userFinancialTransactionDTO.status == 'APPROVED')
    {
      this.toastr.error('Please approved account number', 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      this.spinner.hide();
      return;
    }
    formData.append("tranId", this.userFinancialTransactionDTO.id);
    formData.append("status", this.userFinancialTransactionDTO.status);
    this.http.post(this.funct.ipaddress + 'transaction/progressTransaction', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
         // this.router.navigate(['/withdraw-check-list']).then(() => { //withdraw-check-list
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
         // })
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
    );
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.date = $("#singleDate").val();
      console.log("hi: " + this.date);
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
