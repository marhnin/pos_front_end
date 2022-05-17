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
  templateUrl: './discount-detail.component.html',
  styleUrls: ['./discount-detail.component.css']
})
export class DiscountDetailComponent implements OnInit {

  id: any;
  discountDTO: any;
  status: string = '';
  token: any;
  type : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { }

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

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id == null) {
      this.discountDTO = {
        id: 0,
        betType: '',
        discount_percent: '',
        status: 'ACTIVE',
        limitedAmt :''
      };
    }
    else {
      this.discountDTO = {
        id: 0,
        betType: '',
        discount_percent: '',
        updated_by_name: '',
        updated_date: '',
        limitedAmt :''
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
    params = params.set('id', this.id);
    
    this.http.get(this.funct.ipaddress + 'betdiscount/GetBetDiscountDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.discountDTO = this.dto.Response; 
      }
    );
  }

  onChangeDate() {
    $(document).ready(function () {
      this.date = $("#date").val();
    });
  }

  goOddSave() {
    if (this.id == null) {
     
    }
    else {
      this.edit();
    }
  }

  edit() {
    this.spinner.show();
    if (this.discountDTO.discount_percent != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);

      this.http.post(this.funct.ipaddress + 'betdiscount/update', this.discountDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( //change
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/discount-entry']).then(() => {
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
      this.toastr.error('Please enter discount percentage', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  goCancel() {
    if(this.id == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }

  cancel(){
    this.discountDTO = {
      id: 0,
      betType: '',
      discount_percent: '',
      status: ''

    };
  }
  
  editCancel(){
    this.getResultById();
  }
}
