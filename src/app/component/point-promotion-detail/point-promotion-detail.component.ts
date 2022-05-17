import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';

declare var $: any;


@Component({
  selector: 'app-point-promotion-detail',
  templateUrl: './point-promotion-detail.component.html',
  styleUrls: ['./point-promotion-detail.component.css']
})
export class PointPromotionDetailComponent implements OnInit {

  token : any;
  promotionUserType : any;
  pointId : any;
  pointPromotionModel : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,) { 

    }

  ngOnInit(): void {
    this.pointId = this.route.snapshot.paramMap.get("id");
    this.promotionUserType = {
      userType : '',
      id : ''
    }
    this.pointPromotionModel = {
        status :'',
        userType :'',
        percentage :0,
        startedAmount :0,
        id :0
    }
    this.getPointPromotionById();
    this.getPointPromotionUserType();
  
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

  getPointPromotionById()
  {
        this.token = this.storage.retrieve('token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization',  this.token);
        let params = new HttpParams();
        params = params.set('id', this.pointId);
        this.http.get(this.funct.ipaddress + 'point-promotion/GetPointPromotionById', { params : params, headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
        )
        .subscribe( 
          result => 
          {
            this.dto.Response = {};
            this.dto.Response = result;
            this.pointPromotionModel = this.dto.Response;
          });
  }
  getPointPromotionUserType()
   {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      this.http.get(this.funct.ipaddress + 'point-promotion/GetAllPromotionUserType', { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => 
        {
          this.dto.Response = {};
          this.dto.Response = result;
          this.promotionUserType = this.dto.Response;
        });
   }

   goSave()
   {
      this.spinner.show();
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      this.pointPromotionModel.id = this.pointId;
      if(this.pointPromotionModel.percentage == null || this.pointPromotionModel.percentage == 0 || this.pointPromotionModel.percentage == '' || this.pointPromotionModel.percentage == undefined)
      {
        this.spinner.hide();
        this.toastr.error("Please enter percentage value.", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
          return;
      }
      if(this.pointPromotionModel.fromAmount == null || this.pointPromotionModel.fromAmount == 0 || this.pointPromotionModel.fromAmount == '' || this.pointPromotionModel.fromAmount == undefined)
      {
        this.spinner.hide();
        this.toastr.error("Please enter from amount.", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
          return;
      }

      if(this.pointPromotionModel.toAmount == null || this.pointPromotionModel.toAmount == 0 || this.pointPromotionModel.toAmount == '' || this.pointPromotionModel.toAmount == undefined)
      {
        this.spinner.hide();
        this.toastr.error("Please enter to amount.", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
          return;
      }

      this.http.post(this.funct.ipaddress + 'point-promotion/editPointPromotion', this.pointPromotionModel, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/point-promotion']).then(() => {
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
        }
      );
   
   }
}
