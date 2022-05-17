import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
declare var $: any;

@Component({
  selector: 'app-changepassword-detail',
  templateUrl: './changepassword-detail.component.html',
  styleUrls: ['./changepassword-detail.component.css']
})
export class ChangepasswordDetailComponent implements OnInit {

  adminDTO: any;
  token: any;
  adminId: any;
  oldFieldTextType: boolean;
  newFieldTextType: boolean;
  confrimFieldTextType: boolean;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService) 
    { }

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

    this.adminId = this.route.snapshot.paramMap.get("id");
    if (this.adminId != null) {
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
    return throwError(error);
    }
    OkLogout()
    {
      window.location.href ="./ad-login";
    } 

  getAdminById(){
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
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

  toggleOldFieldTextType() {
    this.oldFieldTextType = !this.oldFieldTextType;
  }

  toggleNewFieldTextType(){
    this.newFieldTextType = !this.newFieldTextType;
  }

  toggleConfrimFieldTextType() {
    this.confrimFieldTextType = !this.confrimFieldTextType;
  }

  goSave() {
    this.spinner.show();
    if (this.adminDTO.newPassword === this.adminDTO.confirmPassword) {
      if (this.adminDTO.roleId != 0) {
        this.token = this.storage.retrieve('token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', this.token);
        const formData = new FormData();
        formData.append("newPassword",this.adminDTO.newPassword);
        formData.append("oldPassword",this.adminDTO.oldPassword)

        this.http.post(this.funct.ipaddress + 'admin/updatePassword', formData, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         )
        .subscribe(
          result => {  
            this.dto.Response = {};
            this.dto.Response = result;
            if (this.dto.Response.status == 'Success') {
              this.spinner.hide();
              this.router.navigate(['/ad-login']).then(() => {
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
        this.toastr.error('Choose admin role', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
    }
    else {
      this.spinner.hide();
      this.toastr.error('Password missmatch', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  editCancel(){
      if (this.adminId != null) {
      this.getAdminById();
    }
  }
  
   StrengthChecker() {
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    let PasswordParameter = this.adminDTO.newPassword;
    if(strongPassword.test(PasswordParameter)) {
      //  strengthBadge.style.backgroundColor = "green";
      $("#StrengthDisp").css('background-color','green');
      $('#StrengthDisp').html('Strong');
    } else if(mediumPassword.test(PasswordParameter)) {
      //  strengthBadge.style.backgroundColor = 'blue';
        $("#StrengthDisp").css('background-color','blue');
        $('#StrengthDisp').html('Medium');
    } else {
       // strengthBadge.style.backgroundColor = 'red';
        $("#StrengthDisp").css('background-color','red');
        console.log(PasswordParameter)
        $('#StrengthDisp').html('Weak');
    }
}
}
