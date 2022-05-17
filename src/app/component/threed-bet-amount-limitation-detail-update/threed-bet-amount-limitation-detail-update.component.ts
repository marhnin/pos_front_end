import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { from } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-threed-bet-amount-limitation-detail-update',
  templateUrl: './threed-bet-amount-limitation-detail-update.component.html',
  styleUrls: ['./threed-bet-amount-limitation-detail-update.component.css']
})
export class ThreedBetAmountLimitationDetailUpdateComponent implements OnInit {
  amount: string = '';
  singleDate: string = '';
  time: string = '';
  twodbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  threedbetDTO: any;
  token: any;
  changeDate: any;
  type : any;
  status : any;
  section : any;
  myDate = new Date();
  for_date : any;
  for_format_date : any;
  betLimitId : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
      this.for_date = new Date();
     this.for_format_date = this.datepipe.transform(this.for_date, 'MMM dd, yyyy');
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

    this.threedbetDTO = {
      id: 0,
      number: '',
      max_amt: '',
      status: ''
    };
    this.betLimitId = this.route.snapshot.paramMap.get("id");
    this.getBetLimitById();
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
     // $("#deleteData1").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
  }
  
  getBetLimitById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.betLimitId);
    this.http.get(this.funct.ipaddress + 'betamountLimitation/GetthreedDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.threedbetDTO = this.dto.Response;

      });
  }
  editBetLimit()
  {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      this.http.post(this.funct.ipaddress + 'betamountLimitation/updateThreedLimit', this.threedbetDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
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
        }); 
  }
 
}
