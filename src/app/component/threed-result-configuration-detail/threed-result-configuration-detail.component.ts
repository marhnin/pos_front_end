import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { DatePipe } from '@angular/common'

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { from } from 'rxjs';
import { Console } from 'console';
declare var $: any;

@Component({
  selector: 'app-threed-result-configuration-detail',
  templateUrl: './threed-result-configuration-detail.component.html',
  styleUrls: ['./threed-result-configuration-detail.component.css']
})
export class ThreedResultConfigurationDetailComponent implements OnInit {

  threedResultConfigId: any;
  threedResultConfigDTO: any;

  changefromDate: any;
  changetoDate: any;
  fromDate: string = '';
  toDate: string = '';

  fromhours: string = '';
  fromminutes: string = '';
  tohours: string = '';
  tominutes: string = '';
  token: any;
  second: string = '00';

  fromdate_change_date : any;
  from_today_date : any;

  todate_change_date : any;
  to_today_date :any;

  constructor(private datepipe: DatePipe, private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { 
     
      this.changefromDate = new Date();
      this.from_today_date = this.datepipe.transform(this.changefromDate, 'MMM dd, yyyy');
   
      this.changetoDate = new Date();
      this.to_today_date = this.datepipe.transform(this.changetoDate, 'MMM dd, yyyy');

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

    this.threedResultConfigId = this.route.snapshot.paramMap.get("id");
    if (this.threedResultConfigId == null) {
      $(document).ready(function () {
        $('#updatedata').remove();
      });
      this.threedResultConfigDTO = {
        id: 0,
        fromDateTime: '',
        toDateTime: '',
        status: 'ACTIVE',
        createdDate: '',
        createdBy: '',
        updatedDate: '',
        updatedBy: ''
      };
    }
    else {
      $(document).ready(function () {
        $('#updatedata').show();
      });
      this.threedResultConfigDTO = {
        id: 0,
        fromDateTime: '',
        toDateTime: '',
        status: 'ACTIVE',
        createdDate: '',
        createdBy: '',
        updatedDate: '',
        updatedBy: ''
      };
      this.getResultById();


    }
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

  getResultById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',this.token);
    let params = new HttpParams();
    params = params.set('id', this.threedResultConfigId);
   console.log(this.threedResultConfigId);
    this.http.get(this.funct.ipaddress + 'threedconfig/DetailById', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>>> " + JSON.stringify(this.dto.Response));
        this.threedResultConfigDTO = this.dto.Response;//.data.threeDResultConfigDTO;

        let splitFromDate = this.threedResultConfigDTO.from_date_Str.split(' ')[0]
        console.log("splitFromDate>> " + splitFromDate);

        let splitFromTime = this.threedResultConfigDTO.from_date_Str.split(' ')[1]
        console.log("splitFromTime>> " + splitFromTime);

        this.changefromDate = new Date(splitFromDate);  //change
        this.fromhours = splitFromTime.split(':')[0];
        this.fromminutes = splitFromTime.split(':')[1];

        let splitToDate = this.threedResultConfigDTO.to_date_Str.split(' ')[0]
        console.log("splitToDate>> " + splitToDate);

        let splitToTime = this.threedResultConfigDTO.to_date_Str.split(' ')[1]
        console.log("splitToTime>> " + splitToTime);

        this.changetoDate = new Date(splitToDate); // change
        this.tohours = splitToTime.split(':')[0];
        this.tominutes = splitToTime.split(':')[1];
      }
    );
  }

  onChangeFromDate() {
   
      this.fromDate = $("#fromDate").val();
      console.log("this.fromDate>> " + this.fromDate)
   
  }

  onChangeToDate() {
   
      this.toDate = $("#toDate").val();
   
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;

  }

  goSave() {
    if (this.threedResultConfigId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show();
    if (this.changefromDate != null) {
      if (this.fromhours != '' && this.fromhours != null && this.fromhours.toString().length <= 2) {
        if (this.fromminutes != null && this.fromminutes.toString().length <= 2) {
          if (this.changetoDate != null) {
            if (this.tohours != '' && this.tohours != null && this.tohours.toString().length <= 2) {
              if ( this.tominutes != null && this.tominutes.toString().length <= 2) {
                if (this.fromhours < "24" && this.tohours < "24") {
                  if (this.fromminutes <= "59" && this.tominutes <= "59") {

                    var formatFromDate = new Date(this.changefromDate),
                    fmnth = ("0" + (formatFromDate.getMonth() + 1)).slice(-2),
                    fday = ("0" + formatFromDate.getDate()).slice(-2);
                    var toFromatDate = new Date(this.changetoDate),
                    tmnth = ("0" + (toFromatDate.getMonth() + 1)).slice(-2),
                    tday = ("0" + toFromatDate.getDate()).slice(-2);

                    var number = this.fromhours;
                    if (number.toString().length == 1) {
                      this.fromhours = '0' + this.fromhours;
                    }

                    var number1 = this.fromminutes;
                    if (number1.toString().length == 1) {
                      this.fromminutes = '0' + this.fromminutes;
                    }

                    var number3 = this.tohours;
                    if (number3.toString().length == 1) {
                      this.tohours = '0' + this.tohours;
                    }

                    var number4 = this.tominutes;
                    if (number4.toString().length == 1) {
                      this.tominutes = '0' + this.tominutes;
                    }

                    this.token = this.storage.retrieve('token');
                    let headers = new HttpHeaders();
                    headers = headers.set('Authorization',  this.token);

                    var a = this.changefromDate;
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
                    var forFromDate = '';
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
                 // forFromDate = yearStr + '-' + monthStr + '-' + dayStr + ' ' + this.fromhours + ':' + this.fromminutes + ':' + this.second;
                  forFromDate = [formatFromDate.getFullYear(), fmnth, fday].join("-") +" "+ this.fromhours + ':' + this.fromminutes + ':' + this.second;
                  console.log("forFromDate>> " + forFromDate)

                    this.threedResultConfigDTO.fromDateTime = forFromDate;
                    //this.threedResultConfigDTO.from_date = forFromDate;

                    var b = this.changetoDate;
                    console.log("Origin al change to date "+b);
                    console.log("Date1: " + b.getUTCDate());
                    b.setDate(b.getDate() + 1);
                    console.log("Date: " + b);
                    var tdate = b.getUTCDate();
                    console.log("day: " + tdate);
                    var tmonth = b.getUTCMonth() + 1;
                    var tyear = b.getUTCFullYear();
                    var tmonthStr = '';
                    var tdayStr = '';
                    var tyearStr = '';
                    var forToDate = '';
                    if (tdate.toString().length > 1) {
                      tdayStr = '' + tdate;
                    }
                    else {
                      tdayStr = '0' + tdate;
                    }

                    if (tmonth.toString().length > 1) {
                      tmonthStr = '' + tmonth;
                    }
                    else {
                      tmonthStr = '0' + tmonth;
                    }

                    tyearStr = '' + tyear;
                   // forToDate = tyearStr + '-' + tmonthStr + '-' + tdayStr + ' ' + this.tohours + ':' + this.tominutes + ':' + this.second;
                  forToDate = [toFromatDate.getFullYear(), tmnth, tday].join("-") + ' ' + this.tohours + ':' + this.tominutes + ':' + this.second;
                  console.log("forToDate>> " + forToDate)
                  this.threedResultConfigDTO.toDateTime = forToDate;
                  //this.threedResultConfigDTO.to_date = forToDate;
                  let formData = new FormData();
                  formData.append("from_date",forFromDate)
                  formData.append("to_date",forToDate)
                  formData.append("status",this.threedResultConfigDTO.status);
                  console.log("request this.threedResultConfigDTO> " + JSON.stringify(this.threedResultConfigDTO));
                 
                    this.http.post(this.funct.ipaddress + 'threedconfig/threeDConfigInsert', formData , { headers: headers })
                    .pipe(
                      catchError(this.handleError.bind(this))
                     )
                    .subscribe( //change
                      result => {
                        this.dto.Response = {};
                        this.dto.Response = result;
                        if (this.dto.Response.status == 'Success') {
                          this.spinner.hide();
                          this.router.navigate(['/threed-result-configuration-list']).then(() => {
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
                  else {
                    this.spinner.hide();
                    this.toastr.error('Minutes must be less than equal 59.', 'Invalid input!', {
                      timeOut: 3000,
                      positionClass: 'toast-top-right',
                    });
                  }
                }
                else {
                  this.spinner.hide();
                  this.toastr.error('Hour must be less than 24.', 'Invalid input!', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right',
                  });
                }
              }
              else {
                this.spinner.hide();
                this.toastr.error('Please enter to minutes', 'Invalid input!', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                });
              }
            }
            else {
              this.spinner.hide();
              this.toastr.error('Please enter to hours', 'Invalid input!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
            }
          }
          else {
            this.spinner.hide();
            this.toastr.error('Please choose to date', 'Invalid input!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error('Please enter from minutes', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
      else {
        this.spinner.hide();
        this.toastr.error('Please enter from hours', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }
    else {
      this.spinner.hide();
      this.toastr.error('Please choose from date', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.spinner.show();
    if (this.changefromDate != null) {
      if (this.fromhours != null && this.fromhours.toString().length <= 2) {
        if (this.fromminutes != null && this.fromminutes.toString().length <= 2) {
          if (this.changetoDate != null) {
            if (this.tohours != null && this.tohours.toString().length <= 2) {
              if (this.tominutes != null && this.tominutes.toString().length <= 2) {

                var formatFromDate = new Date(this.changefromDate),
                fmnth = ("0" + (formatFromDate.getMonth() + 1)).slice(-2),
                fday = ("0" + formatFromDate.getDate()).slice(-2);

                var toFromatDate = new Date(this.toDate),
                tmnth = ("0" + (toFromatDate.getMonth() + 1)).slice(-2),
                tday = ("0" + toFromatDate.getDate()).slice(-2);

                var number = this.fromhours;
                if (number.toString().length == 1) {
                  this.fromhours = '0' + this.fromhours;
                }

                var number1 = this.fromminutes;
                if (number1.toString().length == 1) {
                  this.fromminutes = '0' + this.fromminutes;
                }

                var number3 = this.tohours;
                if (number3.toString().length == 1) {
                  this.tohours = '0' + this.tohours;
                }

                var number4 = this.tominutes;
                if (number4.toString().length == 1) {
                  this.tominutes = '0' + this.tominutes;
                }

                this.token = this.storage.retrieve('token');
                let headers = new HttpHeaders();
                headers = headers.set('Authorization',  this.token);

                var a = this.changefromDate;
                console.log("Date1: " + a.getUTCDate());
                a.setDate(a.getDate() +1 ); // edit 
                console.log("Date: " + a);
                var date = a.getUTCDate();
                console.log("day: " + date);
                var month = a.getUTCMonth() + 1;
                console.log("month: plus one" + month);
                var year = a.getUTCFullYear();
                var monthStr = '';
                var dayStr = '';
                var yearStr = '';
                var forFromDate = '';
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
                forFromDate = [formatFromDate.getFullYear(), fmnth, fday].join("-") +" "+ this.fromhours + ':' + this.fromminutes + ':' + this.second;
               // forFromDate = yearStr + '-' + monthStr + '-' + dayStr + ' ' + this.fromhours + ':' + this.fromminutes + ':' + this.second;
                console.log("forFromDate>> " + forFromDate)
                this.threedResultConfigDTO.fromDateTime = forFromDate; /*use this section*/

                var b = this.changetoDate;
                console.log("Date1: " + b.getUTCDate());
                b.setDate(b.getDate() +1 ); //remove plus 
                console.log("Date: " + b);
                var tdate = b.getUTCDate();
                console.log("day: " + tdate);
                var tmonth = b.getUTCMonth() + 1 ;//remove +1 
                var tyear = b.getUTCFullYear();
                var tmonthStr = '';
                var tdayStr = '';
                var tyearStr = '';
                var forToDate = '';
                if (tdate.toString().length > 1) {
                  tdayStr = '' + tdate;
                }
                else {
                  tdayStr = '0' + tdate;
                }

                if (tmonth.toString().length > 1) {
                  tmonthStr = '' + tmonth;
                }
                else {
                  tmonthStr = '0' + tmonth;
                }

                tyearStr = '' + tyear;
              //  forToDate = tyearStr + '-' + tmonthStr + '-' + tdayStr + ' ' + this.tohours + ':' + this.tominutes + ':' + this.second;
               forToDate = [toFromatDate.getFullYear(), tmnth, tday].join("-") + ' ' + this.tohours + ':' + this.tominutes + ':' + this.second;
               console.log("forToDate>> " + forToDate)
                this.threedResultConfigDTO.toDateTime = forToDate; /*user this for to date*/
                let formData = new FormData();
                formData.append("from_date",forFromDate)
                formData.append("to_date",forToDate)
                formData.append("status",this.threedResultConfigDTO.status);
                formData.append("id",this.threedResultConfigId);
                this.http.post(this.funct.ipaddress + 'threedconfig/update', formData, { headers: headers })
                .pipe(
                  catchError(this.handleError.bind(this))
                 )
                .subscribe( //change
                  result => {
                    this.dto.Response = {};
                    this.dto.Response = result;
                    if (this.dto.Response.status == 'Success') {
                      this.spinner.hide();
                      this.router.navigate(['/threed-result-configuration-list']).then(() => {
                        this.toastr.success(this.dto.Response.message.message, 'Success!', {
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
              else {
                this.spinner.hide();
                this.toastr.error('Please enter to minutes', 'Invalid input!', {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                });
              }
            }
            else {
              this.spinner.hide();
              this.toastr.error('Please enter to hours', 'Invalid input!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
            }
          }
          else {
            this.spinner.hide();
            this.toastr.error('Please choose to date', 'Invalid input!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
        }
        else {
          this.spinner.hide();
          this.toastr.error('Please enter from minutes', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
      else {
        this.spinner.hide();
        this.toastr.error('Please enter from hours', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }
    else {
      this.spinner.hide();
      this.toastr.error('Please choose from date', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

}
