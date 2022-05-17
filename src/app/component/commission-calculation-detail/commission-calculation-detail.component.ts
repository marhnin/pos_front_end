import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common'
import isFirstDayOfMonth from 'date-fns/fp/isFirstDayOfMonth/index';

declare var $: any;

@Component({
  selector: 'app-commission-calculation-detail',
  templateUrl: './commission-calculation-detail.component.html',
  styleUrls: ['./commission-calculation-detail.component.css']
})
export class CommissionCalculationDetailComponent implements OnInit {
  calculationId: any;
  comissionCalculationDTO: any;
  changedate: any;
  date1: any ;
  date2: any ;
  status: string = '';
  token: any;
  type : any;
  from_date : any;
  to_date: any;
  foruser : any;
  alldate: any;
  ftoday : any;
  ttoday : any;
  firstday : any;
  lastday : any;
  firstyear: any;
  firstmonth : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private datePipe: DatePipe,private funct: FunctService,private datepipe: DatePipe){
        
        this.from_date = new Date();
        console.log("this.fromdate>> " + this.from_date);
        this.ftoday = this.datepipe.transform(this.alldate, 'MMM dd, yyyy');
        console.log("this.alltodayDate>> " + this.ftoday);
    
    
        this.to_date = new Date();  //add this
        console.log("this.allltodate>> " + this.to_date);
        this.ttoday = this.datepipe.transform(this.to_date, 'MMM dd, yyyy');
        $("input[name='r3'][value='4']").prop("checked",true)

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
         this.firstday = new Date(curr.setDate(first)).getDate();
         this.firstyear = new Date(curr.setDate(first)).getFullYear();    
         this.lastday = new Date(curr.setDate(last)).getDate();
         this.firstmonth = new Date(curr.setDate(first)).getMonth();
         this.firstday = this.datePipe.transform(this.firstday,'yyyy-MM-dd');
        console.log(this.firstday);
        console.log(this.lastday);
        console.log(this.firstyear);
        console.log(this.firstmonth);
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
    this.calculationId = this.route.snapshot.paramMap.get("id");
    this.comissionCalculationDTO = {
        id: 0,
        from_date: '',
        to_date: '',
        foruser: '4',
        createdDate: '',
        createdBy: '',
        type :''
      };
  }


  goCommissionCalculationSave() {
      this.save();
  }

  save() {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      console.log("date is : "+this.comissionCalculationDTO.from_date)
    if(this.comissionCalculationDTO.foruser != '' && this.comissionCalculationDTO.from_date != null && this.comissionCalculationDTO.to_date != null)
      {
      this.http.post(this.funct.ipaddress + 'commission/saveCommission', this.comissionCalculationDTO, { headers: headers }).subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.spinner.hide();
            this.router.navigate(['/commission']).then(() => {
              this.toastr.success(this.dto.Response.message.message, 'Success!', {
                timeOut: 3000,
                positionClass: 'toast-top-right'
              });
            })
          }
          else if(this.dto.Response.message.code == '403'){
              this.spinner.hide();
              this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
          else
          {
              this.spinner.hide();
              this.toastr.error(this.dto.Response.message.message, 'Invalid!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
        }
      );
     }//if for user is null
   else{
     this.spinner.hide();
     this.toastr.error('Please choose valid input', 'Invalid input!', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  }
}
 /* edit() {
    this.spinner.show();
    if (this.comissionCalculationDTO.createdDate != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);

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
      this.comissionCalculationDTO.date = forDate;
      console.log("ResultDTO: " + JSON.stringify(this.comissionCalculationDTO));
      this.http.post(this.funct.ipaddress + 'commission/edit', this.comissionCalculationDTO, { headers: headers }).subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.spinner.hide();
            this.router.navigate(['/commission']).then(() => {
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
  } */

}

