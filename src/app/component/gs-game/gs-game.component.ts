import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
declare var $: any;


@Component({
  selector: 'app-game',
  templateUrl: './gs-game.component.html',
  styleUrls: ['./gs-game.component.css']
})
export class GSGameComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtOptions2 : DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtTrigger2 : Subject<any> = new Subject();
  gameName: string = '';
  gameCode: string = '';
  type: string = '';
  status: string = '';
  gameList: any;
  idIndex: any;
  token: any;
  idIndex2 : any;
  pid : any;
  paymentTemp : any;
  paymentTempList : any;
  name : any;
  gameproviderList : any;
  providerId : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService,
    private router: Router, private funct: FunctService, private toastr: ToastrService,) {
    this.idIndex = 1;
    this.status = 'ACTIVE';
    this.search();
    this.getAllProvider();
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
    if(error.status == 403)
    {
      this.spinner.hide();
      var id = 'tblpayment' + this.idIndex;
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

  search() {
    this.gameList = [];
    var id = 'tblpayment' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex + 1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    var formData = new FormData();
    formData.append("gameName",this.gameName);
    formData.append("status",this.status);
    formData.append("providerId",this.providerId);
    this.http.post(this.funct.ipaddress + 'loginGS/GetGsGameListByParams', formData, {headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.gameList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  flagProvider()
  {
      this.providerId = $("#providerId").val();
  }
}
