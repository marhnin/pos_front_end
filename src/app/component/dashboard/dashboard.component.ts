import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  adminDTO;
  token;
  isOwnerLoggedIn;
  twod_number : any;
  twod_time : any;
  threed_number : any;
  resultDTO : any;
  feedbackDTO :any;
  feedback_count : any;
  show_time : any;
  userFinancialTransactionDTO : any;
  total_income : any;
  total_outcome : any;
  userDTO : any;
  total_active_users : any;
  idIndex: any;
  accountDetailList : any;
  total_today_reach_amt : any;
  total_my_amount :any;
  total_qm_balance : any;
  total_user_balance : any;
  constructor(private storage: LocalStorageService,private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, 
    private router: Router, private funct: FunctService) {
    this.adminDTO = this.storage.retrieve('adminDTO');
    this.token = this.storage.retrieve('token');
    this.isOwnerLoggedIn = this.storage.retrieve('isOwnerLoggedIn');
    this.idIndex =1;
    this.search();
  }
  ngOnInit(): void {
    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 1);
    }
    else{
      this.storage.clear('loadFlag');
    }
    this.dtOptions = {
      responsive: true,
      order: []
    }
    this.dtOptions.columnDefs = [
    ];
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
    this.token = this.storage.retrieve('token');
    var headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);

    this.http.get(this.funct.ipaddress+'result/GetLastResult').subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twod_number = this.dto.Response["number2d"];
        this.twod_time =   this.dto.Response["datetime2d"];
        this.threed_number = this.dto.Response["number3d"];
        if(this.twod_time.includes('PM'))
        {
         this.show_time = "Evening";
        }
        else{
          this.show_time = "Morning";
        }
        this.spinner.hide();
      }
    );
    this.http.get(this.funct.ipaddress + 'feedback/feedback-count').subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.feedback_count = this.dto.Response;
        this.spinner.hide();
      }
    );
    
    this.http.get(this.funct.ipaddress + 'transaction/getTodayIncomeOutcome', {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.total_income = new Intl.NumberFormat().format(this.dto.Response["todayIncome"]);
        this.total_outcome = new Intl.NumberFormat().format(this.dto.Response["todayOutcome"]);
        this.total_user_balance = new Intl.NumberFormat().format(this.dto.Response["userTotalBalance"]);
        this.spinner.hide();
      } );
    
    this.http.get(this.funct.ipaddress + 'payment/GetAccountDetailByAdminID', {headers: headers}).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.accountDetailList = this.dto.Response;
        var tot = 0, mytot = 0;
        if(this.accountDetailList.length > 0)
        {
          for (let i = 0; i < this.accountDetailList.length; i++) {
            tot = parseInt(this.accountDetailList[i].today_reach_amt) + tot;
            mytot = parseInt(this.accountDetailList[i].my_amount) + mytot;
           }
        }
       this.total_today_reach_amt = new Intl.NumberFormat().format(tot);
       this.total_my_amount= new Intl.NumberFormat().format(mytot);
       this.spinner.hide();
      });

    this.http.get(this.funct.ipaddress + 'user/get-total-active-users').subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.total_active_users = this.dto.Response;
        this.spinner.hide();
      });
      this.refreshQMcredit();
  }

  refreshUserBalancecredit()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    var headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    this.http.get(this.funct.ipaddress + 'transaction/getTodayIncomeOutcome', {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.total_income = new Intl.NumberFormat().format(this.dto.Response["todayIncome"]);
        this.total_outcome = new Intl.NumberFormat().format(this.dto.Response["todayOutcome"]);
        this.total_user_balance = new Intl.NumberFormat().format(this.dto.Response["userTotalBalance"]);
        this.spinner.hide();
      }
    );
  }

  refreshQMcredit()
  {
    this.spinner.show();
    this.http.get(this.funct.ipaddress + 'loginGS/checkAgentCredit').subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.total_qm_balance = new Intl.NumberFormat().format(this.dto.Response);
        this.spinner.hide();
      }
    );
   // this.spinner.hide();
  }

  goModal(){
    var id = 'tblServicePhone' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.accountDetailList = [];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
     this.dto.token = this.storage.retrieve('token');
     headers = headers.set('Authorization', this.dto.token);
     this.http.get(this.funct.ipaddress + 'payment/GetAccountDetailByAdminID', {headers: headers}).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.accountDetailList = this.dto.Response;
        var tot = 0, mytot = 0;
         for (let i = 0; i < this.accountDetailList.length; i++) {
          tot = parseInt(this.accountDetailList[i].today_reach_amt) + tot;
          mytot = parseInt(this.accountDetailList[i].my_amount) + mytot;
       }
       this.total_today_reach_amt = new Intl.NumberFormat().format(tot);
       this.total_my_amount= new Intl.NumberFormat().format(mytot);
       this.dtTrigger.next();
      });
    this.spinner.hide();
    $('#accountDetailData').modal("show");
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
