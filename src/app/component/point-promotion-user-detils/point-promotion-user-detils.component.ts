import { Router, NavigationEnd,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { DatePipe, NgStyle } from '@angular/common'
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
  selector: 'app-point-promotion-user-detils',
  templateUrl: './point-promotion-user-detils.component.html',
  styleUrls: ['./point-promotion-user-detils.component.css']
})
export class PointPromotionUserDetilsComponent implements OnInit {
 token : any;
 userId :any;
 userDTO :any;
 agentId: any;
 adminId : any;
 imgURL : any;
 isProfile : Boolean;
 agentList : any;
 editUserDTO : any;
 isAddSuccess : boolean;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, 
    private router: Router, private route: ActivatedRoute,private datepipe: DatePipe, private funct: FunctService,private sanitizer:DomSanitizer) { 
      this.isAddSuccess = false;
      console.log("Start >> "+this.isAddSuccess)
    }

  ngOnInit(): void {
    this.getActiveAgents();
    this.userId = this.route.snapshot.paramMap.get("id");
    this.getUserById();
  }

  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    this.isAddSuccess = false;
    if(error.status == 423)
    {
      this.spinner.hide();
      $("#deleteData").modal("show");
    }
    if(error.status == 403)
    {
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

  getUserById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.userId);
    this.http.get(this.funct.ipaddress + 'user/DetailsList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
          this.dto.Response = result;
          this.userDTO = this.dto.Response;
          this.agentId = this.userDTO.agent_id;
          this.adminId = this.userDTO.admin_id;
          if(this.userDTO.gs_game_deposit_balance != null)
          {
            this.userDTO.gs_game_deposit_balance = new Intl.NumberFormat().format(this.userDTO.gs_game_deposit_balance);
          }
          if(this.userDTO.gs_game_withdrawal_balance != null)
          {
            this.userDTO.gs_game_withdrawal_balance = new Intl.NumberFormat().format(this.userDTO.gs_game_withdrawal_balance);
          }
          if (this.userDTO.imageUrl != null) {
            let objectURL =  this.userDTO.imageUrl;
            this.imgURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.isProfile = true;
          }
          else
          {
            this.isProfile = false;
          }
          this.spinner.hide();
      }
    );
  }
  goSave() 
  {
   this.edit();
  }
  flagAgent()
  {

  }
  getActiveAgents() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    this.http.get(this.funct.ipaddress + 'agent/GetActiveAgents', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentList = this.dto.Response;
      }
    );
  }

  edit() {
    this.isAddSuccess = true;
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    var formData = new FormData();
    formData.append("ids",this.userId);
    this.http.post(this.funct.ipaddress + 'user/AddPointToMainWallet', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') 
        {
          this.spinner.hide();
          this.isAddSuccess = true;
          this.router.navigate(['/point-promotion-users-detail', this.userId]).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          //this.router.navigate(['action-selection'], { state: { example: 'bar' } });
         // window.location.href = window.location.href;
        }
        else {
          this.isAddSuccess = false;
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
    );
}
goReset()
{
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    var formData = new FormData();
    formData.append("userId",this.userId);
    formData.append("point_wallet",this.userDTO.point_wallet)
    this.http.post(this.funct.ipaddress + 'user/ResetPointWallet', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') 
        {
          this.spinner.hide();
          this.router.navigate(['/point-promotion-users-detail', this.userId]).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
          window.location.href = window.location.href;
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
