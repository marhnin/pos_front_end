import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import {PaymentDetailModel} from './awc-game-detail.model';
import { FunctService } from '../../service/funct.service';
declare var $: any;

@Component({
  selector: 'app-awc-game-detail',
  templateUrl: './awc-game-detail.component.html',
  styleUrls: ['./awc-game-detail.component.css']
})
export class AWCGameDetailComponent implements OnInit {

  gameDTO: any;
  token: any;
  gameId: any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  count = 0;
  filePath : any;
  displayAcc : any;
  disableAccId : any;
  detailList : Array<PaymentDetailModel> = []; //list
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,) {
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
    this.gameId = this.route.snapshot.paramMap.get("id");
    if (this.gameId == null) {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        gameName: '',
        gameType: '',
        gameCode: '',
        imgUrl: '',
        platform: '',
        description: '',
        description_my: '',
        description_en: '',
        description_th : '',
        description_zh : '',
      };
    }
    else {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        gameName: '',
        gameType: '',
        gameCode: '',
        imgUrl: '',
        platform: '',
        description: '',
        description_my: '',
        description_en: '',
        description_th : '',
        description_zh : '',
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
    return throwError(error);
    }
    OkLogout()
    {
      window.location.href ="./ad-login";
    } 

    getGameById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.gameId);
    this.http.get(this.funct.ipaddress + 'game/GetDetaiList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.gameDTO = this.dto.Response;
        if (this.gameDTO.imgUrl != null || this.gameDTO.imgUrl != '') {
          this.imgURL = this.gameDTO.imgUrl;
          console.log("imgURL getResultById>>>" + JSON.stringify(this.imgURL));
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
    console.log("File path is : "+files[0])
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log("imgURL>>>" + JSON.stringify(this.imgURL));
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

   save() {
         this.spinner.show();
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
            if(this.imgURL.includes('data:image/jpeg;base64,'))
               this.gameDTO.imgUrl = this.imgURL.replace("data:image/jpeg;base64,","");
            if(this.imgURL.includes('data:image/png;base64,'))
               this.gameDTO.image_url = this.imgURL.replace("data:image/png;base64,","");
          }
          console.log("request game/save " + JSON.stringify(this.gameDTO));
          this.http.post(this.funct.ipaddress + 'game/insert', this.gameDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe( //change
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/game-list']).then(() => {
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

  edit() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    var acc_arrays =[];
    console.log(this.imgURL);
    if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
    if(this.imgURL.includes('data:image/jpeg;base64,'))
     this.gameDTO.imgUrl = this.imgURL.replace("data:image/jpeg;base64,","");
     if(this.imgURL.includes('data:image/png;base64,'))
     this.gameDTO.imgUrl = this.imgURL.replace("data:image/png;base64,","");
    }
    this.http.post(this.funct.ipaddress + 'game/update', this.gameDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/game-list']).then(() => {
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
