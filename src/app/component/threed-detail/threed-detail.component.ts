import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from '@angular/common/http';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-threed-detail',
  templateUrl: './threed-detail.component.html',
  styleUrls: ['./threed-detail.component.css']
})
export class ThreedDetailComponent implements OnInit {

  singleDate: any;
  resultDTO: any;
  token: any;
  resultId: any;
  time: string = '';
  date: any;
  dateStr: string = '';
  changeDate : any;
  alltodayDate : any;
  allchangeDate  : any;

  constructor(private datepipe: DatePipe,private storage: LocalStorageService, private route: ActivatedRoute, private http: HttpClient, private dto: DtoService, 
    private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private funct: FunctService) {
    this.time = 'PM';
    this.date = new Date();
    this.alltodayDate = this.datepipe.transform(this.date, 'MMM dd, yyyy');

    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }

    this.resultId = this.route.snapshot.paramMap.get("id");
    if (this.resultId == null) {
      $(document).ready(function () {
        $('#saveBtn').show();
        $('#deleteBtn').remove();
      });

      this.resultDTO = {
        id: 0,
        number: '',
        forDateTime: '',
        forTime: '',
        type: 'THREED'
      }
      //this.date = new Date();
    }
    else {
      $(document).ready(function () {
        $('#saveBtn').remove();
        $('#deleteBtn').show();
      });
      this.resultDTO = {
        id: 0,
        number: '',
        forDateTime: '',
        forTime: '',
        type: 'THREED'
      };
      this.getResultById();
    }
  }

  ngOnInit(): void {
    if (this.resultId == null) {
      $(document).ready(function () {

      });
    }
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData1").modal("show");
    }
    if(error.status == 409)
    {
      this.spinner.hide();
      this.router.navigate(['/threed-list']).then(() => {
        this.toastr.error('Duplicate Number', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
      })
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
    params = params.set('resultId', this.resultId);
    this.http.get(this.funct.ipaddress + 'result/GetDetails', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.resultDTO = this.dto.Response;//.data.resultDTO; // here
        console.log(this.resultDTO.for_date_time_Str)
        this.date = new Date(this.resultDTO.for_date_time);
      }
    );
  }


  goSave() {
    if (this.resultId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  goCancel() {
    if (this.resultId == null) {
      this.cancel();
    }
    else {
      this.editCancel();
    }
  }

  cancel() {
    this.resultDTO = {
      id: 0,
      number: '',
      forDateTime: '',
      forTime: '',
      type: 'THREED'
    }
  }
  editCancel() {
    this.getResultById();
  }

  save() {
    this.spinner.show();
    if (this.time != '') {
      if (this.resultDTO.number != null) {
        var number = this.resultDTO.number;
        console.log(number.length)
        if (number.toString().length < 3) {
         this.spinner.hide();
         this.toastr.error("Number must be threed digit", 'Invalid!', {
           timeOut: 3000,
           positionClass: 'toast-top-right',
         });
         return;
        }
        if(this.resultDTO.number == '')
        {
          this.spinner.hide();
          this.toastr.error("Number must not be blank", 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          return;
        }
        if (this.resultDTO.number != '' && this.resultDTO.number.length == 3) {
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization',this.token);
          var a = this.date;
        if(this.date == null || this.date == undefined)
        {
            this.spinner.hide();
            this.toastr.error("Please choose date", 'Invalid!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          return;
         }
        else
        this.changeDate = this.date;

        this.singleDate = $("#singleDate").val();
        if(this.singleDate == 'undefined' || this.singleDate == null)
        {
          this.allchangeDate = this.alltodayDate;
        }
        else
         this.allchangeDate = this.singleDate;
         console.log('Original date is : '+this.allchangeDate)//this.changeDate
         var fdate = new Date(this.allchangeDate), //this.changeDate
         mnth = ("0" + (fdate.getMonth() + 1)).slice(-2),
          day = ("0" + fdate.getDate()).slice(-2);
          console.log("Correct date : "+ [fdate.getFullYear(), mnth, day].join("-"));  //use this date formate only
          var forDateTime = '';
          forDateTime =  [fdate.getFullYear(), mnth, day].join("-"); //use this only
          this.resultDTO.forDateTime = forDateTime;
          this.resultDTO.type = 'THREED';

          let formData = new FormData();
          formData.append("number",this.resultDTO.number)
          formData.append("for_time","")
          formData.append("for_date_time",forDateTime)
          formData.append("type","THREED")

          this.http.post(this.funct.ipaddress + 'result/resultInsert', formData, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe(
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              console.log(this.dto.Response.status);
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/threed-list']).then(() => {
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
      else {
        this.spinner.hide();
        this.toastr.error('Please enter number', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }

    else {
      this.spinner.hide();
      this.toastr.error('Please choose time', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }

  }

  edit() {
    this.spinner.show();
    if (this.resultDTO.number != null) {

      var number = this.resultDTO.number;
      if (number.toString().length == 2) {
        this.resultDTO.number = '0' + number;
      }
      if (this.resultDTO.number != '') {
        this.token = this.storage.retrieve('token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'ITW ' + this.token);
        var a = this.date;
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
        var forDateTime = '';
        var timeStr = '';
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

        if (this.time == 'AM') {
          timeStr = "12:00:00";
        }
        else {
          timeStr = "17:00:00";
        }
        forDateTime = yearStr + '-' + monthStr + '-' + dayStr + ' ' + timeStr;
        this.resultDTO.forDateTime = forDateTime;
        this.resultDTO.type = 'THREED';
        console.log("ResultDTO: " + JSON.stringify(this.resultDTO));
        this.http.post(this.funct.ipaddress + 'result/edit', this.resultDTO, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         )
        .subscribe(
          result => {
            this.dto.Response = {};
            this.dto.Response = result;
            if (this.dto.Response.message.code == '200') {
              this.spinner.hide();
              this.router.navigate(['/threed-list']).then(() => {
                this.toastr.success(this.dto.Response.message, 'Success!', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right'
                });
              })
            }
            else {
              this.spinner.hide();
              this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.date = $("#singleDate").val();
      console.log("hi: " + this.date);
    });
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;

  }

  delete(){
    $('#deleteData').modal("show");
  }

  deleteOk() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let formData= new FormData();
    formData.append("resultId",this.resultId);
    this.http.post(this.funct.ipaddress + 'result/Delete', formData, {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/threed-list']).then(() => {
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