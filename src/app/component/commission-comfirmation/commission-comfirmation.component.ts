import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DataTableDirective } from 'angular-datatables';

import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-commission-comfirmation',
  templateUrl: './commission-comfirmation.component.html',
  styleUrls: ['./commission-comfirmation.component.css']
})

export class CommissionConfrimComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();
  dtOptions2: DataTables.Settings = {};

  idIndex: any;
  idCommissionDetailIndex: any;
  token: any;
  calculateId: any;
  createdDate : any;
  referralCode : any;
  confrimId: any;
  phoneNo: string = '';
  name: string = '';
  walletAmount : any;
  commission : any;
  singleDate: string = '';
  date: any;
  status: string = '';
  commissionList: any;
  confirmAllCheck: any = false;
  confirmallArr: any = [{id:''}];
  isChecked: any = false;
  calculatedDate: any;
  commissiontodayDate: any;
  commissionchangeDate: any;
  commissionDetailDTOList : any;
  totalCommission : any;
  isExpand : any = false;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private datepipe: DatePipe, private toastr: ToastrService) {
    this.idIndex = 1;
    this.idCommissionDetailIndex = 1;
    this.date = new Date();
    this.createdDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');
    this.status = "PENDING";
    this.search();
  }
  ngOnInit(): void {
    this.status = "PENDING";
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
    });
    this.dtOptions = {
      responsive: true,
      order: []
    }
    this.dtOptions.columnDefs = [
      { targets: [2], "width": "120px" },
      { targets: [0], orderable: false },
    ];

    this.dtOptions2 = {
      responsive: true,
      order: []
    }
    this.dtOptions2.columnDefs = [
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

  search() {
    this.commissionList = [];
    var id = 'tblcommission' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    if (this.createdDate == '' || this.createdDate == undefined) {
      this.createdDate = this.date;
    }
    else{
      this.createdDate = this.singleDate;
    }
    var date = new Date(this.date);
    var year = date.getFullYear();
    var month = date.getMonth()+1; //getMonth is zero based;
    var m = '', d = '';
    if (month < 10) 
       m = '0' + month ;
    else
       m = '' + month;
    var day= date.getDate();
    if (day < 10) 
     d = '0' + day ;
    else
     d = '' + day;
    var formatted = year+"-"+m+"-"+d;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    console.log("<<< name is :>>> "+this.name)
    console.log("<<<< status is >>>> "+this.status)
    params = params.set('referralCode',this.referralCode).set('name',this.name).set('calculatedDate',formatted).set('walletAmount', this.walletAmount).set('status',this.status);
    this.http.get(this.funct.ipaddress + 'commission/commission-details-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        console.log("result>> " + JSON.stringify(result));
        this.dto.Response = result;
        this.commissionList = this.dto.Response.data.comissionDetailDTOList;
        console.log("this.commissionList>> " + JSON.stringify(this.commissionList));

        if(this.commissionList != undefined){
          for (let i = 0; i < this.commissionList.length; i++) {
            if (this.commissionList[i].status == "CONFIRMED") {
              this.commissionList[i].uiDisable = true;
             }
             else if(this.commissionList[i].status == "PENDING"){
              this.commissionList[i].uiDisable = false;
            }
            if(this.commissionList[i].status == "PENDING")
            {
              this.commissionList[i].confirm_by = '';
            }
            if(this.commissionList[i].childcommissionSize > 0)
            {
              this.commissionList[i].size = true;
              this.commissionList[i].isExpand = this.isExpand;
            }
            else
            {
              this.commissionList[i].size = false;
            }

          }
        }
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  onChangeDate() {
    $(document).ready(function () {
      this.singleDate = $("#createdDate").val();
    });
  }

  checkuncheckall() {
    if (this.isChecked == true) {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }
  }

  changeSelection(ev, id) {
    console.log("id..... " + id);
    var target = ev.target;
    this.confirmallArr = [];

    if (target.checked && id == 0) {
      for (let i = 0; i < this.commissionList.length; i++) {
        this.commissionList[i].checkStatus = "check";
      }
    }
    else if (target.checked && id != 0) {
      for (let i = 0; i < this.commissionList.length; i++) {
        if (this.commissionList[i].id == id) {
          this.commissionList[i].checkStatus = "check";
        }
      }
    }
    else if (!target.checked && id == 0) {
      for (let i = 0; i < this.commissionList.length; i++) {
        this.commissionList[i].checkStatus = "uncheck";
      }
    }
    else if (!target.checked && id != 0) {
      for (let i = 0; i < this.commissionList.length; i++) {
        if (this.commissionList[i].id == id) {
          this.commissionList[i].checkStatus = "uncheck";
        }
      }
    }
    console.log(" this.threedwinnerList >>" + JSON.stringify(this.commissionList));
    this.checkedData();
  }

checkedData() {
    for (let i = 0; i < this.commissionList.length; i++) {
      if (this.commissionList[i].checkStatus == "check") {
        //this.confirmallArr.id.push(this.threedwinnerList[i].id);
        this.confirmallArr.push(this.commissionList[i].id);
      }
    }
    console.log("this.confirmallArr >>" + JSON.stringify(this.confirmallArr));
  }

  confirmAll() {
    console.log("click confirmall");
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('ids', this.confirmallArr);
    this.http.get(this.funct.ipaddress + 'commission/commission-confirm', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.message.code == '200') {
          this.spinner.hide();
          this.router.navigate(['/commission-confirmation']).then(() => {
            this.toastr.success(this.dto.Response.message.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.commissionList = this.dto.Response.threedwinnerListDTO
          for (let i = 0; i < this.commissionList.length; i++) {
            if (this.commissionList[i].checkStatus == "check") {
              this.commissionList[i].uiDisable = true;
             }
             else if(this.commissionList[i].checkStatus == "uncheck"){
              this.commissionList[i].uiDisable = false;
            }
          }
        }
        else if(this.dto.Response.message.code == '403') {
            this.spinner.hide();
            this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
        else
        {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
       }
      this.spinner.hide();
      });
  }

  confirmOne(id) {
    this.confrimId = id;
    this.confirmallArr = [];
    this.confirmallArr.push(this.confrimId);
    console.log("this.comfirmlist>>" + JSON.stringify(this.confirmallArr));
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    params = params.set('ids', this.confirmallArr);
    this.http.get(this.funct.ipaddress + 'commission/commission-confirm', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.message.code == '200') {
          this.spinner.hide();
          this.router.navigate(['/commission-confirmation']).then(() => {
            this.toastr.success(this.dto.Response.message.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.commissionList = this.dto.Response.threedwinnerListDTO
          for (let i = 0; i < this.commissionList.length; i++) {
            if (this.commissionList[i].checkStatus == "check") {
              this.commissionList[i].uiDisable = true;
             }
             else if(this.commissionList[i].checkStatus == "uncheck"){
              this.commissionList[i].uiDisable = false;
            }
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
        this.spinner.hide();
      });
  }

  goModal(id){

    var tblid = 'tblcommissiondetail' + this.idCommissionDetailIndex;
    var table = $('#' + tblid).DataTable();
    table.destroy()
    this.idCommissionDetailIndex  =  this.idCommissionDetailIndex +1;
    

    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
     params = params.set('commissionId', id);
    this.http.get(this.funct.ipaddress + 'commission/commission-detail', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.commissionDetailDTOList = this.dto.Response.data.comissionDetailDTOList; 
          for (let i = 0; i < this.commissionDetailDTOList.length; i++) {
            this.totalCommission = this.commissionDetailDTOList[i].totalCommission;
          }
        console.log("Commission Detail DTO: " +JSON.stringify(this.commissionDetailDTOList));
        this.dtTrigger2.next();
      }
    ); 
    this.spinner.hide();
    $('#commussionDetailData').modal("show");
  }
}
