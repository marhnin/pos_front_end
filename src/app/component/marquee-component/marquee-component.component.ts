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
  templateUrl: './marquee-component.component.html',
  styleUrls: ['./marquee-component.component.css']
})
export class MarqueeDetailComponent implements OnInit {
  amount: string = '';
  singleDate: string = '';
  time: string = '';
  twodbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  marqueeDTO: any;
  token: any;
  changeDate: any;
  type : any;
  status : any;
  section : any;
  myDate = new Date();
  for_date : any;
  for_format_date : any;
  marqueeId : any;
  mtext : any;
  dbook : any;
  gameproviderList : any;
  providerId : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
      this.for_date = new Date();
      this.for_format_date = this.datepipe.transform(this.for_date, 'MMM dd, yyyy');
      this.getAllProvider();
    }

  ngOnInit(): void {
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload();
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }

    this.marqueeId = this.route.snapshot.paramMap.get("id");
    if (this.marqueeId == null) {
      $(document).ready(function () {
      });
      this.marqueeDTO = {
        id: 0,
        marqueeText: '',
        dreamBookLink: '',
        providerId: '',
        created_by: '',
        created_date :'',
        updated_by:'',
        updated_date:'',
        status:'ACTIVE'
      };
    }
    else {
      $(document).ready(function () {
      });
      this.marqueeDTO = {
        id: 0,
        marqueeText: '',
        dreamBookLink: '',
        providerId: '',
        created_by: '',
        created_date :'',
        updated_by:'',
        updated_date:'',
        status:''
      };
      this.getMarqueeText();
    }
    console.log("Marquee Id is: "+this.marqueeId)
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
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
    if(error.status == 400)
    {
      this.spinner.hide();
      this.toastr.error("Please choose game provider or blank space for home", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
  }

  goSave() {
    if (this.marqueeId == null) {
      this.save();
    }
    else {
      this.editMarquee();
    }
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
     });
  }

  getMarqueeText() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.marqueeId);
    this.http.get(this.funct.ipaddress + 'marquee/GetMarqueeDetail', {params:params,headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.marqueeDTO = this.dto.Response;
      });
  }

  editMarquee()
  {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      this.http.post(this.funct.ipaddress + 'marquee/updateMarqueeText', this.marqueeDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/marquee-list']).then(() => {
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
 
  save() 
  {
         this.spinner.show();
         this.token = this.storage.retrieve('token');
         let headers = new HttpHeaders();
         headers = headers.set('Authorization', this.token);
         this.http.post(this.funct.ipaddress + 'marquee/Insert', this.marqueeDTO, { headers: headers })
         .pipe(
           catchError(this.handleError.bind(this))
          )
         .subscribe(
           result => {
             this.dto.Response = {};
             this.dto.Response = result;
             if (this.dto.Response.status == 'Success') {
               this.spinner.hide();
               this.router.navigate(['/marquee-list']).then(() => {
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

  flagProvider()
  {
      this.providerId = $("#providerId").val();
  }
}
