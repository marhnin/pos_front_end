import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  ,HttpErrorResponse} from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { catchError, retry } from 'rxjs/operators';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { Subject } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-threed-bet-amount-limitation',
  templateUrl: './threed-bet-amount-limitation.component.html',
  styleUrls: ['./threed-bet-amount-limitation.component.css']
})
export class ThreedBetAmountLimitationComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  number: string = '';
  amount: string = '';
  fromDate: string = '';
  toDate: string = '';
  threedbetamountlimitList: any;
  idIndex: any;

  todate: any;
  date : any;
  fromtodaydate : any;
  totodaydate: any;

  threedbetId : any;
  singleDate: string = '';
  time: string = '';
  confirmallArr: any;
  isChecked: any = false;
  editAmt : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private dto: DtoService,
     private http: HttpClient, private funct: FunctService, private router: Router, private toastr: ToastrService,private datepipe: DatePipe) {
      this.idIndex = 1;
      this.search()
   }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
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

  onChangeFromDate() {
    $(document).ready(function () {
      this.fromDate = $("#fromDate").val();
    });
  }

  onChangeToDate() {
    $(document).ready(function () {
      this.toDate = $("#toDate").val();
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
    var target = ev.target;
    this.confirmallArr = [];
    if (target.checked && id == 0) {
      for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
        this.threedbetamountlimitList[i].status1 = "check";
      }
    }
    else if (target.checked && id != 0) {
      for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
        if (this.threedbetamountlimitList[i].id == id) {
          this.threedbetamountlimitList[i].status1 = "check";
        }
      }
    }
    else if (!target.checked && id == 0) {
      for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
        this.threedbetamountlimitList[i].status1 = "uncheck";
      }
    }
    else if (!target.checked && id != 0) {
      for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
        if (this.threedbetamountlimitList[i].id == id) {
          this.threedbetamountlimitList[i].status1 = "uncheck";
        }
      }
    }
    this.checkedData();
  }

  checkedData() {
    for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
      if (this.threedbetamountlimitList[i].status1 == "check") {
        this.confirmallArr.push(this.threedbetamountlimitList[i].id);
      }
    }
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
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
      var id = 'tblThreeD' + this.idIndex;
      var table = $('#' + id).DataTable()
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
  }
  
  search() {
    var id = 'tblThreeD' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    
    this.fromDate = $("#fromDate").val();
    this.toDate = $("#toDate").val();

    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    this.threedbetamountlimitList = [];

    params = params.set('number', this.number).set('amount', this.amount);
    this.http.get(this.funct.ipaddress + 'betamountLimitation/threedbetamountLimitation-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log(this.dto.Response)

        if(this.dto.Response == null)
        {
          this.threedbetamountlimitList.diffAmt = 0;
          this.dtTrigger.next();
          this.spinner.hide();
          return;
        }

        this.threedbetamountlimitList = this.dto.Response;
        for (let i = 0; i < this.threedbetamountlimitList.length; i++) {
          var limitAmt =this.threedbetamountlimitList[i].max_amt_Str.toString().replace(/,/g, "");
          var totalBetAmt =this.threedbetamountlimitList[i].total_bet_amount_Str.toString().replace(/,/g, "");
          this.threedbetamountlimitList[i].diffAmt = parseInt(limitAmt) - parseInt(totalBetAmt);
       }
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  numericOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }

  threeDbetdelete(threedbetId) {
    this.dto.token  = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token );
    let params = new HttpParams();
    this.threedbetId = threedbetId;
    if(this.threedbetId == null || this.threedbetId =='' || this.threedbetId == 'undefined')
    {
      this.toastr.error("Invalid Id", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return; 
    }
    params = params.set('id', this.threedbetId);
    var formData = new FormData();
    formData.append("id",this.threedbetId);
    this.http.post(this.funct.ipaddress + 'betamountLimitation/threeDdelete', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-bet-amount-limitation-list']).then(() => {
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
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',   this.dto.token);
    let params = new HttpParams();

    if(this.confirmallArr == null)
    {
      this.toastr.error("Please check at least one check box", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return; 
    }
    this.threedbetId = this.confirmallArr.toString();
    params = params.set('id', this.threedbetId);
    var formData = new FormData();
    formData.append("id",this.threedbetId);
   
    this.http.post(this.funct.ipaddress + 'betamountLimitation/threeDdelete', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-bet-amount-limitation-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          this.spinner.hide();
        }
      }
    );
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
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
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    this.threedbetId = this.confirmallArr.toString();
    var formData = new FormData();
    formData.append("id",this.threedbetId);
    if(this.editAmt == null || this.editAmt == 0 || this.editAmt == '' || this.editAmt == undefined)
    {
      this.toastr.error("Invalid amount", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    formData.append("amount",this.editAmt);
    this.http.post(this.funct.ipaddress + 'betamountLimitation/threebetLimitupdateAll', formData, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-bet-amount-limitation-list']).then(() => {
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
