import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute   } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
declare var $: any;

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {

  adminDTO: any;
  token: any;
  adminId: any;
  fieldTextType: boolean;
  confrimFieldTextType: boolean;
  roleList = [];
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, 
    private router: Router, private route: ActivatedRoute, private funct: FunctService) { 
      this.getAllRoles();
    }

  ngOnInit(): void {

    if(!this.storage.retrieve('loadFlag')){
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function(){
        location.reload();
      }, 1);
    }
    else{
      this.storage.clear('loadFlag');
    }

    this.adminId = this.route.snapshot.paramMap.get("id");
    if(this.adminId == null){
      $(document).ready(function () {
        $('#referralCode').remove();
        $('#updatedata').remove();
      });

      this.adminDTO = {
        id: 0,
        phoneNo: '',
        roleId: 0,
        roleName: '',
        name: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
        newPassword: '',
        balance: 0,
        referralCode: '',
        image: '',
        status: 'ACTIVE'
      }
    }
    else{
      $(document).ready(function () {
        $('#password').remove();
        $('#confirmPassword').remove();
        $('#updatedata').show();
      });
      this.adminDTO = {
        id: 0,
        phoneNo: '',
        roleId: 0,
        roleName: '',
        name: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
        newPassword: '',
        balance: 0,
        referralCode: '',
        image: '',
        status: 'ACTIVE'
      };
      this.getAdminById();
     
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
      this.toastr.error("Invalid Parameters.", 'Invalid!', {
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

  getAdminById(){
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id',this.adminId);
    this.http.get(this.funct.ipaddress + 'admin/GetDetail', {params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adminDTO = this.dto.Response;//.data.adminDTO;
      }
    );
  }

  getAllRoles() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.roleList = [];
    this.http.get(this.funct.ipaddress + 'admin/GetAllRoles', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.roleList = this.dto.Response;
        this.roleList.push("None");
      }
    );
  }

  flagRole(){
    this.adminDTO.role_id = $("#role_id").val();
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfrimFieldTextType() {
    this.confrimFieldTextType = !this.confrimFieldTextType;
  }

  goSave(){
    if(this.adminId == null){
      this.save();
    }
    else{
      this.edit();
    }
  }

  goCancel(){
    if(this.adminId == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }
  
  edit(){
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.http.post(this.funct.ipaddress + 'admin/update', this.adminDTO, {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/admin-list']).then(() => {
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
          })
        }
        else{
          this.spinner.hide();
          this.toastr.error(this.dto.Response.message, 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        }
      });
  }

  save(){
    this.spinner.show();
    let mobNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    if (mobNumberPattern.test(this.adminDTO.phone_no)) {
      if(this.adminDTO.password === this.adminDTO.confirmPassword){
        if(this.adminDTO.role_id != 0){
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          this.http.post(this.funct.ipaddress + 'Authenticate/adRegister', this.adminDTO, {headers: headers})
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe(
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/admin-list']).then(() => {
                  this.toastr.success(this.dto.Response.message, 'Success!', {
                    timeOut: 3000,
                    positionClass: 'toast-top-right'
                  });
                })
              }
              else{
                this.spinner.hide();
                this.toastr.error(this.dto.Response.message, 'Invalid!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
                });
              }
            }
          );
        }
        else{
          this.spinner.hide();
          this.toastr.error('Choose admin role', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      }
      else{
      this.spinner.hide();
      this.toastr.error('Password missmatch', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      }

    }
    else{
      this.spinner.hide();
      this.toastr.error('Please enter valid phone no.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  cancel(){
    this.adminDTO = {
      id: 0,
      phoneNo: '',
      roleId: 0,
      roleName: '',
      name: '',
      password: '',
      confirmPassword: '',
      oldPassword: '',
      newPassword: '',
      balance: 0,
      referralCode: '',
      image: '',
      status: 'ACTIVE'
    }
  }
  editCancel(){
    this.getAdminById();
  }
}
