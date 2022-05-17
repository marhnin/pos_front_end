import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare const getCurrentDate: any;
declare var $: any;

export class AppModule {
}
@Component({
  selector: 'app-user',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [DatePipe]

})
export class NotificationsComponent implements OnInit {
  title: string ='';
  body: string = '';
  dtTrigger: Subject<any> = new Subject();
  model : any;
  myDate = new Date();
  notiId : any;
  constructor( private route: ActivatedRoute,private toastr: ToastrService,private datePipe: DatePipe,private storage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService,) {
  
  }
  ngOnInit(): void {
    this.notiId = this.route.snapshot.paramMap.get("id");
    if (this.notiId == null) {
      $(document).ready(function () {
      });
      this.model = {
        //id: 0,
        title: '',
        type: 'Others',
        body: ''
      };
    }
    else {
      $(document).ready(function () {
      });
      this.model = {
        id: 0,
        title: '',
        type: 'Others',
        body: ''
      };
      this.getNotiById();
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

    getNotiById()
    {
      this.dto.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams();
      params = params.set('notiId', this.notiId);
      this.http.get(this.funct.ipaddress + 'notification/GetNotiByIdAdmin', { params: params, headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.model = this.dto.Response;
        });
    }

  sendNotifications(){
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.dto.token).set('Accept', 'application/json').set('Content-Type', 'application/json');
    let params = new HttpParams();
    var formData = new FormData();
    if(this.model.title == null || this.model.title == '' || this.model.title == 'undefined')
      {
          this.toastr.error("Please enter title", 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });  
          return; 
      }
      if(this.model.body == null || this.model.body == '' || this.model.body == 'undefined')
      {
          this.toastr.error("Please enter body", 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right'
          });  
          return; 
      }
    formData.append("title", this.model.title);
    formData.append("body", this.model.body);
    formData.append("type", this.model.type);
  //  params = params.set('title',this.title).set('message',this.body);
    this.http.post(this.funct.ipaddress + 'notification/SendOthersNoti',this.model,{headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
     .subscribe(data => {
      /*  this.toastr.success("success", 'Success!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });*/
          this.spinner.hide();
          this.router.navigate(['/notification']).then(() => {
            this.toastr.success("success", 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
        this.dtTrigger.next();
        this.spinner.hide();
        });
  }

  goSave() {
    if (this.notiId == null) {
      this.sendNotifications();
    }
    else {
      this.edit();
    }
  }

 
   edit() {
    if(this.model.title == null || this.model.title == undefined || this.model.title =="")
    {
      this.toastr.error("Please enter title", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    if(this.model.body == null || this.model.body == undefined || this.model.body =="")
    {
      this.toastr.error("Please enter title", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    var formData = new FormData();
    this.http.post(this.funct.ipaddress + 'notification/update', this.model, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/notification']).then(() => {
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
