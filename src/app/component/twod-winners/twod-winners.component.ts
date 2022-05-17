import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
//import { te } from 'date-fns/locale';
//import { compilePipeFromMetadata } from '@angular/compiler';


declare var $: any;

@Component({
  selector: 'app-twod-winners',
  templateUrl: './twod-winners.component.html',
  styleUrls: ['./twod-winners.component.css']
})
export class TwodWinnersComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  idIndex: any;
  token: any;
  twodwinnerId: any;
  confrimId: any;
  phoneNo: string = '';
  name: string = '';
  singleDate: string = '';
  time: string = '';
  status: string = '';
  twodwinnerList: any;
  confirmAllCheck: any = false;
  confirmallArr: any;
  isChecked: any = false;
  winnerDate: any;
  winnertodayDate: any;
  winnerchangeDate: any;
  uiDisable: any = false;
  confirm_by : '';
  todate: any; //add the following
  toDate : any;
  todatetodaydate : any;
  todatechangedate : any;
 

  alltodaytodate : any;
  alldate: any;
  alltodayDate : any;
  alltoDate: any;
  alltodate : any;
  alltodatechangeDate: any;
  //twodWinnerDTO: any;
  tbet_amount : any;
  twin_amount : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private datepipe: DatePipe, private toastr: ToastrService,) {
    this.idIndex = 1;

    this.winnerDate = new Date();
    console.log("this.approvedate>> " + this.winnerDate);
    this.winnertodayDate = this.datepipe.transform(this.winnerDate, 'MMM dd, yyyy');
    console.log("this.todayDate>> " + this.winnertodayDate);

    this.alltodate = new Date();
    console.log("this.alldate>> " + this.alltodate);
    this.alltodayDate = this.datepipe.transform(this.alltodate, 'MMM dd, yyyy');
    console.log("this.alltodayDate>> " + this.alltodayDate);
    this.status = "PENDING";
    $(".total").hide();
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
      order: []
    }

    this.dtOptions.columnDefs = [
      { targets: [0], orderable: false },
      { targets: [7], orderable: false }
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
    if(error.status == 201)
    {
      this.spinner.hide();
      this.router.navigate(['/twod-winners-list']).then(() => {
        this.toastr.error('Already Confirmed', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      })
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblWinners' + this.idIndex;
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
    this.twodwinnerList = [];
    var id = 'tblWinners' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    this.alltoDate = $("#alltodate").val();
    var total_bet_amout = 0, total_win_amount = 0;
    if (this.singleDate == '' || this.singleDate == undefined) {
      this.winnerchangeDate = this.winnertodayDate;
    }
    else {
      this.winnerchangeDate = this.singleDate;
    }

    if (this.alltoDate == '' || this.alltoDate == undefined) {
      this.alltodatechangeDate = this.alltodayDate;
    }
    else {
      this.alltodatechangeDate = this.alltoDate;
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('phoneNo', this.phoneNo).set('name', this.name).set('fromDate', this.winnerchangeDate).set('toDate',this.alltodatechangeDate).set('time', this.time).set('status', this.status);
    console.log("params>> " + JSON.stringify(params));
    this.http.get(this.funct.ipaddress + 'winner/twod-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twodwinnerList = this.dto.Response;
        if(this.twodwinnerList != undefined){
         
          for (let i = 0; i < this.twodwinnerList.length; i++) {
            total_bet_amout = total_bet_amout + parseInt(this.twodwinnerList[i].total_bet_amout);
            this.tbet_amount = total_bet_amout;
            if (this.twodwinnerList[i].status == "CONFIRMED") {
              this.twodwinnerList[i].uiDisable = true;
             }
             else if(this.twodwinnerList[i].status == "PENDING"){
              this.twodwinnerList[i].uiDisable = false;
            }
            if(this.twodwinnerList[i].status == "PENDING")
            {
              this.twodwinnerList[i].created_by = '';
            }
          }
        }
        this.dtTrigger.next();
        this.spinner.hide();
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
      for (let i = 0; i < this.twodwinnerList.length; i++) {
        this.twodwinnerList[i].status = "check";
      }
    }
    else if (target.checked && id != 0) {
      for (let i = 0; i < this.twodwinnerList.length; i++) {
        if (this.twodwinnerList[i].id == id) {
          this.twodwinnerList[i].status = "check";
        }
      }
    }
    else if (!target.checked && id == 0) {
      for (let i = 0; i < this.twodwinnerList.length; i++) {
        this.twodwinnerList[i].status = "uncheck";
      }
    }
    else if (!target.checked && id != 0) {
      for (let i = 0; i < this.twodwinnerList.length; i++) {
        if (this.twodwinnerList[i].id == id) {
          this.twodwinnerList[i].status = "uncheck";
        }
      }
    }
    this.checkedData();
  }

  checkedData() {
    for (let i = 0; i < this.twodwinnerList.length; i++) {
      if (this.twodwinnerList[i].status == "check") {
        this.confirmallArr.push(this.twodwinnerList[i].id);
      }
    }
    console.log("this.confirmallArr >>" + JSON.stringify(this.confirmallArr));
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }

  onChangeAllToDate() {
    $(document).ready(function () {
      this.alltoDate = $("#alltodate").val();
    });
  }

  confirmAll() {
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
   // let params = new HttpParams();
  //  params = params.set('ids', this.confirmallArr);
    let formData = new FormData();
    formData.append("ids", this.confirmallArr);
    console.log(this.confirmallArr)
    this.http.post(this.funct.ipaddress + 'winner/twodConfirms', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/twod-winners-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.twodwinnerList = this.dto.Response.twodwinnerListDTO
          for (let i = 0; i < this.twodwinnerList.length; i++) {
            if (this.twodwinnerList[i].status == "CONFIRMED") {
              this.twodwinnerList[i].uiDisable = true;
             }
             else if(this.twodwinnerList[i].status == "PENDING"){
              this.twodwinnerList[i].uiDisable = false;
              this.twodwinnerList[i].confirm_by = '';
            }
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
        this.spinner.hide();
      });
  }

  confirmOne(id) {
    console.log("confirm id>>> " + id);
    this.confrimId = id;
    this.confirmallArr = [];
    this.confirmallArr.push(this.confrimId);
    console.log("this.confirmallArr>>> " + JSON.stringify(this.confirmallArr));
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
  //  let params = new HttpParams();
    let formData = new FormData();
    formData.append("ids",this.confirmallArr);
    //params = params.set('ids', this.confirmallArr);
    this.http.post(this.funct.ipaddress + 'winner/twodConfirms', formData, {headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " +JSON.stringify( this.dto.Response));
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/twod-winners-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.twodwinnerList = this.dto.Response.twodwinnerListDTO
          for (let i = 0; i < this.twodwinnerList.length; i++) {
            if (this.twodwinnerList[i].status == "CONFIRMED") {
              this.twodwinnerList[i].uiDisable = true;
             }
             else if(this.twodwinnerList[i].status == "PENDING"){
              this.twodwinnerList[i].uiDisable = false;
              this.twodwinnerList[i].confirm_by = '';
            }
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
        this.spinner.hide();
      });

    // params = params.set('ids', this.confirmallArr);
    // this.http.get(this.funct.ipaddress + 'winner/twod_confirm', { params: params, headers: headers }).subscribe(
    //   result => {
    //     this.dto.Response = {};
    //     this.dto.Response = result;
    //     this.twodwinnerList = this.dto.Response.twodwinnerListDTO
    //     this.spinner.hide();
    //   });
  }

}
