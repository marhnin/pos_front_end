import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { from, throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

declare var $: any;

@Component({
  selector: 'app-gs-need-help-detail',
  templateUrl: './need-help-detail.component.html',
  styleUrls: ['./need-help-detail.component.css']
})
export class NeedHelpDetailComponent implements OnInit {

  gameDTO: any;
  gamPassDTO: any;
  token: any;
  needHelpId: any;
  imagePath: any;
  imgURL: any;
  imgURL1: any;
  message: string = '';
  count = 0;
  filePath : any;
  displayAcc : any;
  disableAccId : any;
  isMaintenance :boolean;
  filePath1 :any;
  message1: string = '';
  imagePath1: string = '';
  gameproviderList : any;
  providerId : any;
  needHelpDTO : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,) {
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
    this.needHelpId = this.route.snapshot.paramMap.get("id");
    if (this.needHelpId == null) {
      $(document).ready(function () {
      });
      this.needHelpDTO = {
        id: 0,
        status: 'ACTIVE',
        description_en :'',
        description_my :'',
        description_zh :'',
        description_th :'',
        title_en :'',
        title_my :'',
        title_zh :'',
        title_th :'',
        websitelink : ''
      };
    }
    else {
      $(document).ready(function () {
      });
      this.needHelpDTO = {
        id: 0,
        status: '',
        description_en :'',
        description_my :'',
        description_zh :'',
        description_th :'',
        title_en :'',
        title_my :'',
        title_zh :'',
        title_th :'',
        websitelink : ''
      };
      this.getNeedHelpById();
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

    getNeedHelpById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.needHelpId);
    this.http.get(this.funct.ipaddress + 'needHelp/getNeedHelpDetail', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.needHelpDTO = this.dto.Response;
      });
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
    this.filePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }

  preview1(files) {
    if (files.length === 0)
      return;
    var mimeType1 = files[0].type;
    if (mimeType1.match(/image\/*/) == null) {
      this.message1 = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath1 = files;
    this.filePath1 = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL1 = reader.result;
      console.log("imgURL1111>>>" + JSON.stringify(this.imgURL1));
    }
  }

  goSave() {
    if (this.needHelpId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }
   save() 
   {
     if(this.needHelpDTO.title_en == ""  || this.needHelpDTO.title_en == null || this.needHelpDTO.title_en == undefined)
     {
      this.toastr.error("Please enter title(English)", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
     }
     if(this.needHelpDTO.description_en == ""  || this.needHelpDTO.description_en == null || this.needHelpDTO.description_en == undefined)
     {
      this.toastr.error("Please enter Description(English)", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;
     }
         this.spinner.show();
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          console.log("request need help/save " + JSON.stringify(this.needHelpDTO));
          this.http.post(this.funct.ipaddress + 'needHelp/insert', this.needHelpDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe(
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/needhelp']).then(() => {
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

  /*XXXXX*/
  edit() {

    if(this.needHelpDTO.title_en == ""  || this.needHelpDTO.title_en == null || this.needHelpDTO.title_en == undefined)
    {
     this.toastr.error("Please enter title(English)", 'Invalid!', {
       timeOut: 3000,
       positionClass: 'toast-top-right',
     });
     return;
    }
    if(this.needHelpDTO.description_en == ""  || this.needHelpDTO.description_en == null || this.needHelpDTO.description_en == undefined)
    {
     this.toastr.error("Please enter Description(English)", 'Invalid!', {
       timeOut: 3000,
       positionClass: 'toast-top-right',
     });
     return;
    }
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.needHelpDTO.id = this.needHelpId;
    this.http.post(this.funct.ipaddress + 'needHelp/update', this.needHelpDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/needhelp']).then(() => {
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

  flagProvider()
  {
      this.providerId = $("#providerId").val();
  }
}
