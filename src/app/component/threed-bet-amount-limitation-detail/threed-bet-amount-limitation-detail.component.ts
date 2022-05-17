import { Component, OnInit,ViewChild  } from '@angular/core';
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
  selector: 'app-threed-bet-amount-limitation-detail',
  templateUrl: './threed-bet-amount-limitation-detail.component.html',
  styleUrls: ['./threed-bet-amount-limitation-detail.component.css']
})
export class ThreedBetAmountLimitationDetailComponent implements OnInit {
  threedbetId: any;
  threedbetDTO: any;
  changefromDate: any;
  changetoDate1: any;
  changetoDate: any;
  for_change_to_date : any;
  fromdate: string = '';
  todate: string = '';
  token: any;
  singleDate : any;
  threedbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  for_date : any;
  for_format_date : any;
  changeDate : any;
  amount : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
      this.for_date = new Date();
      this.for_format_date = this.datepipe.transform(this.for_date, 'MMM dd, yyyy');

      this.changetoDate1 = new Date();
      this.for_change_to_date = this.datepipe.transform(this.changetoDate1, 'MMM dd, yyyy');
      this.getThreedNumbers();
    } 

    getThreedNumbers() {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams();
      this.threedbetnumber = [];
      this.http.get(this.funct.ipaddress + 'threedbet/GetThreedNumber', { params: params, headers: headers })
      .subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.threedbetnumber =  this.dto.Response;
          for (let i = 0; i < this.threedbetnumber.length; i++) {
            this.threedbetnumber[i].flag = false;
            this.threedbetnumber[i].buttonColor = '#d1cccc';
            this.threedbetnumber[i].textcolor = '#313131';
          }
          console.log(JSON.stringify(this.threedbetnumber))
          this.spinner.hide();
        });
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

    this.threedbetId = this.route.snapshot.paramMap.get("id");
    if (this.threedbetId == null) {
      this.threedbetDTO = {
        number: '',
        max_amt: '',
        status: 'ACTIVE'
      };
    }
    else {
      this.threedbetDTO = {
        id: 0,
        number: '',
        amount: '',
        status: 'ACTIVE'
      };
      this.getResultById();
    }
    
  }

  getResultById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'ITW ' + this.token);
    let params = new HttpParams();
    params = params.set('id', this.threedbetId);

    this.changefromDate = new Date(this.threedbetDTO.fromDate);  //change
    this.changetoDate = new Date(this.threedbetDTO.toDate); // change
    this.http.get(this.funct.ipaddress + 'result/threedbetamount-result', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
      }
    );
  }

  onChangeFromDate() {
    $(document).ready(function () {
      this.fromDate = $("#fromDate").val();
    });
  }

  onChangeToDate() {
      this.todate = $("#toDate").val();
      console.log('Todate is: '+this.todate)
    
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }

  goSave() {
    if (this.threedbetId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }
  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.toastr.error("Need to Sign out.Login again.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
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
    return throwError(error);
    }
    OkLogout()
    {
      window.location.href ="./ad-login";
    } 

    onChangeSingle() {
        this.singleDate = $("#singleDate").val();
    }

    selectAll()
    {
      for (let i = 0; i < this.threedbetnumber.length; i++) {
          this.threedbetnumber[i].flag = !this.threedbetnumber[i].flag;
          if (this.threedbetnumber[i].buttonColor == '#d1cccc' && this.threedbetnumber[i].textcolor == '#313131') {
            this.threedbetnumber[i].buttonColor = '#2456A6'
            this.threedbetnumber[i].textcolor = '#ffffff'
          } else {
            this.threedbetnumber[i].buttonColor = '#d1cccc'
            this.threedbetnumber[i].textcolor = '#313131'
          }
      }
      this.selectedData();
    }

  save()
  {
    
    if(this.amount == null || this.amount== undefined)
       {
        this.toastr.error('Please enter amount', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        return;
       }

    if(this.selectNum == null || this.selectNum.length == 0)
       {
          this.toastr.error('Please select number', 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });
          return;
       }
       
          this.spinner.show();
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          /*from date */
          if(this.singleDate == null || this.singleDate == '' || this.singleDate == undefined)
              this.changeDate = this.for_format_date;
          else
              this.changeDate = this.singleDate;
        var formatDate = new Date(this.changeDate),
        fmnth = ("0" + (formatDate.getMonth() + 1)).slice(-2),
        fday = ("0" + formatDate.getDate()).slice(-2);
        
        var forDate = '';
        forDate = [formatDate.getFullYear(), fmnth, fday].join("-");
     
        /*to date*/
        console.log("To date is: "+this.todate)
        this.todate = $("#toDate").val();
        
        if(this.todate == null || this.todate == '' || this.todate == undefined)
           this.changetoDate = this.for_change_to_date
        else
           this.changetoDate = this.todate;
        
        var toPassDate = '';
        console.log("This change to date "+this.changetoDate);

        var toformatDate = new Date(this.changetoDate),
        fmnth1 = ("0" + (toformatDate.getMonth() + 1)).slice(-2),
        fday1 = ("0" + toformatDate.getDate()).slice(-2);
        toPassDate = [toformatDate.getFullYear(), fmnth1, fday1].join("-");

        var formData = new FormData();
        //formData.append('type',"3D");
        formData.append('max_amt',this.amount);
        formData.append('status',this.threedbetDTO.status);
        formData.append('number',this.selectNum.toString());
        //formData.append('from_date',this.fromdate);
       // formData.append('to_date',this.todate);//toPassDate
       
        console.log("To date is "+ toPassDate)
        this.http.post(this.funct.ipaddress + 'betamountLimitation/threedsave', formData, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         ).subscribe( 
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
            }
          );
    
  }

  edit() {
    this.spinner.show();
    if (this.threedbetDTO.amount != null) {
      if (this.threedbetDTO.number != null) {

        var number = this.threedbetDTO.number;
        if (number.toString().length == 2) {
          this.threedbetDTO.number = '0' + number;
        }

        if (this.threedbetDTO.number != '') {
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', 'ITW ' + this.token);

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
          forFromDate = yearStr + '-' + monthStr + '-' + dayStr;
          this.threedbetDTO.fromDate = forFromDate;
          var b = this.changetoDate;
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
          forToDate = tyearStr + '-' + tmonthStr + '-' + tdayStr;
          this.threedbetDTO.toDate = forToDate;

          console.log("ResultDTO: " + JSON.stringify(this.threedbetDTO));
          this.http.post(this.funct.ipaddress + 'threedbetamountlimit/edit', this.threedbetDTO, { headers: headers }).subscribe( //change
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.message.code == '200') {
                this.spinner.hide();
                this.router.navigate(['/twod-list']).then(() => {
                  this.toastr.success(this.dto.Response.message.message, 'Success!', {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter amount', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }
  goCancel() {
    if(this.threedbetId == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }
  cancel(){
    this.threedbetDTO = {
      id: 0,
      number: '',
      amount: '',
      fromDate: '',
      toDate: '',
    }
  }

  editCancel(){
    this.getResultById();
  }

  threeDSelect(data, index) {
    for (let i = 0; i < this.threedbetnumber.length; i++) {
      if (this.threedbetnumber[i].number == data.number) {
        this.threedbetnumber[i].flag = !this.threedbetnumber[i].flag;
        if (this.threedbetnumber[i].buttonColor == '#d1cccc' && this.threedbetnumber[i].textcolor == '#313131') {
          this.threedbetnumber[i].buttonColor = '#2456A6'
          this.threedbetnumber[i].textcolor = '#ffffff'
        } else {
          this.threedbetnumber[i].buttonColor = '#d1cccc'
          this.threedbetnumber[i].textcolor = '#313131'
        }
      }
    }
    this.selectedData();
  }

  selectedData() {
    this.selectNum = [];
    for (let i = 0; i < this.threedbetnumber.length; i++) {
      if (this.threedbetnumber[i].flag) {
        this.selectNum.push(this.threedbetnumber[i].number);
      }
    }
    console.log("this.selectNum" + JSON.stringify(this.selectNum));
  }


}
