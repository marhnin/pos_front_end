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
declare var $: any;

@Component({
  selector: 'app-commission-calculation',
  templateUrl: './commission-calculation.component.html',
  styleUrls: ['./commission-calculation.component.css']
})
export class CommissionCalculationComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  idIndex: any;
  fromdate: any;
  todate: any;
  batch: any;
  createdBy: any;
  createdDate:any;
  d : any;
  singleDate : any;
  token: any;
  calculation_id : any;
  calculationDTO : any;
  walletAmount : any;
  comissionAmount :any;
  comissionDTOList :any;
  commissionId : any;
  constructor(private storage: LocalStorageService, private datepipe: DatePipe, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { 
      this.d = new Date();
      this.createdDate = this.datepipe.transform(this.d, 'MMM dd, yyyy');
      this.idIndex = 1;
      this.singleDate = '';
      this.search();
    }

  ngOnInit(): void {
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }
    this.calculation_id = this.route.snapshot.paramMap.get("id");
    if (this.calculation_id == null) {
      this.calculationDTO = {
        calculation_id: 0,
        fromdate: '',
        todate: '',
        batch: '',
        createdBy: '',
        createdDate:''
      };
    }
    else {
      this.calculationDTO = {
        calculation_id: 0,
        fromdate: '',
        todate: '',
        batch: '',
        createdBy: '',
        createdDate:'',
      };
      this.getResultById();
    }
    this.dtOptions = {
      responsive: true,
      order: []
    }
  }
  getResultById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('id', this.calculation_id); 
    this.http.get(this.funct.ipaddress + 'comission/detail', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.calculationDTO = this.dto.Response.data.oddDTO; 
        this.createdDate = new Date(this.calculationDTO.createdDate); 
      }
    );
  }
  onChangeDate() {
    $(document).ready(function () {
      this.singleDate = $("#createdDate").val();
    });
  }

  goOddSave() {
    if (this.calculation_id == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }
  save() {
    this.spinner.show();
    if (this.calculationDTO.odd != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      this.http.post(this.funct.ipaddress + 'comission/save', this.calculationDTO, { headers: headers }).subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.spinner.hide();
            this.router.navigate(['/comission-calculation']).then(() => {
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
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.spinner.show();
    if (this.calculationDTO.createdDate != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      var a = this.createdDate;
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
      var forDate = '';
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
      forDate = yearStr + '-' + monthStr + '-' + dayStr;
      this.calculationDTO.date = forDate;
      console.log("ResultDTO: " + JSON.stringify(this.calculationDTO));
      this.http.post(this.funct.ipaddress + 'commission/edit', this.calculationDTO, { headers: headers }).subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.spinner.hide();
            this.router.navigate(['/comission-calculation']).then(() => {
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
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  goCancel() {
    if(this.calculation_id == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }

  cancel(){
    this.calculationDTO = {
        calculation_id: 0,
        fromdate: '',
        todate: '',
        batch: '',
        createdBy: '',
        createdDate:'',
    };
  }
  
  editCancel(){
    this.getResultById();
  }

  search() {
    this.comissionDTOList = [];
    var id = 'tblcommission' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.dto.token);
    let params = new HttpParams();
    if (this.createdDate == '' || this.createdDate == undefined) {
      this.createdDate = this.d;
    }
    else{
      this.createdDate = this.singleDate;
    }
    var date = new Date(this.d);
    var year = date.getFullYear();
    var month = date.getMonth()+1; //getMonth is zero based;
    var m = '', dd ='';
    if (month < 10) 
       m = '0' + month ;
    else
       m = '' + month;
    var day= date.getDate();
    if (day < 10) 
     dd = '0' + day ;
    else
     dd = '' + day;
    var formatted = year+"-"+m+"-"+dd;
    params = params.set('createdDate', formatted).set('balance',this.walletAmount).set('comission',this.comissionAmount); 
    this.http.get(this.funct.ipaddress + 'commission/commission-calculation-by-params', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.comissionDTOList = this.dto.Response.data.comissionDTOList;
        console.log(this.dto.Response.data.commissionDTOList)
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }

  delete(id)
  {
    $("#deleteData").modal("show");
    this.commissionId = id;
  }

  deleteCommissionById() { //if ok button
    this.spinner.show();
    console.log('this.commissionId>> ' + this.commissionId);
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('id', this.commissionId);
    this.http.get(this.funct.ipaddress + 'commission/delete', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log(this.dto.Response.message.code)
        if (this.dto.Response.message.code == '200') {
          this.spinner.hide();
          $('#deleteData').modal("hide");
          this.router.navigate(['/commission']).then(() => {
            this.toastr.success(this.dto.Response.message.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          });
        }
        else {
          this.spinner.hide();
          $('#deleteData').modal("hide");
          this.router.navigate(['/commission']).then(() => {
          this.toastr.error(this.dto.Response.message.message, 'Fail!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        });
        }
      });
  }
  //if cancel
  btncancel()
  {
    $('#deleteData').modal("hide");
    this.router.navigate(['/commission']).then(() => {
    this.toastr.error("Commission delete", 'Cancel!', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  });
  }
}
