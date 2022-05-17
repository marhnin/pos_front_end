import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-threed-winners',
  templateUrl: './threed-winners.component.html',
  styleUrls: ['./threed-winners.component.css']
})
export class ThreedWinnersComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  idIndex: any;
  token: any;
  threedwinnerId: any;
  confrimId: any;
  phoneNo: string = '';
  name: string = '';
  singleDate: string = '';
  status: string = '';
  threedwinnerList: any;
  confirmAllCheck: any = false;
  confirmallArr: any = [{id:''}];
  isChecked: any = false;
  winnerDate: any;
  winnertodayDate: any;
  winnerchangeDate: any;
  todate: any; //add the following
  toDate : any;
  todatetodaydate : any;
  todatechangedate : any;

  alltodaytodate : any;
  alltodatechangeDate : any; //add this
  alltodayDate: any;
  allchangeDate: any;
  alltoDate :any;
  alltodate : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
     private router: Router, private funct: FunctService, private datepipe: DatePipe, private toastr: ToastrService) {

    this.idIndex = 1;
    this.winnerDate = new Date();
    this.winnertodayDate = this.datepipe.transform(this.winnerDate, 'MMM dd, yyyy');
    this.alltodate = new Date();  //add this
    this.alltodaytodate = this.datepipe.transform(this.alltodate, 'MMM dd, yyyy');
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
      { targets: [6], orderable: true }
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
      this.router.navigate(['/threed-winners-list']).then(() => {
        this.toastr.error('Already Confirmed', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      })
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblthreedWinners' + this.idIndex;
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
    this.threedwinnerList = [];
    var id = 'tblthreedWinners' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    this.toDate = $("#toDate").val();
    this.alltoDate = $("#alltodate").val();

    if (this.singleDate == '' || this.singleDate == undefined) {
      console.log("date if case");
      this.winnerchangeDate = this.winnertodayDate;
    }
    else {
      console.log("date else case");
      this.winnerchangeDate = this.singleDate;
    }

    if (this.alltoDate == '' || this.alltoDate == undefined) {
      console.log("date if case for to date");
      this.alltodatechangeDate = this.alltodaytodate;
    }
    else {
      console.log("date else case");
      this.alltodatechangeDate = this.alltoDate;
    }
    console.log("All to date change date is : "+this.alltodatechangeDate)

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    params = params.set('phoneNo',this.phoneNo).set('name',this.name).set('fromDate',this.winnerchangeDate).set('toDate',this.alltodatechangeDate).set('status', this.status);
    this.http.get(this.funct.ipaddress + 'winner/threed-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        console.log("result>> " + JSON.stringify(result));
        this.dto.Response = result;
        this.threedwinnerList = this.dto.Response;//.data.threedWinnerDTOList;
        console.log("this.threedwinnerList>> " + JSON.stringify(this.threedwinnerList));
        if(this.threedwinnerList != undefined){
          for (let i = 0; i < this.threedwinnerList.length; i++) {
            if (this.threedwinnerList[i].status == "CONFIRMED") {
              this.threedwinnerList[i].uiDisable = true;
             }
             else if(this.threedwinnerList[i].status == "PENDING"){
              this.threedwinnerList[i].uiDisable = false;
            }
            if(this.threedwinnerList[i].status == "PENDING")
            {
              this.threedwinnerList[i].created_by = "";
            }
          }
        }
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
      for (let i = 0; i < this.threedwinnerList.length; i++) {
        this.threedwinnerList[i].status = "check";
      }
    }
    else if (target.checked && id != 0) {
      for (let i = 0; i < this.threedwinnerList.length; i++) {
        if (this.threedwinnerList[i].id == id) {
          this.threedwinnerList[i].status = "check";
        }
      }
    }
    else if (!target.checked && id == 0) {
      for (let i = 0; i < this.threedwinnerList.length; i++) {
        this.threedwinnerList[i].status = "uncheck";
      }
    }
    else if (!target.checked && id != 0) {
      for (let i = 0; i < this.threedwinnerList.length; i++) {
        if (this.threedwinnerList[i].id == id) {
          this.threedwinnerList[i].status = "uncheck";
        }
      }
    }
    console.log(" this.threedwinnerList >>" + JSON.stringify(this.threedwinnerList));

    this.checkedData();
  }

  checkedData() {
    for (let i = 0; i < this.threedwinnerList.length; i++) {
      if (this.threedwinnerList[i].status == "check") {
        //this.confirmallArr.id.push(this.threedwinnerList[i].id);
        this.confirmallArr.push(this.threedwinnerList[i].id);
      }
    }
    console.log("this.confirmallArr >>" + JSON.stringify(this.confirmallArr));
  }

  confirmAll() {
    console.log("click confirmall");
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
   // let params = new HttpParams();
   // params = params.set('ids', this.confirmallArr);
    let formData = new FormData();
    formData.append("ids",this.confirmallArr);
    this.http.post(this.funct.ipaddress + 'winner/threedConfirms', formData, {headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-winners-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.threedwinnerList = this.dto.Response.threedwinnerListDTO
          for (let i = 0; i < this.threedwinnerList.length; i++) {
            if (this.threedwinnerList[i].status == "CONFIRMED") {
              this.threedwinnerList[i].uiDisable = true;
             }
             else if(this.threedwinnerList[i].statsu == "PENDING"){
              this.threedwinnerList[i].uiDisable = false;
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
    //params = params.set('id', this.confirmallArr.id);
    // this.http.get(this.funct.ipaddress + 'twod-winners/twod-winners-confrim', { params: params, headers: headers }).subscribe(
    //   result => {
    //     this.dto.Response = {};
    //     this.dto.Response = result;
    //     this.threedwinnerList = this.dto.Response.threedwinnerListDTO
    //     this.spinner.hide();
    //   });
  }

  confirmOne(id) {
    console.log("confirm id>>> " + id);
    this.confrimId = id;
    this.confirmallArr = [];
    this.confirmallArr.push(this.confrimId);
    console.log("this.confirmallArr>>" + JSON.stringify(this.confirmallArr));
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    //let params = new HttpParams();
    //params = params.set('ids', this.confirmallArr);
    let formData = new FormData();
    formData.append("ids",this.confirmallArr);
    this.http.post(this.funct.ipaddress + 'winner/threedConfirms', formData, {headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-winners-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.threedwinnerList = this.dto.Response.threedwinnerListDTO
          for (let i = 0; i < this.threedwinnerList.length; i++) {
            if (this.threedwinnerList[i].status == "CONFIRMED") {
              this.threedwinnerList[i].uiDisable = true;
             }
             else if(this.threedwinnerList[i].checkStatus == "PENDING"){
              this.threedwinnerList[i].uiDisable = false;
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

  
}
