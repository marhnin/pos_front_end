import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctService } from '../../service/funct.service';
import { DtoService } from '../../service/dto.service';
import { DomSanitizer } from '@angular/platform-browser'; //for unsafe image

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
   selector: 'app-promotion-confirmed-users-detail',
   templateUrl: './promotion-confirmed-users-detail.component.html',
  styleUrls: ['./promotion-confirmed-users-detail.component.css']
})

export class PromotionConfirmedUsersDetailComponent implements OnInit,PipeTransform {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject();
  dtOptions2: DataTables.Settings = {};
  dtTrigger2: Subject<any> = new Subject();
  dtOptions3: DataTables.Settings = {};
  dtTrigger3: Subject<any> = new Subject();
  dtOptions4: DataTables.Settings = {};
  dtTrigger4: Subject<any> = new Subject();
  dtOptions5: DataTables.Settings = {};
  dtTrigger5: Subject<any> = new Subject();
  dtOptions6: DataTables.Settings = {};
  dtTrigger6: Subject<any> = new Subject();
  dtOptions7: DataTables.Settings = {};
  dtTrigger7: Subject<any> = new Subject();
  dtOptions8: DataTables.Settings = {};
  dtTrigger8: Subject<any> = new Subject();
  dtOptionswinlose: DataTables.Settings = {};
  dtTriggergwinlose: Subject<any> = new Subject();
  dtOptions10: DataTables.Settings = {};
  dtTrigger10: Subject<any> = new Subject();
  dtOptions11: DataTables.Settings = {};
  dtTrigger11: Subject<any> = new Subject();
  dtOptions12: DataTables.Settings = {};
  dtTrigger12: Subject<any> = new Subject();
  dtOptionsKM: DataTables.Settings = {};
  dtTriggerKM: Subject<any> = new Subject();
  dtTriggerTrand : Subject<any> = new Subject();
  dtOptionsTrand: DataTables.Settings = {};
  dtTriggergamewallet : Subject<any> = new Subject(); 
  dtOptionsgamewallet : DataTables.Settings = {};
  userDTO: any;
  token: any;
  userId: any;
  agentList: [];
  agentId: null;
  adminList: [];
  adminId: null;
  amount : any;
  wallet : any;
  twodwinamount : any;
  twodwinwallet : any;
  twodhitamount : any;
  twodhitwallet : any;
  threedhitamount : any;
  threedhitwallet : any;
  tempUserBankInfoDTOList : any;
  bankimgURL : any;
  editUserDTO : any;

  topupamount : any;
  topuptran : any;
  topupwallet : any;
  withdrawalAcc :any;
  withdrawalamount : any;
  withdrawalwallet : any;
  threeDBetDetailDTOList : any;


  walletHistoryDTOLit :any;
  tempWinnerDTOList : any;
  tempWinnerDTOList1 : any;
  tempFinancialTransactionDTOList : any;
  tempFinancialTransactionDTOList1 : any;
  tempQMfinancialTransactionDTOList : any;
  tempBetHistoryDTOList : any;
  tempBetHistoryDTOList1 : any;
  twoDBetDetailDTOList : any;

  idIndex: any;
  bankidIndex : any;
  idtwodindex : any;
  idtwodwinIndex : any;
  idtopupIndex : any;
  idwithdrawalIndex : any;
  idthreedbetIndex : any;
  idthreedwinIndex :any;
  idgameIndex : any;
  idgamewinIndex : any;
  idbonusIndex : any
  idtwoddetailIndex: any;
  idthreeddetailIndex : any;

  imgURL : any;
  message :any;
  imagePath: any;
  isProfile : boolean = false;

  singleDate: string = '';
  todate : any; //add this

  alltoDate: string = ''; //add this
  alltodate : any;
  alltodaytodate : any;
  alltodatechangeDate : any; //add this
  alldate: any;
  allchangeDate: any;
  alltodayDate: any;

  twodwinDate: string = '';
  twodwindate: any;
  twodwintoDate : any;
  twodwintodate : any;
  twodwintodaytodate : any;
  twodwintodatechangeDate : any;
  twodwintodayDate: any;
  twodwinchangeDate: any;

  twodbetDate: string = '';
  twodbetdate: any;
  twodbettodate :any;
  twodbettoDate : any;
  twodbettodaytodate : any;
  twodbettodatechangeDate : any;
  twodbettodayDate: any;
  twodbetchangeDate: any;
  towdbetDate : any;

  topuptodate : any;
  topuptoDate : any;
  topupdate: any;
  topupDate: any;
  topuptodayDate: any;
  topupchangeDate: any;
  topuptodaytodate : any;
  topuptodatechangeDate : any;

  withtodate : any;
  withtoDate : any;
  withtodatechangeDate : any;
  withtodaytodate : any;
  withdate: any;
  withtodayDate: any;
  withchangeDate: any;
  withDate : any;

  threedbetdate : any;
  threedbetDate : any;
  threedbetchangeDate : any;
  threedbettodate : any;
  threedbettoDate : any;
  threedbettodatechangeDate : any;
  threedbettodaytodate : any;
  threedbettodaydate : any;

  threedwindate : any;
  threedwinDate : any;
  threedwinchangeDate : any;
  threedwintodate : any;
  threedwintoDate : any;
  threedwintodatechangeDate : any;
  threedwintodaytodate : any;
  threedwintodayDate : any;

  gamedate : any;
  gameDate : any;
  gamechangeDate : any;
  gametodate : any;
  gametoDate : any;
  gametodatechangeDate : any;
  gametodaytodate : any;
  gametodaydate : any;

  gamewindate : any;
  gamewinDate : any;
  gamewinchangeDate : any;
  gamewintodate : any;
  gamewintoDate : any;
  gamwinetodatechangeDate : any;
  gamewintodaytodate : any;
  gamewintodaydate : any;
  bonusdate : any;
  bonusDate : any;
  bonuschangeDate : any;
  bonustodate : any;
  bonustoDate : any;
  bonustodatechangeDate : any;
  bonustodaytodate : any;
  bonustodaydate : any;
  twoDBetDetailDTOList_temp : any;
  threeDBetDetailDTOList_temp : any;
  queenmakerdate : any;
  qmdate : any;
  queenmakertodate : any;
  qmtodate : any;
  qmtodaydate: any;
  qmtodaytodate: any;
  queenmakerfchangedate : any;
  queenmakertchangedate  : any;
  tblqmtranid : any;
  gameproviderList : any;
  providerId : any;
  transactionDetailList : any;
  idtbltrnadetail : any;
  winnerDetail  : any;
  gameTranDetailList :  any;
  idgamewallet : any;
  gameWalletModel_temp : any;
  userGameLogList : any;
  tblgamelogtran : any;
  displayUserId : any;
  providerId1 : any;
  displayUserIdTran : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, 
    private router: Router, private route: ActivatedRoute,private datepipe: DatePipe, private funct: FunctService,private sanitizer:DomSanitizer) {
    this.idIndex = 1;
    this.bankidIndex = 1;
    this.idtwodindex = 1;
    this.idtopupIndex = 1;
    this.idwithdrawalIndex = 1;
    this.idthreedwinIndex = 1;
    this.idthreedbetIndex = 1;
    this.idgameIndex = 1;
    this.idgamewinIndex = 1;
    this.idbonusIndex = 1;
    this.tblqmtranid = 1;
    this.idtbltrnadetail = 1;
    this.idgamewallet = 1;
    this.tblgamelogtran = 1;
    this.getAllProvider();

    this.twodbetdate = new Date();
    this.twodbettodayDate = this.datepipe.transform(this.twodbetdate, 'MMM dd, yyyy');

    this.twodwindate = new Date();
    this.twodwintodayDate = this.datepipe.transform(this.twodwindate, 'MMM dd, yyyy');

    this.topupdate = new Date();
    this.topuptodayDate = this.datepipe.transform(this.topupdate, 'MMM dd, yyyy');

    this.withdate = new Date();
    this.withtodayDate = this.datepipe.transform(this.withdate, 'MMM dd, yyyy');

   
    this.alldate = new Date();
    this.alltodayDate = this.datepipe.transform(this.alldate, 'MMM dd, yyyy');


    this.alltodate = new Date(); //add this
    this.alltodaytodate = this.datepipe.transform(this.alltodate, 'MMM dd, yyyy');

    this.twodbettodate = new Date();  //add this
    this.twodbettodaytodate = this.datepipe.transform(this.twodbetdate, 'MMM dd, yyyy');

    this.twodwintodate = new Date();  //add this
    this.twodwintodaytodate = this.datepipe.transform(this.twodwintodate, 'MMM dd, yyyy');

    this.topuptodate = new Date();  //add this
    this.topuptodaytodate = this.datepipe.transform(this.topuptodate, 'MMM dd, yyyy');

    this.withtodate = new Date();  //add this
    this.withtodaytodate = this.datepipe.transform(this.withtodate, 'MMM dd, yyyy');

    this.threedbetdate = new Date();  //add this
    this.threedbettodaydate = this.datepipe.transform(this.threedbetdate, 'MMM dd, yyyy');

    this.threedbettodate = new Date();  //add this
    this.threedbettodaytodate = this.datepipe.transform(this.threedbettodate, 'MMM dd, yyyy');

    this.threedwindate = new Date();  //add this
    this.threedwintodayDate = this.datepipe.transform(this.threedwindate, 'MMM dd, yyyy');

    this.threedwintodate = new Date();  //add this
    this.threedwintodaytodate = this.datepipe.transform(this.threedwintodate, 'MMM dd, yyyy');

    this.gamewindate = new Date();  //add this
    this.gamewintodaydate = this.datepipe.transform(this.gamewindate, 'MMM dd, yyyy');

    this.gamewintodate = new Date();  //add this
    this.gamewintodaytodate = this.datepipe.transform(this.gamewintodate, 'MMM dd, yyyy');

    this.queenmakerdate = new Date();
    this.qmtodaydate = this.datepipe.transform(this.queenmakerdate, 'MMM dd, yyyy');
    this.queenmakertodate = new Date();
    this.qmtodaytodate = this.datepipe.transform(this.queenmakertodate, 'MMM dd, yyyy');
   }

  ngOnInit(): void {

    this.editUserDTO = {
      id: 0,
      twodbetlimit :'',
      threedbetlimit : '',
      status: ''
    };

    this.transactionDetailList =
    {
      amount_Str :'',
      created_date_Str :'',
      updated_date_Str:'',
      status :'',
      type :'',
      accountNumber:'',
      bankName :'',
      approvedBy :''
    };

    this.winnerDetail=
    {
       betAmount_Str :'',
       winAmount_Str :'',
       odd :'',
       status :'',
       created_date_Str:'',
       number :''
    };

    this.gameTranDetailList=
    {
       amount :'',
       referenceid :'',
       created_date :'',
       providerName:''
    }
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
      order:[],
    };
    this.dtOptions.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions1 = {
      responsive: true,
      order:[],
    };
    this.dtOptions1.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions2 = {
      responsive: true,
      order:[],
    };
    this.dtOptions2.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions3 = {
      responsive: true,
      order:[],
    };
    this.dtOptions3.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions4 = {
      responsive: true,
      order:[],
    };
    this.dtOptions4.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions5 = {
      responsive: true,
      order:[],
    };
    this.dtOptions5.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions6 = {
      responsive: true,
      order:[],
    };
    this.dtOptions6.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions7 = {
      responsive: true,
      order:[],
    };
    this.dtOptions7.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    this.dtOptions8 = {
      responsive: true,
      order:[],
    };
    this.dtOptions8.columnDefs = [
      //{ targets: [0], orderable: false }
    ];

    
    this.dtOptionswinlose = {
      responsive: true,
      order:[],
    };
    this.dtOptionswinlose.columnDefs = [
    
    ];

    
    this.dtOptions10 = {
      responsive: true,
      order:[],
    };
    this.dtOptions10.columnDefs = [
     
    ];

    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 5);
    }
    else{
      this.storage.clear('loadFlag');
    }
    this.userId = this.route.snapshot.paramMap.get("id");
    this.userDTO = {
      id: 0,
      phoneNo: '',
      name: '',
      adminId: 0,
      agentId: 0,
      balance: 0,
      referralCode: '',
      image: '',
      total_topup: '',
      total_withdraw: '',
      registerDate: '',
      registerBy: '',
      updatedDate: '',
      updatedBy: '',
      status: 'ACTIVE'
    };
    this.getUserById();
    this.getActiveAgents();
    this.getUserbankInfo();
    this.getTwodbetHistoryByParams();
  } //end init function

  ngAfterViewInit(){
  }

  onChangeSingle() {
      this.singleDate = $("#singleDate").val();
  }
   
  onChangeAllToDate() {
      this.alltoDate = $("#alltodate").val();
  }

  getActiveAgents() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    this.http.get(this.funct.ipaddress + 'agent/GetActiveAgents', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentList = this.dto.Response;//.data.agentDTOList;
      }
    );
  }
  getActiveAdmins() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    this.http.get(this.funct.ipaddress + 'admin/active-admins', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adminList = this.dto.Response.data.adminDTOList;
      }
    );
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
      var id1 = 'tblBank' + this.bankidIndex;
      var table1 = $('#' + id1).DataTable();
      var id = 'tblUser' + this.idIndex;
      var tranalltable = $('#' + id).DataTable();
     
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
    if(error.status == 400)
    {
      this.spinner.hide();
      this.toastr.error("Bad Request.", 'Invalid!', {
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

    getAllProvider()
    {
     this.dto.token = this.storage.retrieve('token');
     let headers = new HttpHeaders();
     headers = headers.set('Authorization',  this.dto.token);
     this.http.get(this.funct.ipaddress + 'gameProvider/getGameProviderList', {headers: headers })
     .pipe(
       catchError(this.handleError.bind(this))
      )
     .subscribe(
       result => {
         this.dto.Response = {};
         this.dto.Response = result;
         this.gameproviderList = this.dto.Response;
         this.gameproviderList.push("None");
       });
    }
   
    flagProvider()
    {
        this.providerId = $("#providerId").val();
    }

    flagProvider1()
    {
        this.providerId1 = $("#providerId1").val();
    }

  getUserbankInfo()
  {
    this.spinner.show();
    var id1 = 'tblBank' + this.bankidIndex;
    var table1 = $('#' + id1).DataTable();
    table1.destroy();
    this.tempUserBankInfoDTOList = [];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('userId', this.userId);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuserbankinfo-details-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        var img;
        this.tempUserBankInfoDTOList = this.dto.Response;
        for(var i = 0 ; i < this.tempUserBankInfoDTOList.length ; i++)
        {
         img = this.tempUserBankInfoDTOList[i].imageUrl;
         if(img != null)
         {
          let objectURL =  img;
          this.bankimgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.tempUserBankInfoDTOList[i].banklogo = this.bankimgURL;
         }
         console.log("Bank logo"+img);
        }
        this.dtTrigger1.next();
        this.spinner.hide();
       // this.getTransactionAllByParams(); 
      }
    );
  }
  getTransactionAllByParams()
  {
    this.walletHistoryDTOLit = [];
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    var id = 'tblUser' + this.idIndex;
    var tranalltable = $('#' + id).DataTable();
    tranalltable.destroy();
    this.idIndex = this.idIndex+1;
    if (this.singleDate == '' || this.singleDate == undefined) {
      this.allchangeDate = this.alltodayDate;
    }
    else 
    {
       this.allchangeDate = this.singleDate;
    }
    if (this.alltoDate == '' || this.alltoDate == undefined) {
      this.alltodatechangeDate = this.alltodaytodate;
    }
    else {
      this.alltodatechangeDate = this.alltoDate;
    }
    console.log("All from date change date is : "+this.allchangeDate)
    params = params.set('userId', this.userId).set("fromDate",this.allchangeDate).set("toDate",this.alltodatechangeDate);//.set("amount",this.amount).set("walletAmount",this.wallet);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getusertransactionlog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.walletHistoryDTOLit = this.dto.Response;
        var editWallet = 0, noteqamount = 0;
        console.log("all transaction "+JSON.stringify(this.walletHistoryDTOLit))
        for( var i=this.walletHistoryDTOLit.length - 1; i>=0; i--){
          if(this.walletHistoryDTOLit[i].cashIn == 'Topup') /*XXXXXX */
          {
            if(editWallet == 0)
            {
              editWallet = parseInt(this.walletHistoryDTOLit[i].wallet);
              this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
              this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(editWallet);
            }
            else
            {
              editWallet = editWallet + parseInt(this.walletHistoryDTOLit[i].wallet);
              noteqamount = parseInt(this.walletHistoryDTOLit[i].wallet);
              this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
              this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(noteqamount);
            }
          }
            if(this.walletHistoryDTOLit[i].cashIn == 'Game')
              {
                if(editWallet == 0)
                {
                  editWallet = parseInt(this.walletHistoryDTOLit[i].wallet);
                  this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                  this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(editWallet);
                }
                else{
                  editWallet = editWallet + parseInt(this.walletHistoryDTOLit[i].wallet);
                  noteqamount = parseInt(this.walletHistoryDTOLit[i].wallet);
                  this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                  this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(noteqamount);
                }
              }

              if(this.walletHistoryDTOLit[i].cashIn == '2D Win')
              {
                editWallet = editWallet + parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);
              }
              if(this.walletHistoryDTOLit[i].cashIn == '3D Win')
              {
                editWallet =  editWallet + parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);

              }
              if(this.walletHistoryDTOLit[i].cashOut == '2D Bet')
              {
                if(this.walletHistoryDTOLit[i].discountAmt != null)
                {
                  editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].discountAmt);
                  this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                  this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].discountAmt);
                }
                else{
                editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);
                }
              }
              if(this.walletHistoryDTOLit[i].cashOut == '3D Bet')
              {
                if(this.walletHistoryDTOLit[i].discountAmt != null)
                {
                editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].discountAmt);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].discountAmt);
                }
                else
                {
                editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);
                }
              }
              if(this.walletHistoryDTOLit[i].cashOut == 'Withdrawal')
              {
                editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);
              }
              if(this.walletHistoryDTOLit[i].cashOut == 'GAME-DEPOSIT')
              {
                editWallet =  editWallet - parseInt(this.walletHistoryDTOLit[i].amount);
                this.walletHistoryDTOLit[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.walletHistoryDTOLit[i].amount = new Intl.NumberFormat().format(this.walletHistoryDTOLit[i].amount);
              }

          }
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }
   /*transaction detail add this 2021-11-24 -- get detail*/
   getDetail(ID)
   {
     this.spinner.show();
     this.transactionDetailList = [];
     this.token = this.storage.retrieve('token');
     let headers = new HttpHeaders();
     headers = headers.set('Authorization', this.token);
     let params = new HttpParams();
     console.log("Trnasaction : not clicked" +ID);
      params = params.set('tranId', ID);
     this.http.get(this.funct.ipaddress + 'transaction/GetTransactionDetailList', { params: params, headers: headers }).subscribe(
       result => {
         this.dto.Response = {};
         this.dto.Response = result;
         this.transactionDetailList = this.dto.Response;
         console.log("Transaction detail "+JSON.stringify(this.transactionDetailList))
         this.spinner.hide();
         $('#browseAccountData2').modal("show");
       });
   }

   getDetail1(ID)
   {
     this.spinner.show();
     this.transactionDetailList = [];
     this.token = this.storage.retrieve('token');
     let headers = new HttpHeaders();
     headers = headers.set('Authorization', this.token);
     let params = new HttpParams();
     console.log("Trnasaction : not clicked");
      params = params.set('tranId', ID);
     this.http.get(this.funct.ipaddress + 'transaction/GetTransactionDetailList', { params: params, headers: headers }).subscribe(
       result => {
         this.dto.Response = {};
         this.dto.Response = result;
         this.transactionDetailList = this.dto.Response;
         this.spinner.hide();
         $('#browseAccountData3').modal("show");
       }); 
   }

   getTwodWinnerDetail(id)
   {
    this.spinner.show();
    this.transactionDetailList = [];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('id', id);
    this.http.get(this.funct.ipaddress + 'winner/Get2DWinnerDetailList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.winnerDetail = this.dto.Response;
        this.spinner.hide();
        $('#browseAccountData4').modal("show");
      }); 
   }

   getThreedWinnerDetail(id)
   {
    this.spinner.show();
    this.transactionDetailList = [];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('id', id);
    this.http.get(this.funct.ipaddress + 'winner/Get3DWinnerDetailList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.winnerDetail = this.dto.Response;
        this.spinner.hide();
        $('#browseAccountData5').modal("show");
      }); 
   }

   getGameTranDetail(id)
   {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('tranId', id);
    this.http.get(this.funct.ipaddress + 'loginGS/GetGameCashFlowDetailList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.gameTranDetailList = this.dto.Response;
        this.spinner.hide();
        $('#browseAccountData6').modal("show");
      }); 
   }

  getTwodbetHistoryByParams()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.tempBetHistoryDTOList = [];
    var id = 'tbl2dbet' + this.idtwodindex;
    var twobettable = $('#' + id).DataTable();
    twobettable.destroy();
    if (this.twodbetDate == '' || this.twodbetDate == undefined) {
      this.twodbetchangeDate = this.twodbettodayDate;
    }
    else 
    {
       this.twodbetchangeDate = this.twodbetDate;
    }
    if (this.twodbettoDate == '' || this.twodbettoDate == undefined) {
      this.twodbettodatechangeDate = this.twodbettodaytodate;
    }
    else 
    {
       this.twodbettodatechangeDate = this.twodbettoDate;
    }
    params = params.set('userId', this.userId).set("fromDate",this.twodbetchangeDate).set("toDate",this.twodbettodatechangeDate);//.set("betamount",this.amount).set("currentwallet",this.wallet);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuser2dbetlog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempBetHistoryDTOList = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempBetHistoryDTOList.length - 1; i>=0; i--){
             // if(editWallet == 0)
           //   {
                editWallet = parseInt(this.tempBetHistoryDTOList[i].wallet);
                this.tempBetHistoryDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempBetHistoryDTOList[i].amount = new Intl.NumberFormat().format(this.tempBetHistoryDTOList[i].amount);
            //  }
            /*  else
              {
              editWallet = editWallet - parseInt(this.tempBetHistoryDTOList[i].amount);
              this.tempBetHistoryDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
              this.tempBetHistoryDTOList[i].amount = new Intl.NumberFormat().format(this.tempBetHistoryDTOList[i].amount);
              }*/
          }
        console.log("this.twodbethistorylist >>"+this.tempBetHistoryDTOList);
        this.dtTrigger2.next();
        this.spinner.hide();
      }
    );
  }
  getThreedbetHistoryByParams()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.tempBetHistoryDTOList1 = [];
    var id = 'tblthreedbet' + this.idthreedbetIndex;
    var threedbettable = $('#' + id).DataTable();
    threedbettable.destroy();
    if (this.threedbetDate == '' || this.threedbetDate == undefined) {
      this.threedbetchangeDate = this.threedbettodaydate;
    }
    else 
    {
       this.threedbetchangeDate = this.threedbetDate;
    }
    if (this.threedbettoDate == '' || this.threedbettoDate == undefined) {
      this.threedbettodatechangeDate = this.threedbettodaytodate;
    }
    else 
    {
       this.threedbettodatechangeDate = this.threedbettoDate;
    }
    console.log("All from date change date is : "+this.threedbetchangeDate)
    console.log('User id in threedbet history : '+this.userId)
    params = params.set('userId', this.userId).set("fromDate",this.threedbetchangeDate).set("toDate",this.threedbettodatechangeDate);//.set("betamount",this.threedhitamount).set("currentwallet",this.threedhitwallet);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuser3dbetlog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempBetHistoryDTOList1 = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempBetHistoryDTOList1.length - 1; i>=0; i--){
            //  if(editWallet == 0)
             // {
                editWallet = parseInt(this.tempBetHistoryDTOList1[i].wallet);
                this.tempBetHistoryDTOList1[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempBetHistoryDTOList1[i].amount = new Intl.NumberFormat().format(this.tempBetHistoryDTOList1[i].amount);
            //  }
             /* else
              {
              editWallet = editWallet - parseInt(this.tempBetHistoryDTOList1[i].amount);
              this.tempBetHistoryDTOList1[i].wallet = new Intl.NumberFormat().format(editWallet);
              this.tempBetHistoryDTOList1[i].amount = new Intl.NumberFormat().format(this.tempBetHistoryDTOList1[i].amount);
              }*/
          }
        console.log("this.threedbethistorylist >>"+this.tempBetHistoryDTOList1);
        this.dtTrigger6.next();//threedwin
        this.spinner.hide();
      }
    );
  }
  getTopupList()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.tempFinancialTransactionDTOList = [];
    var id = 'tbltopup' + this.idtopupIndex;
    var topuptable = $('#' + id).DataTable();
    topuptable.destroy();
    if (this.topupDate == '' || this.topupDate == undefined) {
      this.topupchangeDate = this.topuptodayDate;
    }
    else 
    {
       this.topupchangeDate = this.topupDate;
    }
    if (this.topuptoDate == '' || this.topuptoDate == undefined) {
      this.topuptodatechangeDate = this.topuptodaytodate;
    }
    else 
    {
       this.topuptodatechangeDate = this.topuptoDate;
    }
    params = params.set('userId', this.userId).set("fromDate",this.topupchangeDate).set("toDate",this.topuptodatechangeDate);//.set("amount",this.amount).set("walletAmount",this.wallet).set("transactionNo",this.topuptran);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getusertopuplog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempFinancialTransactionDTOList = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempFinancialTransactionDTOList.length - 1; i>=0; i--){
            //  if(editWallet == 0)
             // {
                editWallet = parseInt(this.tempFinancialTransactionDTOList[i].wallet);
                this.tempFinancialTransactionDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempFinancialTransactionDTOList[i].amount = new Intl.NumberFormat().format(this.tempFinancialTransactionDTOList[i].amount);
             // }
            /*  else
              {
              editWallet = editWallet + parseInt(this.tempFinancialTransactionDTOList[i].amount);
              this.tempFinancialTransactionDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
              this.tempFinancialTransactionDTOList[i].amount = new Intl.NumberFormat().format(this.tempFinancialTransactionDTOList[i].amount);
              }*/
          }
        console.log("this.topupList >>"+this.tempFinancialTransactionDTOList);
        this.dtTrigger4.next();
        this.spinner.hide();
      }
    );
  }
  getWithdrawalList()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    this.tempFinancialTransactionDTOList1 = [];
    var id = 'tblwithdrawal' + this.idwithdrawalIndex;
    var withtable = $('#' + id).DataTable();
    withtable.destroy();
    if (this.withDate == '' || this.withDate == undefined) {
      this.withchangeDate = this.withtodayDate;
    }
    else 
    {
       this.withchangeDate = this.withDate;
    }
    if (this.withtoDate == '' || this.withtoDate == undefined) {
      this.withtodatechangeDate = this.withtodaytodate;
    }
    else 
    {
       this.withtodatechangeDate = this.withtoDate;
    }
    console.log("All from date change date is : "+this.withchangeDate)
    params = params.set('userId', this.userId).set("fromDate",this.withchangeDate).set("toDate",this.withtodatechangeDate);//.set("amount",this.amount).set("walletAmount",this.wallet).set("transactionNo",this.withdrawalAcc);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuserwithdrawallog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempFinancialTransactionDTOList1 = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempFinancialTransactionDTOList1.length - 1; i>=0; i--){
            //  if(editWallet == 0)
             // {
                editWallet = parseInt(this.tempFinancialTransactionDTOList1[i].wallet);
                this.tempFinancialTransactionDTOList1[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempFinancialTransactionDTOList1[i].amount = new Intl.NumberFormat().format(this.tempFinancialTransactionDTOList1[i].amount);
              //}
              //else
              //{
              //editWallet = editWallet - parseInt(this.tempFinancialTransactionDTOList1[i].amount);
             // this.tempFinancialTransactionDTOList1[i].wallet = new Intl.NumberFormat().format(editWallet);
              //this.tempFinancialTransactionDTOList1[i].amount = new Intl.NumberFormat().format(this.tempFinancialTransactionDTOList1[i].amount);
              //}
          }
        console.log("this.topupList >>"+this.tempFinancialTransactionDTOList1);
        this.dtTrigger5.next();
        this.spinner.hide();
      }
    );
  }
  getTwoDwinnerList()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    this.tempWinnerDTOList = [];
    var id = 'tbltwodwin' + this.idtwodwinIndex;
    var twodwintable = $('#' + id).DataTable();
    twodwintable.destroy();
    if (this.twodwinDate == '' || this.twodwinDate == undefined) {
      this.twodwinchangeDate = this.twodwintodayDate;
    }
    else 
    {
       this.twodwinchangeDate = this.twodwinDate;
    }
    if (this.twodwintoDate == '' || this.twodwintoDate == undefined) {
      this.twodwintodatechangeDate = this.twodwintodaytodate;
    }
    else 
    {
       this.twodwintodatechangeDate = this.twodwintoDate;
    }
    console.log("All from date change date is : "+this.twodwinchangeDate)
    params = params.set('userId', this.userId).set("fromDate",this.twodwinchangeDate).set("toDate",this.twodwintodatechangeDate);//.set("winamount",this.amount).set("betamount",this.wallet);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuser2dwinnerlog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempWinnerDTOList = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempWinnerDTOList.length - 1; i>=0; i--){
                editWallet = parseInt(this.tempWinnerDTOList[i].wallet);
                this.tempWinnerDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempWinnerDTOList[i].amount = new Intl.NumberFormat().format(this.tempWinnerDTOList[i].amount);
                this.tempWinnerDTOList[i].bet_amount = new Intl.NumberFormat().format(this.tempWinnerDTOList[i].bet_amount);
          }
        console.log("this.twodwinner >>"+this.tempWinnerDTOList);
        this.dtTrigger3.next();//twodwin
        this.spinner.hide();
      }
    );
  }
  getThreeDwinnerList()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    this.tempWinnerDTOList1 = [];
    var id = 'tblthreedwin' + this.idthreedwinIndex;
    var twodwintable = $('#' + id).DataTable();
    twodwintable.destroy();
      if (this.threedwinDate == '' || this.threedwinDate == undefined) {
        this.threedwinchangeDate = this.threedwintodayDate;
      }
      else 
      {
         this.threedwinchangeDate = this.threedwinDate;
      }
      if (this.threedwintoDate == '' || this.threedwintoDate == undefined) {
        this.threedwintodatechangeDate = this.threedwintodaytodate;
      }
      else 
      {
         this.threedwintodatechangeDate = this.threedwintoDate;
      }
    console.log("All from date change date is : "+this.threedwintodatechangeDate)
    params = params.set('userId', this.userId).set("fromDate",this.threedwinchangeDate).set("toDate",this.threedwintodatechangeDate);//.set("winamount",this.amount).set("betamount",this.wallet);
    this.http.get(this.funct.ipaddress + 'userbankaccount/getuser3dwinnerlog-by-params', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempWinnerDTOList1 = this.dto.Response;
        var editWallet = 0;
        for( var i=this.tempWinnerDTOList1.length - 1; i>=0; i--){
            
                editWallet = parseInt(this.tempWinnerDTOList1[i].wallet);
                this.tempWinnerDTOList1[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempWinnerDTOList1[i].amount = new Intl.NumberFormat().format(this.tempWinnerDTOList1[i].amount);
                this.tempWinnerDTOList1[i].bet_amount = new Intl.NumberFormat().format(this.tempWinnerDTOList1[i].bet_amount);
          }
        console.log("this.threedwinner >>"+this.tempWinnerDTOList1);
        this.dtTrigger7.next();//threedwin
        this.spinner.hide();
      }
    );
  }

  getUserById() {
    this.spinner.show();
    var id1 = 'tblBank' + this.bankidIndex;
    var table1 = $('#' + id1).DataTable();
    table1.destroy();

    var id2 = 'tbl2dbet'+this.idtwodindex;
    var table2 = $("#"+id2).DataTable();
    table2.destroy();

    var id3 = 'tbltwodwin'+this.idtwodwinIndex;
    var table3 = $("#"+id3).DataTable();
    table3.destroy();

    var id4 = 'tbltopup'+this.idtopupIndex;
    var table4 = $("#"+id4).DataTable();
    table4.destroy();

    var id5 = 'tblwithdrawal'+this.idwithdrawalIndex;
    var table5 = $("#"+id5).DataTable();
    table5.destroy();

    var id6 = 'tblthreedbet'+this.idthreedbetIndex;
    var table6 = $("#"+id6).DataTable();
    table6.destroy();

    var id7 = 'tblthreedwin'+this.idthreedwinIndex;
    var table7 = $("#"+id7).DataTable();
    table7.destroy();

    var id8 = 'tblgame'+this.idgameIndex;
    var table8 = $("#"+id8).DataTable();
    table8.destroy();

    var id9 = 'tblgamewin'+this.idgamewinIndex;
    var table9 = $("#"+id9).DataTable();
    table9.destroy();

    var id10 = 'tblbonus'+this.idbonusIndex;
    var table10 = $("#"+id10).DataTable();
    table10.destroy();

    var id11 = 'tblgamewallet' + this.idgamewallet;
    var table11 = $('#' + id11).DataTable();
    table11.destroy();

    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.userId);
    this.http.get(this.funct.ipaddress + 'user/DetailsList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
          this.dto.Response = result;
          this.userDTO = this.dto.Response;
          this.agentId = this.userDTO.agent_id;
          this.alldate = new Date(this.userDTO.created_date); /*XXXXX all transaction from date set to register date */
          this.adminId = this.userDTO.admin_id;
          if(this.userDTO.gs_game_deposit_balance != null)
          {
            this.userDTO.gs_game_deposit_balance = new Intl.NumberFormat().format(this.userDTO.gs_game_deposit_balance);
          }
          if(this.userDTO.gs_game_withdrawal_balance != null)
          {
            this.userDTO.gs_game_withdrawal_balance = new Intl.NumberFormat().format(this.userDTO.gs_game_withdrawal_balance);
          }
          if (this.userDTO.imageUrl != null) {
            let objectURL =  this.userDTO.imageUrl;
            this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.isProfile = true;
          }
          else
          {
            this.isProfile = false;
          }
          if(this.userDTO.twodbetlimit != null)
             this.userDTO.twodbetlimit  = new Intl.NumberFormat().format(this.userDTO.twodbetlimit);
          if(this.userDTO.threedbetlimit != null)
             this.userDTO.threedbetlimit  = new Intl.NumberFormat().format(this.userDTO.threedbetlimit);
             if(this.userDTO.gameWalletModel != null)
             {
               this.gameWalletModel_temp = JSON.stringify(this.userDTO.gameWalletModel);
               this.dtTriggergamewallet.next();
             }
          this.spinner.hide();
      }
    );
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  goSave() {
    this.edit();
  }

  goCancel() {
    this.editCancel();
  }

  edit() {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.token);
     /*if(this.userDTO.balance_Str.toString().includes(','))
      {
        var result = this.userDTO.balance_Str.toString().replace(/,/g, "");
        this.userDTO.balance_Str = result;
      }
      this.userDTO.id = this.userId;*/
      
      if(this.userDTO.twodbetlimit.toString().includes(','))
        {
          var result = this.userDTO.twodbetlimit.toString().replace(/,/g, "");
          this.editUserDTO.twodbetlimit = result;
        }
        else
        {
          this.editUserDTO.twodbetlimit = this.userDTO.twodbetlimit;
        }
        if(this.userDTO.threedbetlimit.toString().includes(','))
        {
          var result = this.userDTO.threedbetlimit.toString().replace(/,/g, "");
          this.editUserDTO.threedbetlimit = result;
        }
        else
        {
          this.editUserDTO.threedbetlimit = this.userDTO.threedbetlimit;
        }
        if(this.editUserDTO.twodbetlimit == '' || this.editUserDTO.twodbetlimit == null || this.editUserDTO.twodbetlimit == undefined)
        {
           this.editUserDTO.twodbetlimit = '0';
        }
        if(this.editUserDTO.threedbetlimit == '' || this.editUserDTO.threedbetlimit == null || this.editUserDTO.threedbetlimit == undefined)
        {
           this.editUserDTO.threedbetlimit = '0';
        }
      this.editUserDTO.id = this.userId;
      this.editUserDTO.status = this.userDTO.status;
      this.http.post(this.funct.ipaddress + 'user/edit', this.editUserDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/user-detail', this.userDTO.id]).then(() => {
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

  flagAdmin(){
    this.agentId = null;
  }

  flagAgent(){
    this.adminId = null;
  }

  editCancel() {
    this.getUserById();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    //  console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }

  onChangeTwodbet() {
      this.twodbetDate = $("#twodbetDate").val();
  }
  onChangeTwodbetToDate()
  {
      this.twodbettoDate = $("#twodbettodate").val();
  }

  onChangeTwodWin() {
    
      this.twodwinDate = $("#towdwinDate").val();
  }

  onChangeTwoDwinToDate()
  {
      this.twodwintoDate = $("#twodwintodate").val();
  }

  onChangeThreedWin() {
    
    this.threedwinDate = $("#threedwinDate").val();
}

onChangeThreeDwinToDate()
{
    this.threedwintoDate = $("#threeedwintodate").val();
    console.log('Threed win to date in onchane : '+this.threedwintoDate)
}


  onChangeTopup() {
      this.topupDate = $("#topupDate").val();
  }

  onChangeTopupToDate()
  {
      this.topuptoDate = $("#topuptodate").val();
  }

  onChangeWith() {
      this.withDate = $("#withDate").val();
  }
  onChangeWithToDate()
  {
      this.withtoDate = $("#withtoDate").val();
  }

 
  onChangeThreeDBetDate()
  {
    this.threedbetDate = $("#threedbetDate").val();
  }
  onChangethreedbetToDate()
  {
    this.threedbettoDate = $("#threedbettodate").val();
  }
  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;

  }

  goModal(id){
    var id1 = 'tblthreedbetdetail' + this.idthreeddetailIndex;
    var threeddetailtb = $('#' + id1).DataTable();
    threeddetailtb.destroy();
    this.idthreeddetailIndex = this.idthreeddetailIndex +1;

    this.spinner.show();

    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('threedbet_id', id);
     console.log("id "+id);
    this.http.get(this.funct.ipaddress + 'threedbet/Get3DdetailList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.threeDBetDetailDTOList_temp = this.dto.Response;
        this.threeDBetDetailDTOList =  this.threeDBetDetailDTOList_temp.results;
        console.log("Detail list: " +JSON.stringify(this.threeDBetDetailDTOList));
        this.dtTrigger11.next();
      }); 
    this.spinner.hide();
    $('#browseAccountData').modal("show");
  }

  goModal1(id){
    var id1 = 'tbltwodbetdetail' + this.idtwoddetailIndex;
    var twoddetailtb = $('#' + id1).DataTable();
    twoddetailtb.destroy();
    this.idtwoddetailIndex = this.idtwoddetailIndex +1;
    this.spinner.show();
    this.twoDBetDetailDTOList = [];
    this.twoDBetDetailDTOList_temp =[];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
     params = params.set('twodbet_id', id);
     console.log("id "+id);
    this.http.get(this.funct.ipaddress + 'twodbet/Get2DdetailList', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.twoDBetDetailDTOList_temp = this.dto.Response;
        this.twoDBetDetailDTOList = this.twoDBetDetailDTOList_temp.results;
        this.dtTrigger12.next();
      }); 
    this.spinner.hide();
    $('#browseAccountData1').modal("show");
  }

  getQueenMakerTransactionHistory()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.tempQMfinancialTransactionDTOList = [];
    var id = 'tblqmtran' + this.tblqmtranid;
    var topuptable = $('#' + id).DataTable();
    topuptable.destroy();
    if (this.qmdate == '' || this.qmdate == undefined) {
      this.queenmakerfchangedate = this.qmtodaydate;
    }
    else 
    {
       this.queenmakerfchangedate = this.qmdate;
    }
    if (this.qmtodate == '' || this.qmtodate == undefined) {
      this.queenmakertchangedate = this.qmtodaytodate;
    }
    else 
    {
       this.queenmakertchangedate = this.qmtodate;
    }
    var formData = new FormData();
    this.displayUserIdTran  = this.userId.toString().padStart(3, '0');
    formData.append("userId", this.userId);
    formData.append("fromDate", this.queenmakerfchangedate);
    formData.append("toDate", this.queenmakertchangedate);
    formData.append("providerId",this.providerId);
    this.http.post(this.funct.ipaddress + 'loginGS/getGameUserTransactionAdminWeb', formData,{ headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.tempQMfinancialTransactionDTOList = this.dto.Response;
        var editWallet = 0;
        console.log("game transaction" +JSON.stringify(this.tempQMfinancialTransactionDTOList))
        /*for( var i=this.tempQMfinancialTransactionDTOList.length - 1; i>=0; i--){
                editWallet = parseInt(this.tempQMfinancialTransactionDTOList[i].amount);
                this.tempQMfinancialTransactionDTOList[i].wallet = new Intl.NumberFormat().format(editWallet);
                this.tempQMfinancialTransactionDTOList[i].amount = new Intl.NumberFormat().format(this.tempQMfinancialTransactionDTOList[i].amount);
          }*/
        this.dtTriggerKM.next();
        this.spinner.hide();
      }
    );
  }
  onchangeQmDate()
  {
    this.qmdate = $("#queenmakerdate").val();
  }
  onchangeQmToDate()
  {
    this.qmtodate = $("#queenmakertodate").val();
    console.log("Queen maker to date on change is : "+this.qmtodate);
  }
  
  getGameBalanceLog()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    this.userGameLogList = [];
    var id = 'tblgamewinlose' + this.idgamewinIndex;
    var topuptable = $('#' + id).DataTable();
    topuptable.destroy();
    if (this.gamewinDate == '' || this.gamewinDate == undefined) {
      this.gamewinchangeDate = this.gamewintodaydate;
    }
    else 
    {
       this.gamewinchangeDate = this.gamewinDate;
    }
    if (this.gamewintoDate == '' || this.gamewintoDate == undefined) {
      this.gamwinetodatechangeDate = this.gamewintodaytodate;
    }
    else 
    {
       this.gamwinetodatechangeDate = this.gamewintoDate;
    }
    var formData = new FormData();
    this.displayUserId  = this.userId.toString().padStart(3, '0');
    formData.append("userId", this.userId);
    formData.append("fromDate", this.gamewinchangeDate);
    formData.append("toDate", this.gamwinetodatechangeDate);
    if(this.providerId1 == undefined)
    {
      this.providerId1 = '';
    }
    formData.append("providerId",this.providerId1);
    this.http.post(this.funct.ipaddress + 'user/GetGameUserBalanceLog', formData,{ headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.userGameLogList = this.dto.Response;
        this.dtTriggergwinlose.next();
        this.spinner.hide();
      }
    );
  }

  onWinLostDate()
  {
    this.gamewinDate = $("#gamewinDate").val();
  }
  onChangeonWinLosttoDate()
  {
    this.gamewintoDate = $("#gamewintodate").val();
  }
}