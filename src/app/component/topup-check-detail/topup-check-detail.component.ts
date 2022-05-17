import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
declare var $: any;

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-topup-check',
  templateUrl: './topup-check-detail.component.html',
  styleUrls: ['./topup-check-detail.component.css']
})
export class TopupCheckDetailComponent implements OnInit {

  singleDate: any;
  userFinancialTransactionDTO: any;
  token: any;
  userFinancialTransactionId: any;
  date: any;
  dateStr: string = '';
  model : any;

  phoneNo: '';
  userList: [];
  paymentId: 0;
  paymentList: [];
  statusList: [];
  clickId = [] ;
  paymentAccList: any;

  clickkbzpay: any = false;
  clickwavepay: any = false;
  kbzpaymentId: any = 7;
  wavepaymentId: any = 9; 
  added_guid : any;

  constructor(private storage: LocalStorageService, private route: ActivatedRoute, private http: HttpClient, private dto: DtoService, 
    private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private funct: FunctService) {
    this.getAssignedPayments();
    this.model = {
      payment_id: 0,
      amount: 1000,
      transaction_no: '',
      account_no : '00000',
      guid : ''
    }

    if (!this.storage.retrieve('loadFlag')) 
    {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload();
      }, 1);
    }
    else 
    {
      console.log("DDDD " + this.storage.retrieve('loadFlag'))
      console.log('Clear')
      this.storage.clear('loadFlag');
    }

    this.userFinancialTransactionId = this.route.snapshot.paramMap.get("id");
    
    if (this.userFinancialTransactionId == null) {
     
      $(document).ready(function () {
      });

      this.model = {
        payment_id: 0,
        amount: 1000,
        transaction_no: '',
        account_no : '',
        guid : '' /*add this*/
      }

    }
    else {
      $(document).ready(function () {
      });
      this.model = {
       payment_id: 0,
       amount: 0,
       transaction_no: '',
       account_no : '',
       guid : ''
      };
    }
  }

  ngOnInit(): void {
    this.added_guid = Guid.create();
  }

  kbzTopUP() {
    this.clickkbzpay = true;
    this.clickwavepay = false;
    this.kbzpaymentId = 7;
  }

  wavepayTopUP() {
    this.clickwavepay = true;
    this.clickkbzpay = false;
    this.wavepaymentId = 9;
  }


  getStatusList() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('type', 'TOPUP');
    this.http.get(this.funct.ipaddress + 'user-financial/financial-transaction-statuslist', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.statusList = this.dto.Response.data.statusList;
      }
    );
  }

  getAssignedPayments() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('type', 'TOPUP');
    this.http.get(this.funct.ipaddress + 'payment/topuplistPayment', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response;
      }
    );
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

  save() {
    this.spinner.show();
      if (this.paymentId != null) { 
        if (this.model.transaction_no != '' || this.model.transaction_no != null || this.model.transaction_no != undefined) {
          var transactionNo = this.model.transaction_no;
          if (transactionNo.length >= 6) 
          {
            if(this.model.amount != '' || this.model.amount != null || this.model.amount != undefined) {
              this.token = this.storage.retrieve('token');
              let headers = new HttpHeaders();
              headers = headers.set('Authorization',  this.token);
              this.model.payment_id = this.paymentId;
             
             if(this.model.account_no == '' || this.model.account_no == null || this.model.account_no == undefined)
             {
                this.spinner.hide();
                this.toastr.error('Please choose account number', 'Invalid input!', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                });
                return;
             }
             /*XXXXXXXX*/
              this.model.guid = this.added_guid.value;
              this.http.post(this.funct.ipaddress + 'transaction/topupPointAdded', this.model, { headers: headers })
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
                  else{
                    this.spinner.hide();
                    console.log(this.dto.Response)
                    this.toastr.error(this.dto.Response.message, 'Invalid!', {
                      timeOut: 3000,
                      positionClass: 'toast-top-right',
                    });
                  }
                });
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
            this.toastr.error('Transaction no. should be greather than or equal 6 numbers', 'Invalid input!', {
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

  cancel() {
    this.userFinancialTransactionDTO = {
      id: 0,
      phoneNo: '',
      status: 'ADDED',
      transactionNo: '',
      paymentId: 0,
      forDateTime: '',
      type: 'TOPUP',
      amount: ''
    }
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.date = $("#singleDate").val();
    });
  }

  numericOnly(event): boolean { 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }

changeAction(id) 
 {
   if(this.clickId.length == 0)
   {
    $("#"+id).css('filter','grayscale(0%)');
      this.clickId.push(id);
      this.paymentId = id;
   }
   else
   {
     for(var i = 0 ; i < this.clickId.length; i++)
     {
       if(this.clickId[i] != id)
       {
          $("#"+this.clickId[i]).css('filter','grayscale(100%)');
          $("#"+id).css('filter','grayscale(0%)');
          this.clickId[i] = id;
          this.paymentId = id;
       }
       else
       {
         $("#"+this.clickId[i]).css('filter','grayscale(0%)');
         this.clickId[i] = id;
         this.paymentId = id;
       }
     }
   }
   this.getPaymentById(id);
 }

 getPaymentById(id) {
  this.token = this.storage.retrieve('token');
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', this.token);
  let params = new HttpParams();
  params = params.set('id', id);
  console.log(this.paymentId)
  this.paymentAccList = [];
  this.http.get(this.funct.ipaddress + 'payment/GetAccountDetailByPaymentID', { params: params, headers: headers })
  .pipe(
    catchError(this.handleError.bind(this))
   )
  .subscribe(
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
  console.log("Accoutn number : "+this.model.account_no)
}

  goModal()
  {
    $('#confirmData').modal("show");
  }

}
