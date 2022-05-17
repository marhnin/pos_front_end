import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { NgxSpinnerService } from "ngx-spinner";

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {


  feedId: any;
  feedDTO: any;
  changeforDate: any;
  forDate: string = '';
  token: any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  uiDisable: any = true;

  constructor(private spinner: NgxSpinnerService, private storage: LocalStorageService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
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

    this.feedId = this.route.snapshot.paramMap.get("id");
    if (this.feedId != null) {

      // $(document).ready(function () {
      //   $("#phoneNo").prop('disabled', true);
      //   $("#createdDate").prop('disabled', true); 
      //   $("#createdBy").prop('disabled', true);
      // });

      this.feedDTO = {
        id: 0, 
        phoneNo: '', 
        title: '', 
        description: '', 
        createdBy: '', 
        createdDate: ''
      }
    this.getResultById();
  }
}

handleError(error: HttpErrorResponse){
  if(error.status == 423)
  {
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
  headers = headers.set('Authorization', this.token);
  let params = new HttpParams();
  params = params.set('id', this.feedId);
  this.http.get(this.funct.ipaddress + 'feedback/GetFeedbackDetailList', { params: params, headers: headers })
  .pipe(
    catchError(this.handleError.bind(this))
   )
  .subscribe( //change
    result => {
      console.log("response feedback/detail>> " + JSON.stringify(this.dto.Response))
      this.dto.Response = {};
      this.dto.Response = result;
      this.feedDTO = this.dto.Response;//.data.feedDTO;
    }
  );
}

}
