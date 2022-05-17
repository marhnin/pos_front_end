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
  selector: 'app-twod-bet-amount-limitation-detail',
  templateUrl: './twod-bet-amount-limitation-detail.component.html',
  styleUrls: ['./twod-bet-amount-limitation-detail.component.css']
})
export class TwodBetAmountLimitationDetailComponent implements OnInit {

  amount: string = '';
  singleDate: string = '';
  time: string = '';
  twodbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  twodbetDTO: any;
  token: any;
  changeDate: any;
  type : any;
  status : any;
  section : any;
  myDate = new Date();
  for_date : any;
  for_format_date : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
      this.for_date = new Date();
      this.for_format_date = this.datepipe.transform(this.for_date, 'MMM dd, yyyy');
      this.time = 'AM';
    }

  ngOnInit(): void {
    this.twodbetnumber = [
      { betNo: '00', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, 
      { betNo: '01', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, 
      { betNo: '02', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '03', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '04', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '05', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '06', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '07', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '08', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '09', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '10', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '11', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '12', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '13', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '14', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '15', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '16', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '17', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '18', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '19', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '20', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '21', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '22', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '23', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '24', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '25', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '26', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '27', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '28', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '29', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '30', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '31', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '32', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '33', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '34', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '35', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '36', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '37', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '38', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '39', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '40', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '41', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '42', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '43', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '44', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '45', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '46', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '47', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '48', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '49', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '50', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '51', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '52', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '53', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '54', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '55', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '56', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '57', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '58', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '59', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '60', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '61', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '62', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '63', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '64', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '65', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '66', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '67', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '68', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '69', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '70', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '71', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '72', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '73', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '74', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '75', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '76', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '77', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '78', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '79', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '80', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '81', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '82', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '83', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '84', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '85', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '86', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '87', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '88', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '89', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '90', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '91', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '92', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '93', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, { betNo: '94', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '95', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: 'aa', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: 'aa', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: 'aa', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: 'aa', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '96', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
      { betNo: '97', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, 
      { betNo: '98', buttonColor: '#d1cccc', textcolor: '#313131', flag: false }, 
      { betNo: '99', buttonColor: '#d1cccc', textcolor: '#313131', flag: false },
    ];

    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload(true);
      }, 1);
    }
    else {
      this.storage.clear('loadFlag');
    }

    this.twodbetDTO = {
      id: 0,
      number: '',
      max_amt: '',
      date: '',
      section: '',
    };
  }
  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
      console.log("Sinlge date in on change : "+this.singleDate)
    });
  }
  selectAll()
  {
    for (let i = 0; i < this.twodbetnumber.length; i++) {
        this.twodbetnumber[i].flag = !this.twodbetnumber[i].flag;
        if (this.twodbetnumber[i].buttonColor == '#d1cccc' && this.twodbetnumber[i].textcolor == '#313131') {
          this.twodbetnumber[i].buttonColor = '#2456A6'
          this.twodbetnumber[i].textcolor = '#ffffff'
        } else {
          this.twodbetnumber[i].buttonColor = '#d1cccc'
          this.twodbetnumber[i].textcolor = '#313131'
        }
    }
    this.selectedData();
  }
  twoDSelect(data, index) {
    for (let i = 0; i < this.twodbetnumber.length; i++) {
      if (this.twodbetnumber[i].betNo == data.betNo) {
        this.twodbetnumber[i].flag = !this.twodbetnumber[i].flag;
        if (this.twodbetnumber[i].buttonColor == '#d1cccc' && this.twodbetnumber[i].textcolor == '#313131') {
          this.twodbetnumber[i].buttonColor = '#2456A6'
          this.twodbetnumber[i].textcolor = '#ffffff'
        } else {
          this.twodbetnumber[i].buttonColor = '#d1cccc'
          this.twodbetnumber[i].textcolor = '#313131'
        }
      }
    }
    this.selectedData();
  }

  selectedData() {
    this.selectNum = [];
    for (let i = 0; i < this.twodbetnumber.length; i++) {
    
      if (this.twodbetnumber[i].flag) {
        if(this.twodbetnumber[i].betNo != 'aa')
        {
        this.selectNum.push(this.twodbetnumber[i].betNo);
        }
      }
    }
    console.log("this.selectNum" + JSON.stringify(this.selectNum));
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
    return throwError(error);
    }
    OkLogout()
    {
      window.location.href ="./ad-login";
    } 
  apply() {

    if(this.amount == null || this.amount == '' || this.amount == 'undefined')
    {
      this.toastr.error("Please enter number", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
      return;
    }
    
    if(this.selectNum.length == 0)
    {
      this.toastr.error("Please select number", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
      return;
    }
   
    this.spinner.show();
    if (this.amount != null) {
      if (this.singleDate != null) {
        if (this.time != null) {
          this.token = this.storage.retrieve('token');
          console.log("single date" +this.singleDate)
          let headers = new HttpHeaders();
          headers = headers.set('Authorization',  this.token);
          this.singleDate = $("#singleDate").val();
          console.log("Single date in apply dte is  : "+this.singleDate)
          if(this.singleDate == null || this.singleDate == '' || this.singleDate == undefined)
            this.changeDate = this.for_format_date;
          else
            this.changeDate = this.singleDate;

            console.log("Chagne dte is  : "+this.changeDate)
          var formatDate = new Date(this.changeDate),
          fmnth = ("0" + (formatDate.getMonth() + 1)).slice(-2),
          fday = ("0" + formatDate.getDate()).slice(-2);
          var forDate = '';
          forDate = [formatDate.getFullYear(), fmnth, fday].join("-");
          this.twodbetDTO.date = forDate;   //date
          this.twodbetDTO.time = this.time;   //time
          this.twodbetDTO.amount = this.amount;   //amount

         /* this.selectNum = [];
          for (let i = 0; i < this.twodbetnumber.length; i++) {
            if (this.twodbetnumber[i].flag) {
              this.selectNum.push(this.twodbetnumber[i].betNo);
            }
          }*/
          this.twodbetDTO.betNo = this.selectNum;   
          var formData = new FormData();
          formData.append('id',"0");
          formData.append('type',"2D");
          formData.append('max_amt',this.amount);
          formData.append('status',"ACTIVE");
          formData.append('number',this.selectNum.toString());
          formData.append('section',this.time);
          formData.append('date',forDate);
          console.log("For date is : "+forDate);
          this.http.post(this.funct.ipaddress + 'betamountLimitation/twodsave', formData, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe( 
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/twod-bet-amount-limitation-list']).then(() => {
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
          this.toastr.error('Please enter time', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
      else {
        this.spinner.hide();
        this.toastr.error('Please enter date', 'Invalid input!', {
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
 
}
