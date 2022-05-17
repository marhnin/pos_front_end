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
  selector: 'app-gs-game-alert-detail',
  templateUrl: './game-alert-detail.component.html',
  styleUrls: ['./game-alert-detail.component.css']
})
export class GameAlertDetailComponent implements OnInit {

  gameDTO: any;
  gamPassDTO: any;
  token: any;
  gameId: any;
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

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,) {
      this.getAllProvider();
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
    this.gameId = this.route.snapshot.paramMap.get("id");
    if (this.gameId == null) {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        imageUrl: '',
        status: 'ACTIVE',
        providerId:0,
        description_en :'',
        description_my :'',
        description_zh :'',
        description_th :''
      };
    }
    else {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        imageUrl: '',
        status: '',
        providerId:0,
        description_en :'',
        description_my :'',
        description_zh :'',
        description_th :''
      };
      this.getGameById();
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
    if(error.status == 400)
    {
      this.spinner.hide();
      this.toastr.error("Please choose valid values.", 'Invalid!', {
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

    getAllProvider()
    {
     this.dto.token = this.storage.retrieve('token');
     let headers = new HttpHeaders();
     headers = headers.set('Authorization',  this.dto.token);
     this.http.get(this.funct.ipaddress + 'gameProvider/getGameProviderList', {headers: headers })
     .pipe(
       catchError(this.handleError.bind(this))
      )
     .subscribe(
       result => {
         this.dto.Response = {};
         this.dto.Response = result;
         this.gameproviderList = this.dto.Response;
         this.gameproviderList.push("None");
       });
    }

    getGameById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.gameId);
    this.http.get(this.funct.ipaddress + 'GameAlert/GetAlertDetail', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.gameDTO = this.dto.Response;
        if (this.gameDTO.imageUrl != null || this.gameDTO.imageUrl != '') {
          this.imgURL = this.gameDTO.imageUrl;
          console.log("imgURL getResultById>>>" + this.imgURL);
        }
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
    if (this.gameId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }
   save() 
   {
         this.spinner.show();
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          if(this.imgURL != null)
         {
          if (this.imgURL != null || this.imgURL != '' ||  this.imgURL != undefined) {
            if(this.imgURL.includes('data:image/jpeg;base64,'))
               this.gameDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
            if(this.imgURL.includes('data:image/png;base64,'))
               this.gameDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
          }
         } 
         if (this.providerId == null || this.providerId == '' || this.providerId == undefined)
         {
          this.spinner.hide();
          this.toastr.error("Please choose game provider.", 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            });
            return;
         }
         if(this.gameDTO.description_en == null || this.gameDTO.description_en == undefined || this.gameDTO.description_en =="")
         {
          this.spinner.hide();
           this.toastr.error("Please enter name (English)", 'Invalid!', {
             timeOut: 3000,
             positionClass: 'toast-top-right',
           });
           return;
         }
          this.gameDTO.providerId = this.providerId;
          console.log("request game alert/save " + JSON.stringify(this.gameDTO));
          this.http.post(this.funct.ipaddress + 'GameAlert/Add', this.gameDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe(
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/game-alert']).then(() => {
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

      if(this.gameDTO.description_en == null || this.gameDTO.description_en == undefined || this.gameDTO.description_en =="")
      {
        this.toastr.error("Please enter name (English)", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
        return;
      }
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    if(this.imgURL != null)
    {
      if (this.imgURL != null || this.imgURL != '' ||  this.imgURL != undefined) {
        if(this.imgURL.includes('data:image/jpeg;base64,'))
          this.gameDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
        if(this.imgURL.includes('data:image/png;base64,'))
        this.gameDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
      }
    }
    else
    {
        this.gameDTO.imageUrl = this.gameDTO.imageUrl;
    }
    this.gameDTO.id = this.gameId;
    this.http.post(this.funct.ipaddress + 'GameAlert/update', this.gameDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/game-alert']).then(() => {
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
