import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
declare var $: any;

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-servicephone-detail',
  templateUrl: './servicephone-detail.component.html',
  styleUrls: ['./servicephone-detail.component.css']
})
export class ServicephoneDetailComponent implements OnInit {

  serviceDTO: any;
  token: any;
  serviceId: any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) { }

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

    this.serviceId = this.route.snapshot.paramMap.get("id");
    if (this.serviceId == null) {
      this.serviceDTO = {
       // id: 0,
        phone_no: '',
        type: '',
        status: 'ACTIVE',
        messanger_id :'',
        viber :'',
        title : ''

      };
    }
    else {
      this.serviceDTO = {
        id: 0,
        phoneNo: '',
        type: '',
        status: 'ACTIVE',
        messanger_id :'',
        viber :'',
        title :''
      };
      this.getServicePhoneById();
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

  getServicePhoneById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.serviceId);
    this.http.get(this.funct.ipaddress + 'service/GetDetailList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.serviceDTO = this.dto.Response;//.data.servicePhoneDTO;
      });
  }

  goSave() {
    if (this.serviceId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

  save() {
    this.spinner.show(); /* /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im*/
    let mobNumberPattern = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
  
    if (!mobNumberPattern.test(this.serviceDTO.phone_no))
     {
      this.spinner.hide();
      this.toastr.error('Please enter valid phone number.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;  
    }

    if (!mobNumberPattern.test(this.serviceDTO.viber)) 
    {
      this.spinner.hide();
      this.toastr.error('Please enter valid viber Id or remove (+).', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;   
    }
      if (this.serviceDTO.type != '') {
        this.token = this.storage.retrieve('token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization',  this.token);
        console.log(this.serviceDTO)
        this.http.post(this.funct.ipaddress + 'service/save', this.serviceDTO, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         )
        .subscribe(
          result => {    
            this.dto.Response = {};
            this.dto.Response = result;
            if (this.dto.Response.status == 'Success') {
              this.spinner.hide();
              this.router.navigate(['/servicephone-list']).then(() => {
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
      else {
        this.spinner.hide();
        this.toastr.error('Please enter type.', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
  }

  edit() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let mobNumberPattern = /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    if (!mobNumberPattern.test(this.serviceDTO.phone_no))
    {
     this.spinner.hide();
     this.toastr.error('Please enter valid phone number.', 'Invalid input!', {
       timeOut: 3000,
       positionClass: 'toast-top-right',
     });
     return;  
     }
    if (!mobNumberPattern.test(this.serviceDTO.viber)) 
    {
      this.spinner.hide();
      this.toastr.error('Please enter valid viber Id or remove (+).', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      return;   
    }
    this.http.post(this.funct.ipaddress + 'service/update', this.serviceDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {    
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/servicephone-list']).then(() => {
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
}
