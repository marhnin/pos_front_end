



import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-confirguation-detail',
  templateUrl: './thai2d3d-confirguation-list.component.html',
  styleUrls: ['./thai2d3d-confirguation-list.component.css']
})
export class ConfirguationListComponent implements OnInit {

  id: any;
  confirguationDTO: any;
  changedate: any;
  date: string = '';
  status: string = '';
  token: any;
  type : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) {
      this.getResultById();
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

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id == null) {
      this.confirguationDTO = {
       // id: 0,
       // date: '',
       register_balance: '',
       // status: 'ACTIVE',
       // created_date: '',
       // createdBy: '',
      //  type :''
      };
    }
    else {
      this.confirguationDTO = {
        id: 0,
      //  date: '',
        register_balance: '',
       // status: 'ACTIVE',
       // created_date: '',
       // createdBy: '',
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
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    if(this.id == undefined)
        this.id = 0;
    params = params.set('id', this.id);
    console.log(this.id)
    this.http.get(this.funct.ipaddress + 'configuration/GetDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        if(this.dto.Response != null)
        {
          this.confirguationDTO = this.dto.Response;//.data.confirguationDTO; 
          this.id = this.confirguationDTO.id;//dto.Response.data.
        }
        else
        {
          this.confirguationDTO.register_balance = 0;
        }
      }
    );
  }

  onChangeDate() {
    $(document).ready(function () {
      this.date = $("#date").val();
    });
  }
  goConfigSave() {
    if (this.id == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show();
    if (this.confirguationDTO.register_balance != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      console.log("Save >>>>" +JSON.stringify(this.confirguationDTO))
      headers = headers.set('Authorization', this.token);
      this.http.post(this.funct.ipaddress + 'configuration/save', this.confirguationDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/confirguation-detail']).then(() => {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.spinner.show();
    if (this.confirguationDTO.description != '') {
      this.token = this.storage.retrieve('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.token);
      console.log("edit");
      console.log("ResultDTO: " + JSON.stringify(this.confirguationDTO));
      this.http.post(this.funct.ipaddress + 'configuration/update', this.confirguationDTO, { headers: headers })
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe(
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          if (this.dto.Response.status == 'Success') {
            this.spinner.hide();
            this.router.navigate(['/confirguation-detail']).then(() => {
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
    else {
      this.spinner.hide();
      this.toastr.error('Please enter number', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  goCancel() {
    if(this.id == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }

  cancel(){
    this.confirguationDTO = {
      id: 0,
      date: '',
      description: '',
      createdDate: '',
      createdBy: '',
    };
  }
  
  editCancel(){
    this.getResultById();
  }
}
