import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe } from '@angular/common'
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { FunctService } from '../../service/funct.service';
import { DtoService } from '../../service/dto.service';
import { DomSanitizer } from '@angular/platform-browser'; //for unsafe image

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-userforgotpassworddetail',
  templateUrl: './userforgotpassworddetail.component.html',
  styleUrls: ['./userforgotpassworddetail.component.css']
})
export class UserforgotpassworddetailComponent implements OnInit {
  
  @ViewChild(DataTableDirective)
  phoneno: any;
  token: any;
  requestid: any;   
  adminId: null;   
  imgURL : any;
  message :any;
  imagePath: any; 
  requestDTO: any;
  requestStatus: any;
    
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, 
    private router: Router, private route: ActivatedRoute,private datepipe: DatePipe, private funct: FunctService,private sanitizer:DomSanitizer) {
      
   }

  ngOnInit(): void { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    }); 

    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 5);
    }
    else{
      this.storage.clear('loadFlag');
    }
    this.requestid = this.route.snapshot.paramMap.get("id"); 
    this.getDetail()
  }  
  getDetail()
  {
    this.spinner.show(); 
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams(); 
    params = params.set('id', this.requestid); 
    this.http.get(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordGetByRequestID', { params: params, headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result; 
        this.requestDTO = this.dto.Response;
        this.phoneno =  this.requestDTO.phone_no; 
        this.imgURL = this.sanitizer.bypassSecurityTrustUrl(this.requestDTO.imageUrl); 
        this.spinner.hide(); 
      });
  }

  ngAfterViewInit(){
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
    if(error.status == 400)
    {
      this.spinner.hide();
      this.toastr.error("Bad Request.", 'Invalid!', {
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
   
  approve(){ 
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
  
    var formData = new FormData();
   console.log("RequestID Value " + this.requestDTO.id);
   console.log("Phone No " + this.requestDTO.phone_no);

    formData.append("id", this.requestDTO.id);
    formData.append("phone_no", this.requestDTO.phone_no);
    formData.append("status", "1"); // 0 is for approve
    this.http.post(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordAdminProcess', formData,{ headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;  
        if (this.dto.Response.status == 'Success'){
          this.spinner.hide();
          this.router.navigate(['/userforgotpassword']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          });
        } 
      }
    ); 
  }
  reject(){
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
  
    var formData = new FormData();
   
    formData.append("id", this.requestDTO.id);
    formData.append("phone_no", this.requestDTO.phone_no);
    formData.append("status", "4"); // 4 is for reject
    this.http.post(this.funct.ipaddress + 'userforgotpassword/ForgotPasswordAdminProcess', formData,{ headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result; 
        if (this.dto.Response.status == 'Success'){
          this.spinner.hide();
          this.router.navigate(['/userforgotpassword']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          });
        }  
      }
    ); 
  }
  edit() {
     
  }
   
  editCancel() {
    //this.getUserById();
  } 

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    //  console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }  
  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true; 
  } 
}