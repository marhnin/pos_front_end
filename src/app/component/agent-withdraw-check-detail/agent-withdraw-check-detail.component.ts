import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-agent-withdraw-check-detail',
  templateUrl: './agent-withdraw-check-detail.component.html',
  styleUrls: ['./agent-withdraw-check-detail.component.css']
})
export class AgentWithdrawCheckDetailComponent implements OnInit {

  singleDate: any;
  userFinancialTransactionDTO: any;
  token: any;
  userFinancialTransactionId: any;
  date: any;
  dateStr: string = '';

  phoneNo: '';
  agentList: [];
  paymentId: 0;
  paymentList: [];
  statusList: [];

  clickkbzpay: any = false;
  clickwavepay: any = false;
  clickwavemoney: any = false;
  kbzpaymentId: any = 1;
  wavepaymentId: any = 2;
  wavemoneypaymentId: any = 3;

  constructor(public datePipe: DatePipe,private storage: LocalStorageService, private route: ActivatedRoute, private http: HttpClient, private dto: DtoService, private spinner: NgxSpinnerService, private toastr: ToastrService, 
    private router: Router, private funct: FunctService) {

    this.getActiveAgents();
    this.getAssignedPayments();
    this.getStatusList();
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
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
        id: 0,
        phoneNo: '',
        status: 'ADDED',
        accountNo: '',
        paymentId: 0,
        forDateTime: '',
        type: 'WITHDRAW',
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

  getActiveAgents() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.http.get(this.funct.ipaddress + 'agent/active-agents', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentList = this.dto.Response.data.agentDTOList;
      }
    );
  }

  getStatusList() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('type', 'WITHDRAW');
    this.http.get(this.funct.ipaddress + 'user-financial/financial-transaction-statuslist', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.statusList = this.dto.Response.data.statusList;
        console.log('sts::::: ' + this.statusList);
      }
    );
  }

  getAssignedPayments() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('type', 'WITHDRAW');
    this.http.get(this.funct.ipaddress + 'payment/assigned-payments', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response.data.paymentDTOList;
      }
    );
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
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('id', this.userFinancialTransactionId);
    this.http.get(this.funct.ipaddress + 'agent-financial/agent-financialtransaction-byId', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userFinancialTransactionDTO = this.dto.Response.data.agentFinancialTransactionDTO; 
        this.date = this.userFinancialTransactionDTO.forDateTime;
        var sub = this.date.substring(0,this.date.indexOf("-")); //for show date to user
        var sub1 = this.date.substring(this.date.lastIndexOf("-"));
        var sub2 = this.date.substring(this.date.indexOf("-")+1,this.date.lastIndexOf("-"));
        var added_string = sub2 +"-"+ sub + sub1;
        this.date = new Date(added_string);
        this.date = this.datePipe.transform(this.date, 'MMM dd, yyyy');
      //  this.date = new Date(this.userFinancialTransactionDTO.forDateTime);
        this.phoneNo = this.userFinancialTransactionDTO.phoneNo;
        this.paymentId = this.userFinancialTransactionDTO.paymentId;
        if (this.userFinancialTransactionDTO.paymentId == '1') {
          this.clickkbzpay = true;
          this.clickwavepay = false;
          this.clickwavemoney = false;
        }
        else if (this.userFinancialTransactionDTO.paymentId == '2') {
          this.clickwavepay = true;
          this.clickkbzpay = false;
          this.clickwavemoney = false;
        }
        else {
          this.clickwavepay = false;
          this.clickkbzpay = false;
          this.clickwavemoney = true;
        }
        console.log("UserFinancial: " + JSON.stringify(this.userFinancialTransactionDTO));
        if (this.userFinancialTransactionDTO.wavePassword == null) {
          console.log('hiakp');
          $(document).ready(function () {
            $('#wavePassword').remove();
            $('#wavePassword1').remove();
          });
        }

        if(this.userFinancialTransactionDTO.status == "APPROVED"){
          $(document).ready(function () {
            $('#approvestatus').prop('disabled', true);
            $('#approvesavebutton').prop('disabled', true);
          });
        }
        else{
          $(document).ready(function () {
            $('#approvestatus').prop('disabled', false);
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
              headers = headers.set('Authorization', 'ITW ' + this.token);
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
              this.http.post(this.funct.ipaddress + 'agent-financial/agent-request-transaction1', this.userFinancialTransactionDTO, { headers: headers }).subscribe(
                result => {
                  this.dto.Response = {};
                  this.dto.Response = result;
                  if (this.dto.Response.message.code == '200') {
                    this.spinner.hide();
                    this.router.navigate(['/agent-withdraw']).then(() => {
                      this.toastr.success(this.dto.Response.message.message, 'Success!', {
                        timeOut: 3000,
                        positionClass: 'toast-top-right'
                      });
                    })
                  }
                  else {
                    this.spinner.hide();
                    this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
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
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.userFinancialTransactionDTO.id = this.userFinancialTransactionId;
    this.userFinancialTransactionDTO.type = "WITHDRAW";
    console.log('userFinancialTransactionDTO update: ' + JSON.stringify(this.userFinancialTransactionDTO));
    this.http.post(this.funct.ipaddress + 'agent-financial/agent-progress-transaction', this.userFinancialTransactionDTO, { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.message.code == '200') {
          this.spinner.hide();
          this.router.navigate(['/agent-withdraw']).then(() => {
            this.toastr.success(this.dto.Response.message.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
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
