import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { from } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-holiday-detail',
  templateUrl: './holiday-detail.component.html',
  styleUrls: ['./holiday-detail.component.css']
})
export class HolidayDetailComponent implements OnInit {

  holidayId: any;
  holidayDTO: any;
  changedate: any;
  date: string = '';
  status: string = '';
  token: any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { 

      this.changedate = new Date();
    //  this.from_today_date = this.datepipe.transform(this.changefromDate, 'MMM dd, yyyy');
   
     // this.changetoDate = new Date();
     // this.to_today_date = this.datepipe.transform(this.changetoDate, 'MMM dd, yyyy');
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

    this.holidayId = this.route.snapshot.paramMap.get("id");
    if (this.holidayId == null) {
      this.holidayDTO = {
        id: 0,
        date: '',
        description: '',
        status: 'ACTIVE',
        createdDate: '',
        createdBy: '',
      };
    }
    else {
      this.holidayDTO = {
        id: 0,
        date: '',
        description: '',
        status: 'ACTIVE',
        createdDate: '',
        createdBy: '',
      };
      this.getResultById();
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

  getResultById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.holidayId);
    this.http.get(this.funct.ipaddress + 'holiday/DetailById', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.holidayDTO = this.dto.Response;//.data.holidayDTO; 
        this.changedate = new Date(this.holidayDTO.date_Str); 
      }
    );
  }

  onChangeDate() {
    $(document).ready(function () {
      this.date = $("#date").val();
    });
  }

  goSave() {
    if (this.holidayId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show();

    if (this.holidayDTO.description != '') {

      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);

      var a = this.changedate;
      console.log("Date1: " + a.getUTCDate());
      a.setDate(a.getDate() + 1);
      console.log("Date: " + a);
      var date = a.getUTCDate();
      console.log("day: " + date);
      var month = a.getUTCMonth() + 1;
      var year = a.getUTCFullYear();
      var monthStr = '';
      var dayStr = '';
      var yearStr = '';
      var forDate = '';
      if (date.toString().length > 1) {
        dayStr = '' + date;
      }
      else {
        dayStr = '0' + date;
      }

      if (month.toString().length > 1) {
        monthStr = '' + month;
      }
      else {
        monthStr = '0' + month;
      }

      yearStr = '' + year;
      forDate = yearStr + '-' + monthStr + '-' + dayStr;
      this.holidayDTO.date = forDate;

      this.http.post(this.funct.ipaddress + 'holiday/holidayInsert', this.holidayDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( //change
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/holiday-list']).then(() => {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.spinner.show();
    if (this.holidayDTO.description != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', this.token);

      var a = this.changedate;
      console.log("Date1: " + a.getUTCDate());
      a.setDate(a.getDate() + 1);
      console.log("Date: " + a);
      var date = a.getUTCDate();
      console.log("day: " + date);
      var month = a.getUTCMonth() + 1;
      var year = a.getUTCFullYear();
      var monthStr = '';
      var dayStr = '';
      var yearStr = '';
      var forDate = '';
      if (date.toString().length > 1) {
        dayStr = '' + date;
      }
      else {
        dayStr = '0' + date;
      }

      if (month.toString().length > 1) {
        monthStr = '' + month;
      }
      else {
        monthStr = '0' + month;
      }

      yearStr = '' + year;
      forDate = yearStr + '-' + monthStr + '-' + dayStr;
      this.holidayDTO.date = forDate;

      console.log("ResultDTO: " + JSON.stringify(this.holidayDTO));
      this.http.post(this.funct.ipaddress + 'holiday/Update', this.holidayDTO, { headers: headers }).subscribe( //change
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/holiday-list']).then(() => {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  goCancel() {
    if(this.holidayId == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }

  cancel(){
    this.holidayDTO = {
      id: 0,
      date: '',
      description: '',
      createdDate: '',
      createdBy: '',
    };
  }
  
  editCancel(){
    this.getResultById();
  }
}
