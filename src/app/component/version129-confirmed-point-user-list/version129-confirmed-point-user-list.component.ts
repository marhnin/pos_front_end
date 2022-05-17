import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DtoService } from 'src/app/service/dto.service';
import { FunctService } from 'src/app/service/funct.service';

@Component({
  selector: 'app-version129-confirmed-point-user-list',
  templateUrl: './version129-confirmed-point-user-list.component.html',
  styleUrls: ['./version129-confirmed-point-user-list.component.css']
})
export class Version129ConfirmedPointUserListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
  appVersion : any;
  confirmallArr: any;
  isChecked: any = false;

  /*newtotal items*/
  newTotalItems : any;
  option :any;
  constructor(private storage: LocalStorageService,private datepipe: DatePipe, private toastr: ToastrService,private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,) {
      this.idIndex = 1;
    this.approvedate = new Date();
    this.approvetodayDate = this.datepipe.transform(this.approvedate, 'MMM dd, yyyy');

    this.approvetodate = new Date();
    this.approvetodayToDate = this.datepipe.transform(this.approvetodate, 'MMM dd, yyyy');
    this.getAllAppVersion();
    //this.search();
    this.getAllData();
     }

  ngOnInit(): void {
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
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    if(error.status == 423)
    {
      
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
 
    getAllData() {
      this.userList = [];
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
      //this.allchangedate ,  this.allchangetodate
      params = params.set('app_version',this.appVersion).set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status)
     // .set('register_date',null).set('register_todate',null)
      this.http.get(this.funct.ipaddress + 'user/GetConfirmPointPromotionUsersV129', { params: params, headers: headers } )
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe((data: any) => {
        this.dto.Response = {};
        this.dto.Response = data;
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
}
