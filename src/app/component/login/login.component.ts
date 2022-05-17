import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


import { DtoService } from '../../service/dto.service';
import { UtilService } from '../../service/util.service';
import { FunctService } from '../../service/funct.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 // phoneNo: any;
 // password: any;
 // AdminDTO: any;
   albumList : any;
  model :any;
  phone_no : any;
  password : any;
  token: any;
  errorMessage : any;
  mobNumberPattern = "^((\\+95-?)|0)?[0-9]{10}$";

  constructor(private toastr: ToastrService, private spinner: NgxSpinnerService, private dto: DtoService, private http: HttpClient, private util: UtilService, 
    private router: Router, private storage: LocalStorageService, private funct: FunctService) {
  }

  ngOnInit(): void {
    this.model = {
      phone_no: '',
      password: '',
    } //add new
     
  }

  login() {
    this.spinner.show();
    let mobNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    if (mobNumberPattern.test(this.phone_no)) { //this.phonNo, this.password
      this.model.phone_no = this.phone_no; //AdminDTO
      this.model.password = this.password;//admin/login
      
    /*  var url = "http://192.168.1.11:82/api/threedconfig/3d_close_time";
      console.log(this.model.phone_no);
      this.albumList = [];
      this.http.get(url)
        .subscribe( (response)=> {
          
            this.albumList = response;
        },(response)=> {
        this.errorMessage = "Request failed.";
        });*///get no param
        /*const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }        
        let model =  {
          "phone_no": this.phone_no,
          "password": this.password
       }; 
        let headers = new HttpHeaders();
        headers = headers.set('Access-Control-Allow-Origin', '*');
        var baseUrl = this.funct.ipaddress+'Authenticate/adLogin';
        return this.http.post(baseUrl, model)
        .subscribe(response => {
          console.log('hello')
        },
         response => {
             this.errorMessage = "Unable to save album.";
         });*/
      this.http.post( this.funct.ipaddress+'Authenticate/adLogin', this.model).subscribe(
        result => {
           this.dto.Response = result;
           if (this.dto.Response.status != 'Error') {
           var token = result["token"];
           if(token != null)
           {
            this.util.isLoggedIn = true;
            this.dto.token = "Bearer "+token; 
            this.storage.store('token', this.dto.token);
            this.storage.store('isOwnerLoggedIn', this.util.isLoggedIn);
            this.router.navigate(['/dashboard']);
           }
          }
         /* this.dto.Response = result;
          if (this.dto.Response.message.code == '200') {
            this.dto.token = this.dto.Response.data.token;
            this.util.isLoggedIn = true;
            this.storage.store('isOwnerLoggedIn', this.util.isLoggedIn);

            let headers = new HttpHeaders();
         
            headers = headers.set('Authorization', 'ITW ' + this.dto.token).set('Access-Control-Allow-Origin', '*');
            this.http.get(this.funct.ipaddress + 'admin/admin-by-token', { headers: headers }).subscribe(
              result => {
                this.dto.Response = {};
                this.dto.Response = result;
                if (this.dto.Response.message.code == '200') {
                  this.dto.AdminDTO = this.dto.Response.data.adminDTO;
                  this.storage.store('adminDTO', this.dto.AdminDTO);
                  this.storage.store('token', this.dto.token);
                  this.spinner.hide();
                  this.router.navigate(['/dashboard']);
                }
              }
            );
          }*/
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
      this.toastr.error('Please enter valid phone no.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

 
}
