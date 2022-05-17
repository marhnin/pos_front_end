import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
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
  selector: 'app-point-promotion',
  templateUrl: './point-promotion.component.html',
  styleUrls: ['./point-promotion.component.css']
})
export class PointPromotionComponent implements OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  pointPromotionModel : any;
  
  token : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService,) 
    { 

    }

  ngOnInit(): void {
    this.getPointPercentage();
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

  getPointPercentage()
  {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      this.http.get(this.funct.ipaddress + 'point-promotion/GetAllPointPercentage', { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => 
        {
          this.dto.Response = {};
          this.dto.Response = result;
          this.pointPromotionModel = this.dto.Response;
          this.dtTrigger.next();
        });
   }

   
}
