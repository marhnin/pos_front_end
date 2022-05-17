import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { from } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-dream-book-update',
  templateUrl: './dream-book-update.component.html',
  styleUrls: ['./dream-book-update.component.css']
})
export class DreamBookUpdateComponent implements OnInit {
  amount: string = '';
  singleDate: string = '';
  time: string = '';
  twodbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  dreamBookDTO: any;
  token: any;
  changeDate: any;
  type : any;
  status : any;
  section : any;
  betLimitId : any;
  imgURL : any;
  message : any;
  imagePath : any;
  filePath : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
    
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

    this.dreamBookDTO = {
      id: 0,
      number: '',
      max_amt: '',
      status: ''
    };
    this.betLimitId = this.route.snapshot.paramMap.get("id");
    this.getBetLimitById();
  }

  onChangeSingle() {
    $(document).ready(function () {
      this.singleDate = $("#singleDate").val();
    });
  }
 
  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.spinner.hide();
     // $("#deleteData1").modal("show");
    }
    if(error.status == 403)
    {
      this.spinner.hide();
      this.toastr.error("Limited Access.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
  }
  
  getBetLimitById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.betLimitId);
    this.http.get(this.funct.ipaddress + 'dreamBook/GetDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.dreamBookDTO = this.dto.Response;
        if (this.dreamBookDTO.imageUrl != null || this.dreamBookDTO.imageUrl != '') {
          this.imgURL = this.dreamBookDTO.imageUrl;
          console.log("imgURL getResultById>>>" + this.imgURL);
        }
      });
  }
  edit()
  {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      if (this.imgURL == '' || this.imgURL == null || this.imgURL == undefined) {
        this.toastr.error('Please upload image', 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
      this.spinner.hide();
      return;
     }
      if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
        if(this.imgURL.includes('data:image/jpeg;base64,'))
           this.dreamBookDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
        if(this.imgURL.includes('data:image/png;base64,'))
           this.dreamBookDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
      }
      this.http.post(this.funct.ipaddress + 'dreamBook/update', this.dreamBookDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/dream-book']).then(() => {
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
}
