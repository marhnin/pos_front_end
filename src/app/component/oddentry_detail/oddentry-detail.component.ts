import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-oddentry-detail',
  templateUrl: './oddentry-detail.component.html',
  styleUrls: ['./oddentry-detail.component.css']
})
export class OddEntryDetailComponent implements OnInit {

  oddId: any;
  oddDTO: any;
  changedate: any;
  date: string = '';
  status: string = '';
  token: any;
  type : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { }

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

    this.oddId = this.route.snapshot.paramMap.get("id");
    if (this.oddId == null) {
      this.oddDTO = {
        id: 0,
        date: '',
        odd: '',
        status: 'ACTIVE',
        createdDate: '',
        createdBy: '',
        type :''
      };
    }
    else {
      this.oddDTO = {
        id: 0,
        date: '',
        odd: '',
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
    params = params.set('id', this.oddId);
    
    this.http.get(this.funct.ipaddress + 'odd/DetailById', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.oddDTO = this.dto.Response;//.data.oddDTO; 
        this.changedate = new Date(this.oddDTO.created_date_Str); 
      }
    );
  }

  onChangeDate() {
    $(document).ready(function () {
      this.date = $("#date").val();
    });
  }

  goOddSave()
  {
    if (this.oddId == null) 
    {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show();
    if (this.oddDTO.odd != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'ITW ' + this.token);
      this.http.post(this.funct.ipaddress + 'odd/save', this.oddDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( //change
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.spinner.hide();
            this.router.navigate(['/oddentry']).then(() => {
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

  edit() {
    this.spinner.show();
    if (this.oddDTO.description != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      var a = this.changedate;
      a.setDate(a.getDate() + 1);
      var date = a.getUTCDate();
      var month = a.getUTCMonth() + 1;
      var year = a.getUTCFullYear();
      var monthStr = '';
      var dayStr = '';
      var yearStr = '';
      var forDate = '';
      if (date.toString().length > 1)
       {
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
      this.oddDTO.date = forDate;
      this.oddDTO.number = this.oddDTO.number;
      console.log("ResultDTO: " + JSON.stringify(this.oddDTO));
      this.http.post(this.funct.ipaddress + 'odd/update', this.oddDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( //change
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/oddentry']).then(() => {
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
    if(this.oddId == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }

  cancel(){
    this.oddDTO = {
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
