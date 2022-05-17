import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { timeStamp } from 'console';
declare var $: any;

@Component({
  selector: 'app-twod-bet-amount-limitation',
  templateUrl: './twod-bet-amount-limitation.component.html',
  styleUrls: ['./twod-bet-amount-limitation.component.css']
})
export class TwodBetAmountLimitationComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  singleDate: string = '';
  status: string = '';
  number: string = '';
  amount: string = '';
  twodbetamountlimitList: any;
  idIndex: any;
  twodbetId: any;
  token: any;
  time : any;
  isChecked: any = false;
  confirmallArr: any;
  editAmt : any;
  fordate :any;
  todaydate :any;
  changedate: any;
  currentTime : any;
  currentTime1 : any;

  constructor(private storage: LocalStorageService,private datepipe: DatePipe, private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient,
    private toastr: ToastrService, private funct: FunctService, private router: Router,) {
    this.idIndex = 1;
    this.status = 'ACTIVE';
    //this.fordate = new Date();
    //this.todaydate = this.datepipe.transform(this.fordate, 'MMM dd, yyyy');
    this.time = "";
  }

  ngOnInit(): void {
    this.search()
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

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }
  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 500)
    {
      this.spinner.hide();
      this.toastr.error('Please check connection', 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblTwoD' + this.idIndex;
      var table = $('#' + id).DataTable()
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
  }

  OkLogout()
    {
      window.location.href ="./ad-login";
    } 
    
  checkuncheckall() {
    if (this.isChecked == true) {
      this.isChecked = false;
    }
    else {
      this.isChecked = true;
    }
  }

  search() {
    var id = 'tblTwoD' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    this.singleDate = $("#singleDate").val();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    console.log("Amount is " +this.amount)
    console.log("bet_time is " +this.time)
    if(this.singleDate == undefined || this.singleDate == null || this.singleDate =='')
    {
     this.changedate = this.todaydate;
    }
    else
    {
      this.changedate = this.singleDate;
    }
    this.twodbetamountlimitList = [];
    params = params.set('for_date_time', this.changedate).set('number', this.number).set('amount', this.amount).set('bet_time', this.time).set('type', "2D");
    this.http.get(this.funct.ipaddress + 'betamountLimitation/twodbetamountLimitation-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if(this.dto.Response == null)
        {
          this.twodbetamountlimitList.diffAmt = 0;
          this.dtTrigger.next();
          this.spinner.hide();
          return;
        }
        this.twodbetamountlimitList = this.dto.Response;
        for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
          var limitAmt =this.twodbetamountlimitList[i].max_amt_Str.toString().replace(/,/g, "");
          var totalBetAmt =this.twodbetamountlimitList[i].total_bet_amount_Str.toString().replace(/,/g, "");
          this.twodbetamountlimitList[i].diffAmt = parseInt(limitAmt) - parseInt(totalBetAmt);
      }
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
   
  }

  changeSelection(ev, id) {
    console.log("id..... " + id);
    var target = ev.target;
    this.confirmallArr = [];

    if (target.checked && id == 0) {
      for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
        this.twodbetamountlimitList[i].status = "check";
      }
    }
    else if (target.checked && id != 0) {
      for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
        if (this.twodbetamountlimitList[i].id == id) {
          this.twodbetamountlimitList[i].status = "check";
        }
      }
    }
    else if (!target.checked && id == 0) {
      for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
        this.twodbetamountlimitList[i].status = "uncheck";
      }
    }
    else if (!target.checked && id != 0) {
      for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
        if (this.twodbetamountlimitList[i].id == id) {
          this.twodbetamountlimitList[i].status = "uncheck";
        }
      }
    }
    console.log("this.twodwinnerList >>" + JSON.stringify(this.twodbetamountlimitList));
    this.checkedData();
  }

  checkedData() {
    for (let i = 0; i < this.twodbetamountlimitList.length; i++) {
      if (this.twodbetamountlimitList[i].status == "check") {
        this.confirmallArr.push(this.twodbetamountlimitList[i].id);
      }
    }
    console.log("this.confirmallArr >>" + JSON.stringify(this.confirmallArr));
  }

  twoDbetdelete(twodbetId) {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.twodbetId = twodbetId;
    params = params.set('id', this.twodbetId);
    var formData = new FormData();
    formData.append("id",this.twodbetId);
   console.log("Deleted id is : "+this.twodbetId);
    this.http.post(this.funct.ipaddress + 'betamountLimitation/delete', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/twod-bet-amount-limitation-list']).then(() => {
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

  delAll()
  {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    if(this.confirmallArr == null)
    {
      this.toastr.error("Please select at least one record", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.twodbetId = this.confirmallArr.toString();
    params = params.set('id', this.twodbetId);
    var formData = new FormData();
    formData.append("id",this.twodbetId);
    this.http.post(this.funct.ipaddress + 'betamountLimitation/delete', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/twod-bet-amount-limitation-list']).then(() => {
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
 
  showeditAllModal()
  {
    if(this.confirmallArr == null)
    {
      this.toastr.error("Please select at least one record", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    $('#showeditModal').modal("show");
  }

  editAll()
  {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
   
    this.twodbetId = this.confirmallArr.toString();
    params = params.set('id', this.twodbetId);
    var formData = new FormData();
    formData.append("id",this.twodbetId);
    if(this.editAmt == null || this.editAmt == 0 || this.editAmt == '' || this.editAmt == undefined)
    {
      this.toastr.error("Invalid amount", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    formData.append("amount",this.editAmt);
    this.http.post(this.funct.ipaddress + 'betamountLimitation/twodbetLimitupdateAll', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/twod-bet-amount-limitation-list']).then(() => {
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
}
