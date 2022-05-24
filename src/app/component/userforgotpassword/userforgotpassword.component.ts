import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctService } from '../../service/funct.service';
import { DtoService } from '../../service/dto.service';
import { DatePipe } from '@angular/common'

import { Subject } from 'rxjs';

@Component({
  selector: 'app-userforgotpassword',
  templateUrl: './userforgotpassword.component.html',
  styleUrls: ['./userforgotpassword.component.css']
})
export class UserforgotpasswordComponent implements OnInit {

  constructor(private storage: LocalStorageService,private datepipe: DatePipe, private toastr: ToastrService,private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,)
    { 
      this.getAllPendingForgotPasswordRequest();
    }
    fromdate: string ='';
    todate: string = '';
    phoneNo: any;
    pendingList: any;
  ngOnInit(): void {
  }
  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
    //  $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
     // var id = 'tblUser' + this.idIndex;
      //var table = $('#' + id).DataTable();
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
    return throwError(error);
    }

    search(){
      this.spinner.show();
      this.pendingList = []; 
      this.getAllPendingForgotPasswordRequest();
    }
  getAllPendingForgotPasswordRequest()
  {
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token);
    let params = new HttpParams();
    this.fromdate =  this.datepipe.transform($("#fromDate").val(),'yyyy-MM-dd');  
    this.todate =  this.datepipe.transform($("#toDate").val(),'yyyy-MM-dd');  
    this.phoneNo = $("#phoneno").val();
    params = params .set('requestStatus','0').set('phoneno',this.phoneNo) 
    .set('fromDate',this.fromdate)
    .set('toDate',this.fromdate);
  
	  this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordGetAllRequestData', { params: params, headers: headers } )
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(  
      result => {
        this.dto.Response = {};
        this.dto.Response = result; 
        this.pendingList = this.dto.Response;
        this.spinner.hide(); 
      }
    );  
  }
}
