import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
declare var $: any;

@Component({
  selector: 'app-ads-detail',
  templateUrl: './ads-detail.component.html',
  styleUrls: ['./ads-detail.component.css']
})
export class AdsDetailComponent implements OnInit {

  adsDTO: any;
  token: any;
  adsId: any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  name : any;
  imageUrL : any;
  linkUrl : any;
  content : any;
  gameproviderList : any;
  providerId : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) {
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

    this.adsId = this.route.snapshot.paramMap.get("id");
    if (this.adsId == null) {
      $(document).ready(function () {
        $('#updatedata').hide();
      });
      this.adsDTO = {
        id: 0,
        accountNo: '',
        type: 'linkurl',
        status: 'ACTIVE',
        image: '',
        name : '',
        createdDate: '',
        createdBy: '',
        modifiedDate: '',
        modifiedBy: '',
        image64BaseData :'',
        gameProviderId:'',
        imageType :''
      };
    }
    else {
      $(document).ready(function () {
        $('#updatedata').show();
      });
      this.adsDTO = {
        id: 0,
        accountNo: "",
        type: "",
        status: "",
        image: "",
        name : '',
        createdDate: "",
        createdBy: "",
        modifiedDate: "",
        modifieddBy: "",
        image64BaseData:'',
        gameProviderId:''
      };
      this.getAdsById();
    }
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
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
      this.toastr.error("Please choose game provider or blank space for home", 'Invalid!', {
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
       });
    }

  getAdsById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.adsId);
    this.http.get(this.funct.ipaddress + 'ads/GetAdsDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adsDTO = this.dto.Response;
        if (this.adsDTO.imageUrl != null || this.adsDTO.imageUrl != '') {
          this.imgURL = this.adsDTO.imageUrl;
        }
      });
  }

  flagProvider()
  {
      this.providerId = $("#providerId").val();
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
    }
  }

  goSave() {
    if (this.adsId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

   save() {
     this.spinner.show();
      if (this.adsDTO.status != '') {
        if (this.imgURL == '' || this.imgURL == null || this.imgURL == undefined) {
          this.spinner.hide();
          this.toastr.error('Please upload image.', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
        else {
            this.token = this.storage.retrieve('token');
            let headers = new HttpHeaders();
            headers = headers.set('Authorization',  this.token);
        
            if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
              if(this.imgURL.includes('data:image/jpg;base64,'))
              {
                this.adsDTO.imageUrl = this.imgURL.replace("data:image/jpg;base64,","");
                this.adsDTO.imageType = ".jpg";
              }
            if(this.imgURL.includes('data:image/jpeg;base64,'))
            {
              this.adsDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
              this.adsDTO.imageType = ".jpeg";
            }
            if(this.imgURL.includes('data:image/png;base64,')){
              this.adsDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
              this.adsDTO.imageType = ".png";
            }
            if(this.imgURL.includes('data:image/gif;base64,')){
              this.adsDTO.imageUrl = this.imgURL.replace("data:image/gif;base64,","");
              this.adsDTO.imageType = ".gif";
            }
          }
          if(this.adsDTO.name == '' || this.adsDTO.name == null || this.adsDTO.name == undefined)
          {
            this.spinner.hide();
            this.toastr.error('Please enter ads name.', 'Invalid input!', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
            });
          }
          this.http.post(this.funct.ipaddress + 'ads/insert', this.adsDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe( 
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/ads-list']).then(() => {
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
      else {
        this.spinner.hide();
        this.toastr.error('Please choose status.', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }

  toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }

  edit() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
  
    headers = headers.set('Authorization', this.token);
    if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
      if(this.imgURL.includes('data:image/jpg;base64,'))
      {
        this.adsDTO.imageUrl = this.imgURL.replace("data:image/jpg;base64,","");
        this.adsDTO.imageType = ".jpg";
      }
      if(this.imgURL.includes('data:image/jpeg;base64,')){
        this.adsDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
        this.adsDTO.imageType = ".jpeg";
      }
      if(this.imgURL.includes('data:image/png;base64,')){
       this.adsDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
       this.adsDTO.imageType = ".png";
      }
      if(this.imgURL.includes('data:image/gif;base64,'))
      {
       this.adsDTO.imageUrl = this.imgURL.replace("data:image/gif;base64,","");
       this.adsDTO.imageType = ".gif";
      }
    }
    if(this.providerId == null || this.providerId == "" || this.providerId == undefined)
    {
      this.adsDTO.gameProviderId= this.adsDTO.gameProviderId;
    }
    else{
    this.adsDTO.gameProviderId = this.providerId;
    }
    this.http.post(this.funct.ipaddress + 'ads/update', this.adsDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/ads-list']).then(() => {
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
