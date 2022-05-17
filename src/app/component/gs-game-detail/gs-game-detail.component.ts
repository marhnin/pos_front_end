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
import { threadId } from 'worker_threads';
declare var $: any;

@Component({
  selector: 'app-gs-game-detail',
  templateUrl: './gs-game-detail.component.html',
  styleUrls: ['./gs-game-detail.component.css']
})
export class GSDetailGameComponent implements OnInit {

  gameDTO: any;
  token: any;
  gameId: any;
  imagePath: any;
  imgURL: any;
  imgURL1 : any;
  message: string = '';
  count = 0;
  filePath : any;
  displayAcc : any;
  disableAccId : any;
  isHot :any;

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
    this.gameId = this.route.snapshot.paramMap.get("id");
    console.log("game id is : "+this.gameId)
    if (this.gameId == null) {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        name: '',
        name_my: '',
        name_th: '',
        name_zh: '',
        type: '',
        code: '',
        iconurl: '',
        status: '',
        isHot:''
      };
    }
    else {
      $(document).ready(function () {
      });
      this.gameDTO = {
        id: 0,
        name: '',
        name_my: '',
        name_th: '',
        name_zh: '',
        type: '',
        code: '',
        iconurl: '',
        status: '',
        isHot:''
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
    this.http.get(this.funct.ipaddress + 'loginGS/GetGsDetaiList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.gameDTO = this.dto.Response;
        if (this.gameDTO.iconurl != null || this.gameDTO.iconurl != '') {
          this.imgURL = this.gameDTO.iconurl;
          if(this.gameDTO.isHot == 'true')
            {
             this.gameDTO.isHot = this.gameDTO.isHot;
            }
            else
           {
            this.gameDTO.isHot = "";
           }
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
          if(this.gameDTO.name == null || this.gameDTO.name == undefined || this.gameDTO.name =="")
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
          headers = headers.set('Authorization', this.token);
          if(this.imgURL != null)
          {
          if (this.imgURL != null || this.imgURL != '' ||  this.imgURL != undefined) {
            if(this.imgURL.includes('data:image/jpeg;base64,'))
               this.gameDTO.imgUrl = this.imgURL.replace("data:image/jpeg;base64,","");
            if(this.imgURL.includes('data:image/png;base64,'))
               this.gameDTO.image_url = this.imgURL.replace("data:image/png;base64,","");
          }
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

  /*XXXXX*/
  edit() {

    if(this.gameDTO.name == null || this.gameDTO.name == undefined || this.gameDTO.name =="")
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
     this.gameDTO.iconurl = this.imgURL.replace("data:image/jpeg;base64,","");
     if(this.imgURL.includes('data:image/png;base64,'))
     this.gameDTO.iconurl = this.imgURL.replace("data:image/png;base64,","");
    }
  }
    var formData = new FormData();
    formData.append("id",this.gameId)
    console.log("Game name "+this.gameDTO.name_my)
    if(this.gameDTO.name == null )
    formData.append("name","")
    else
    formData.append("name",this.gameDTO.name)
    
    formData.append("iconurl",this.gameDTO.iconurl)
    if(this.gameDTO.name_th == null)
     formData.append("name_th","")
    else
    formData.append("name_th",this.gameDTO.name_th)
    if(this.gameDTO.name_zh == null)
    formData.append("name_zh","")
    else
    formData.append("name_zh",this.gameDTO.name_zh)
    if(this.gameDTO.name_my == null)
    {
    formData.append("name_my","")
    console.log("null")
    }
    else
    formData.append("name_my",this.gameDTO.name_my)

    formData.append("status",this.gameDTO.status)
    formData.append("order_id",this.gameDTO.order_id)

    console.log("Is hot is "+this.gameDTO.isHot)
    
    if(this.gameDTO.isHot == null || this.gameDTO.isHot == 'undefined' || this.gameDTO.isHot == '')
      this.isHot = "";
    else
    formData.append("isHot",this.gameDTO.isHot)

    this.http.post(this.funct.ipaddress + 'loginGS/update', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/gs-game']).then(() => {
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
  checkUncheck()
  {
    if($("#foo_bar").is(':checked'))
     {
      this.isHot = 'true';
     }
    else
    {
      this.isHot = ''
    
    }
      
  }
}
