import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

declare var $: any;

@Component({
  selector: 'app-agent-withdraw-check-new',
  templateUrl: './agent-withdraw-check-new.component.html',
  styleUrls: ['./agent-withdraw-check-new.component.css']
})
export class AgentWithdrawAddNewComponent implements OnInit {

  singleDate: any;
  agentFinancialTransactionDTO: any;
  token: any;
  activeagentList : any;
  refCodeList : any;
  agentFinancialTransactionId: any;
  agentDTO : any;
  commissionDetailDTO : any;
  batchList : [];
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
   // this.getAssignedPayments();
    //this.getStatusList();
    //this.getBatchNo();

    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }
      $(document).ready(function () {
        $('#status').remove();
      });
      this.agentFinancialTransactionDTO = {
        id: 0,
        phoneNo: '',
        batchNo : 'Please Select',
        status: 'ADDED',
        transactionNo: '',
        refcode : '',
        agentName : '',
        paymentId: 0,
        type: 'WITHDRAW',
        amount: ''
      }
  }

  ngOnInit(): void {
  }

  getBatchNo(refCode)
  {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.set('referralCode', refCode);
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.http.get(this.funct.ipaddress + 'commission/get-batch-no',{params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.batchList = this.dto.Response.data.tempcomissionDetailDTOList;
      }
    );
  }

  goSave() {
      this.save();
  }

  save() {
          this.spinner.show();
          if (this.kbzpaymentId != null || this.wavepaymentId != null) {
            if (this.clickkbzpay == true) {
              this.agentFinancialTransactionDTO.paymentId = this.kbzpaymentId;
            }
            else {
             this.agentFinancialTransactionDTO.paymentId = this.wavepaymentId;
            }
            if(this.agentFinancialTransactionDTO.agentName == '')
            {
              this.agentFinancialTransactionDTO.agentName = $("#agentName").val();
            }
            if(this.agentFinancialTransactionDTO.phoneNo == '')
            {
              this.agentFinancialTransactionDTO.phoneNo = $("#accountNo").val();
            }
            if(this.agentFinancialTransactionDTO.amount == '')
            {
              this.agentFinancialTransactionDTO.amount = $("#amount").val();
            }
              this.token = this.storage.retrieve('token');
              let headers = new HttpHeaders();
              headers = headers.set('Authorization', 'ITW ' + this.token);
              console.log('agentFinancialTransactionDTO: ' + JSON.stringify(this.agentFinancialTransactionDTO));
              this.http.post(this.funct.ipaddress + 'agent-financial/agent-request-transaction', this.agentFinancialTransactionDTO, { headers: headers }).subscribe(
                result => {
                  this.dto.Response = {};
                  this.dto.Response = result;
                  if (this.dto.Response.message.code == '200') {
                    this.spinner.hide();
                    this.router.navigate(['/agent-withdraw']).then(() => {
                        this.spinner.hide();
                        this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
                          timeOut: 3000,
                          positionClass: 'toast-top-right',
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
            }else {
              this.spinner.hide();
              this.toastr.error("Please choose payment method", 'Invalid!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
            }
        }
  kbzTopUP() {
    this.clickkbzpay = true;
    this.clickwavepay = false;
    this.kbzpaymentId = 1;
  }

  wavepayTopUP() {
    this.clickwavepay = true;
    this.clickkbzpay = false;
    this.wavepaymentId = 2;
  }
//by enter key
  getDataByRefCode(e)
  {
    if (e.keyCode == 13)
    {
      this.spinner.show();
      var refcode = $('#refcode').val();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      let params = new HttpParams();
      params = params.set('refcode', refcode);
      this.http.get(this.funct.ipaddress + 'agent/agents-by-refcode', {params: params, headers: headers }).subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.agentDTO = this.dto.Response.data.agentDTO;
        if(this.dto.Response.message.code == "200")
        {
          $("#accountNo").val(this.agentDTO.phoneNo);
          $("#agentName").val(this.agentDTO.name);
          $('#amount').val("");
        }
        else{
          $("#accountNo").val("");
          $("#agentName").val("")
        }
        this.getBatchNo(refcode); //call batch no
         this.spinner.hide();
        }
      );
    }
    else if (e.keyCode == 40)
    {
        // action
    }  
    else if (e.keyCode == 38)
    {
        // action
    }  
  }
  //by onchange
  getDataByRefCodeChange()
  {
    this.spinner.show();
    var refcode = $('#refcode').val();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('refcode', refcode);
    this.http.get(this.funct.ipaddress + 'agent/agents-by-refcode', {params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentDTO = this.dto.Response.data.agentDTO;
      if(this.dto.Response.message.code == "200")
      {
        $("#accountNo").val(this.agentDTO.phoneNo);
        $("#agentName").val(this.agentDTO.name);
        $('#amount').val("");
      }
      else{
        $("#accountNo").val("");
        $("#agentName").val("")
      }
      this.getBatchNo(refcode); //call batch no
       this.spinner.hide();
      }
    );
  }
  getCommissionAmt()
  {
      this.spinner.show();
      var batchNo = $('#batchNo').val();
      var refCode = $('#refcode').val();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      let params = new HttpParams();
      console.log(batchNo)
      params = params.set('batchNo', batchNo).set('refCode', refCode);
      this.http.get(this.funct.ipaddress + 'commission/get-commission-by-batchNo', {params: params, headers: headers }).subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.commissionDetailDTO = this.dto.Response.data.commissionDetailDTO;
        if(this.dto.Response.message.code == "200")
        {
          console.log(this.commissionDetailDTO.comission)
          $("#amount").val(this.commissionDetailDTO.comission);
        }
        else{
          $("#amount").val("");
        }
         this.spinner.hide();
        }
      );
  }
  getActiveAgents() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.http.get(this.funct.ipaddress + 'agent/active-agents', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.activeagentList = this.dto.Response.data.agentDTOList;
        console.log(">>>active agents>>>"+this.activeagentList)
      }
    );
  }

}
