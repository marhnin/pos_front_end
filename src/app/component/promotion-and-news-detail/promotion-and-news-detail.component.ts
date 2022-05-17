import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';

import { from } from 'rxjs';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { isThisISOWeek } from 'date-fns';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-promotion-and-news-detail',
  templateUrl: './promotion-and-news-detail.component.html',
  styleUrls: ['./promotion-and-news-detail.component.css']
})
export class PromotionAndNewsDetailComponent implements OnInit {

  promoId: any;
  promoDTO: any;
  changeforDate: any;
  forDate: string = '';
  token: any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  uiDisable: any = true;
  isChecked: any = false;

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

    this.promoId = this.route.snapshot.paramMap.get("id");
    if (this.promoId == null) {
      this.uiDisable = true;
      this.promoDTO = {
        title: '',
        brief: '',
        description: '',
        imageUrl: '',
        url: '',
        type: '',
        odd: '',
        for_date_time: '',
        status: 'ACTIVE'
      };
    }
    else {
      this.promoDTO = {
        id: 0,
        title: '',
        brief: '',
        description: '',
        image: '',
        url: '',
        type: '',
        odds: '',
        forDate: '',
        checkStatus: '',
        status: 'ACTIVE'
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
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('id', this.promoId);
    this.http.get(this.funct.ipaddress + 'promotion/GetPromotionDetailAdmin', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.promoDTO = this.dto.Response;

        if (this.promoDTO.for_date_time == null || this.promoDTO.for_date_time == '') {
          this.changeforDate = this.promoDTO.for_date_time;
        } else {
          this.changeforDate = new Date(this.promoDTO.for_date_time);
          console.log("this.changeforDate >> " + JSON.stringify(this.changeforDate));
        }
         console.log(this.promoDTO.type)
        if (this.promoDTO.type == '2D' || this.promoDTO.type == '3D') {
          this.uiDisable = false;
          this.isChecked = true;
        }
        else {
          this.uiDisable = true;
          this.isChecked = false;
        }

        if (this.promoDTO.imageUrl != null || this.promoDTO.imageUrl != '') {
          this.imgURL = this.promoDTO.imageUrl;
          console.log("imgURL getResultById>>>" + JSON.stringify(this.imgURL));
        }
      });
  }

  onChangeToDate() {
    $(document).ready(function () {
      this.forDate = $("#forDate").val();
    });
  }

  onclickChanged(evt) {
    var target = evt.target;
    if (target.checked) {
      this.uiDisable = false;
      this.isChecked = true;
    }
    else {
      this.uiDisable = true;
      this.isChecked = false;
    }
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
      console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }

  goSave() {
    if (this.promoId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show();
    if (this.promoDTO.title != '') {
      if (this.promoDTO.brief != '') {

        if (this.imgURL == '' || this.imgURL == null || this.imgURL == undefined) {
          this.spinner.hide();
          this.toastr.error('Please upload image.', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
          return;
          
        }
        this.token = this.storage.retrieve('token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization',  this.token);

        if (this.changeforDate != null || this.changeforDate != undefined) {
          var a = this.changeforDate;
          console.log("Date1: " + a.getUTCDate());
          a.setDate(a.getDate() + 1);
          console.log("Date: " + a);
          var date = a.getUTCDate();
          console.log("day: " + date);
          var month = a.getUTCMonth() + 1;
          var year = a.getUTCFullYear();
          var monthStr = '';
          var dayStr = '';
          var yearStr = '';
          var forDate = '';
          if (date.toString().length > 1) {
            dayStr = '' + date;
          }
          else {
            dayStr = '0' + date;
          }

          if (month.toString().length > 1) {
            monthStr = '' + month;
          }
          else {
            monthStr = '0' + month;
          }

          yearStr = '' + year;
          forDate = yearStr + '-' + monthStr + '-' + dayStr;
          this.promoDTO.for_date_time = forDate;
        }
        else
          this.promoDTO.for_date_time = null;

        if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
          if(this.imgURL.includes('data:image/jpeg;base64,'))
            this.promoDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
          if(this.imgURL.includes('data:image/png;base64,'))
            this.promoDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
        }

        if (this.isChecked) {
         // this.promoDTO.checkStatus = "check";
        }
        else {
         // this.promoDTO.checkStatus = "uncheck";
        }
       if(this.promoDTO.type == 'undefinded' || this.promoDTO.type == '' || this.promoDTO.type == undefined)
          this.promoDTO.type = null;
      if(this.promoDTO.odd == 'undefinded' || this.promoDTO.odd == '' || this.promoDTO.odd == undefined)
          this.promoDTO.odd = 0;
       if(this.promoDTO.d == 'undefinded' || this.promoDTO.type == '' || this.promoDTO.type == undefined)
          this.promoDTO.type = null;

        console.log("this.promoDTO>> " + JSON.stringify(this.promoDTO));
        this.http.post(this.funct.ipaddress + 'promotion/insert', this.promoDTO, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         )
        .subscribe( //change
          result => {
            this.dto.Response = {};
            this.dto.Response = result;
            if (this.dto.Response.status == 'Success') {
              this.spinner.hide();
              this.router.navigate(['/promotion-and-news-list']).then(() => {
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
        // }
        // else {
        //   this.spinner.hide();
        //   this.toastr.error('Please one enter description or url.', 'Invalid input!', {
        //     timeOut: 3000,
        //     positionClass: 'toast-top-right',
        //   });
        // }
      }
      else {
        this.spinner.hide();
        this.toastr.error('Please enter brief.', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }
    else {
      this.spinner.hide();
      this.toastr.error('Please enter title.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);

    if (this.changeforDate != null || this.changeforDate != undefined) {
      var a = this.changeforDate;
      console.log("Date1: " + a.getUTCDate());
      a.setDate(a.getDate() + 1);
      console.log("Date: " + a);
      var date = a.getUTCDate();
      console.log("day: " + date);
      var month = a.getUTCMonth() + 1;
      var year = a.getUTCFullYear();
      var monthStr = '';
      var dayStr = '';
      var yearStr = '';
      var forDate = '';
      if (date.toString().length > 1) {
        dayStr = '' + date;
      }
      else {
        dayStr = '0' + date;
      }

      if (month.toString().length > 1) {
        monthStr = '' + month;
      }
      else {
        monthStr = '0' + month;
      }

      yearStr = '' + year;
      forDate = yearStr + '-' + monthStr + '-' + dayStr;
      this.promoDTO.forDate = forDate;
    }
   console.log(this.promoDTO.imageUrl)
    if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
      if(this.imgURL.includes('data:image/jpeg;base64,'))
        this.promoDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
     if(this.imgURL.includes('data:image/png;base64,'))
        this.promoDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
    }

    if (this.isChecked) {
      this.promoDTO.checkStatus = "check";
    }
    else {
      this.promoDTO.checkStatus = "uncheck";
    }

    this.http.post(this.funct.ipaddress + 'promotion/update', this.promoDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/promotion-and-news-list']).then(() => {
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

  goCancel() {
    if (this.promoId == null) {
      this.cancel();
    }
    else {
      this.editCancel();
    }
  }

  cancel() {
    this.promoDTO = {
      id: 0,
      title: '',
      brief: '',
      description: '',
      image: '',
      url: '',
      type: '',
      odds: '',
      forDate: '',
      selectnumber: '',
    };
  }

  editCancel() {
    this.getResultById();
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }

}
