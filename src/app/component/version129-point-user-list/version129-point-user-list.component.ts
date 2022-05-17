import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DtoService } from 'src/app/service/dto.service';
import { FunctService } from 'src/app/service/funct.service';
declare var $: any;

@Component({
  selector: 'app-version129-point-user-list',
  templateUrl: './version129-point-user-list.component.html',
  styleUrls: ['./version129-point-user-list.component.css']
})
export class Version129PointUserListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  dtElement_1: DataTableDirective;
  dtOptions_1: DataTables.Settings = {};
  dtTrigger_1: Subject<any> = new Subject();

  dtElement_2: DataTableDirective;
  dtOptions_2: DataTables.Settings = {};
  dtTrigger_2: Subject<any> = new Subject();

  phoneNo: string= '';
  name: string= '';
  referralCode: string= '';
  status: string= '';
  userList: any;
  idIndex: any;
  approvedate : any;
  approvetodayDate : any;
  approveDate : any;
  allchangedate : any;

  approvetodate : any;
  allchangetodate : any;
  approvetodayToDate : any;
  approvetoDate : any;
  /*XXXXXXXXXXXX*/
  config: any;
  collection = [];
  page = 1;
  passenger: any; 
  itemsPerPage =  10;
  totalItems : any; 
  itemsPerPageFront =  10;
  appVersionList :[];
  completeList =  [];
  incompleteList =[];
  allList = [];
  appVersion : any;
  confirmallArr: any;
  isChecked: any = false;

  /*newtotal items*/
  newTotalItems : any;
  option :any;
  currentOption : any;

  constructor(private storage: LocalStorageService,private datepipe: DatePipe, private toastr: ToastrService,private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,) {
    this.idIndex = 1;
    this.option = 'All';
    this.approvedate = new Date();
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');
    this.approvetodate = new Date();
    this.approvetodayToDate = this.datepipe.transform(this.approvetodate, 'MMM dd, yyyy');
    this.getAllAppVersion();
    this.getAllData();
   }

  ngOnInit(): void {

    
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) =>
    {
      if (evt instanceof NavigationEnd)
      {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    this.dtOptions = {
      order:[],
      responsive:true,
      paging: true,
      info : true,
      dom: "Bfrltip"
   }
    this.dtOptions.columnDefs = [
      { targets: [0], orderable: true }
    ];

    this.dtOptions_1 = {
      order:[],
      responsive:true,
      paging: true,
      info : true,
      dom: "Bfrltip"
   }

    this.dtOptions_1.columnDefs = [
      { targets: [0], orderable: true }
    ];

    this.dtOptions_2 = {
      order:[],
      responsive:true,
      paging: true,
      info : true,
      dom: "Bfrltip"
   }

    this.dtOptions_2.columnDefs = [
      { targets: [0], orderable: true }
    ];

    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 5);
    }
    else
    {
      this.storage.clear('loadFlag');
    }
  }

  ngAfterViewInit(){
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblUser' + this.idIndex;
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
 
    getAllData() 
    {
      this.userList = [];
      this.incompleteList = [];
      this.completeList = [];
      this.allList = [];
      var id = 'tblUser' + this.idIndex;
      var table = $('#' + id).DataTable();
      table.destroy();
      this.idIndex = this.idIndex +1;
      this.spinner.show();
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams(); 
      this.approveDate = $("#approveDate").val();
      this.approvetoDate = $("#approvetoDate").val();
      if (this.approveDate == '' || this.approveDate == undefined) {
        this.allchangedate = this.approvetodayDate;
      }
      else {
        this.allchangedate = this.approveDate;
      }
  
      if (this.approvetoDate == '' || this.approvetoDate == undefined) {
        this.allchangetodate = this.approvetodayToDate;
      }
      else {
        this.allchangetodate = this.approvetoDate;
      }
      params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
      .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate)
      this.http.get(this.funct.ipaddress + 'user/GetPointPromotionUsers_1', { params: params, headers: headers } )
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe((data: any) => 
      {
        this.dto.Response = {};
        this.dto.Response = data;
        this.userList = this.dto.Response;
        this.totalItems = data.totalRows;
        this.currentOption = this.option;
        if(this.userList.length > 0 && this.currentOption == 'All')
        {
          for(var i = 0; i< this.userList.length ;i++)
          {
            if(this.userList[i].v129_first_topup_date_Str != null){
             this.allList.push(this.userList[i]);
            }
          }
        }
        if(this.userList.length > 0 && this.currentOption == 'complete')
        {
          for(var i = 0; i< this.userList.length ;i++)
          {
             if( this.userList[i].v129_first_topup_date_Str != null && (this.userList[i].totalDays <= 7 || this.userList[i].totalDays >= 7 ) && (this.userList[i].totalBet >=  this.userList[i].needtotalBet ))
             {
                this.allList.push(this.userList[i]);
             }
          }
        }
        if(this.userList.length > 0 && this.currentOption == 'incomplete')
        {
          for(var i = 0; i< this.userList.length ;i++)
          {
             if(( this.userList[i].v129_first_topup_date_Str != null && this.userList[i].totalDays < 7 && this.userList[i].totalBet <  this.userList[i].needtotalBet))
             {
              this.allList.push(this.userList[i]);
             }
          }
        }
        this.dtTrigger.next();
        this.spinner.hide();
      })
    }

    checkuncheckall() {
      if (this.isChecked == true) {
        this.isChecked = false;
      }
      else {
        this.isChecked = true;
      }
    }
  
    changeSelection(ev, id)
     {
      var target = ev.target;
      this.confirmallArr = [];
      if (target.checked && id == 0)
      {
        for (let i = 0; i < this.userList.length; i++)
        {
          this.userList[i].status = "check";
        }
      }
      else if (target.checked && id != 0) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].id == id) {
            this.userList[i].status = "check";
          }
        }
      }
      else if (!target.checked && id == 0) {
        for (let i = 0; i < this.userList.length; i++) {
          this.userList[i].status = "uncheck";
        }
      }
      else if (!target.checked && id != 0) {
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userList[i].id == id) {
            this.userList[i].status = "uncheck";
          }
        }
      }
      this.checkedData();
    }

    checkedData() {
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].status == "check") {
          this.confirmallArr.push(this.userList[i].id);
        }
      }
      console.log("this.confirmallArr >>" + JSON.stringify(this.confirmallArr));
    }

    confirmAll() {
      this.spinner.show();
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.dto.token);
      let formData = new FormData();
      formData.append("ids", this.confirmallArr);
      if(this.confirmallArr == undefined || this.confirmallArr.length == 0)
      {
        this.toastr.error("Must be choose at least one record", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        this.spinner.hide();
        return;
      }
      console.log("Confirm ids "+this.confirmallArr)
      this.http.post(this.funct.ipaddress + 'user/AddPointToMainWallet', formData, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/v129promotionUsers']).then(() => {
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
          this.spinner.hide();
        });
    }

    gty(page: any){
      this.userList = [];
      var id = 'tblUser' + this.idIndex;
      var table = $('#' + id).DataTable();

      table.destroy();
      this.idIndex = this.idIndex +1;
      this.spinner.show();
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams();
      this.approveDate = $("#approveDate").val();
    this.approvetoDate = $("#approvetoDate").val();
    if (this.approveDate == '' || this.approveDate == undefined) {
      this.allchangedate = this.approvetodayDate;
    }
    else {
      this.allchangedate = this.approveDate;
    }

    if (this.approvetoDate == '' || this.approvetoDate == undefined) {
      this.allchangetodate = this.approvetodayToDate;
    }
    else {
      this.allchangetodate = this.approvetoDate;
    }
      params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
      .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate)
      this.http.get(this.funct.ipaddress + 'user/GetPointPromotionUsers', { params: params, headers: headers } )
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe((data: any) => {
        this.dto.Response = {};
        this.dto.Response = data.results;
        this.userList = this.dto.Response;
        this.totalItems = data.totalRows;
        this.dtTrigger.next();
        this.spinner.hide();
      })
    }

    getAllAppVersion()
    {
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.dto.token);
      let params = new HttpParams();
      this.http.get(this.funct.ipaddress + 'user/getAllAppVersion', {headers: headers }).subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.appVersionList = this.dto.Response;
        }
      );
    }

  search(){
    this.spinner.show();
    this.userList = [];
    var id = 'tblUser' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    this.approveDate = $("#approveDate").val();
    this.approvetoDate = $("#approvetoDate").val();
    if (this.approveDate == '' || this.approveDate == undefined) {
      this.allchangedate = this.approvetodayDate;
    }
    else {
      this.allchangedate = this.approveDate;
    }

    if (this.approvetoDate == '' || this.approvetoDate == undefined) {
      this.allchangetodate = this.approvetodayToDate;
    }
    else {
      this.allchangetodate = this.approvetoDate;
    }
    
    params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
    .set('register_date',this.allchangedate).set('register_todate',this.allchangetodate);//.set("pageNumber","2").set("rowsOfPage","10");
	  this.http.get(this.funct.ipaddress + 'user/userByparams', { params: params, headers: headers } )
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(  
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userList = this.dto.Response;
        this.page =  0
        this.dtTrigger.next();
        this.spinner.hide();
     
      }
    );
  }

  onChangeApprove() {
    $(document).ready(function () {
      this.approveDate = $("#approveDate").val();
    });
  }

  onChangeApproveTo()
  {
    $(document).ready(function () {
      this.approvetoDate = $("#approvetoDate").val();
    });
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

 /*XXXXXXXXXXXXXXXXXXXXXXXX*/
  pageChange(newPage: number) {
    this.router.navigate(['/user-list'], { queryParams: { page: newPage } });
  }

  /*point promotion*/
  AddPointToMain(userId)
  {
   alert(userId)
  }
}
