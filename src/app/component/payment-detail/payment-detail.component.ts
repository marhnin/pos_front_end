import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import {PaymentDetailModel} from './payment_detail_model';
import { FunctService } from '../../service/funct.service';
declare var $: any;

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  paymentDTO: any;
  token: any;
  paymentId: any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  count = 0;
  filePath : any;
  displayAcc : any;
  disableAccId : any;
  detailList : Array<PaymentDetailModel> = []; //list
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

    this.paymentId = this.route.snapshot.paramMap.get("id");
    if (this.paymentId == null) {
      $(document).ready(function () {
        $('#updatedata').hide();
       // $("#edit_acc").hide();
       // $("#add_acc").show();
      });
      this.paymentDTO = {
        id: 0,
        accountNo: '',
        type: '',
        status: 'ACTIVE',
        image_url: '',
        createdDate: '',
        createdBy: '',
        updatedDate: '',
        updatedBy: '',
        payment_type : "",
      };
    }
    else {
      $(document).ready(function () {
        $('#updatedata').show();
        //$("#edit_acc").show();
        //$("#add_acc").hide();
      });
      this.paymentDTO = {
        id: 0,
        accountNo: "",
        type: "",
        status: "",
        image: "",
        createdDate: "",
        createdBy: "",
        updatedDate: "",
        updatedBy: "",
        payment_type : "",
        detailList :[]
      };
      this.getPaymentById();
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

  getPaymentById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('id', this.paymentId);
    this.http.get(this.funct.ipaddress + 'payment/GetDetaiList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        console.log("this.dto.Response>> " + JSON.stringify(this.dto.Response));
        this.paymentDTO = this.dto.Response;//.data.paymentDTO;
        if(this.paymentDTO.type == 'WITHDRAWAL')
          $('#edit_acc').hide();
        if (this.paymentDTO.image_url != null || this.paymentDTO.image_url != '') {
          this.imgURL = this.paymentDTO.image_url;
          console.log("imgURL getResultById>>>" + JSON.stringify(this.imgURL));
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
    console.log("File path is : "+files[0])
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
     // console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }

  goSave() {
    if (this.paymentId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }

   save() {
    this.spinner.show();
    var dataarr = [];
    $('input[name="data[]"]').each(function() {
      dataarr.push($(this).val());
     });
     console.log(dataarr);
     for(var i = 0 ; i < dataarr.length ; i++)
     {
      let customObj = new PaymentDetailModel();
      customObj.account_no = dataarr[i];
      customObj.id = 0;
      customObj.payment_id = 0;
      console.log(customObj)
      this.detailList.push(customObj);
     }
    this.paymentDTO.detailList= this.detailList ;
    console.log(this.paymentDTO.detailList)
    let mobNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    //if (mobNumberPattern.test(this.paymentDTO.account_no)) {
      if (this.paymentDTO.type != '') {
        if (this.imgURL == '' || this.imgURL == null || this.imgURL == undefined) {
          this.spinner.hide();
          this.toastr.error('Please upload image.', 'Invalid input!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
       else {
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);

          if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
            if(this.imgURL.includes('data:image/jpeg;base64,'))
            this.paymentDTO.image_url = this.imgURL.replace("data:image/jpeg;base64,","");
            if(this.imgURL.includes('data:image/png;base64,'))
            this.paymentDTO.image_url = this.imgURL.replace("data:image/png;base64,","");
          }
          console.log("request payment/save " + JSON.stringify(this.paymentDTO));
          this.http.post(this.funct.ipaddress + 'payment/insert', this.paymentDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe( //change
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/payment-list']).then(() => {
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
      else {
        this.spinner.hide();
        this.toastr.error('Please choose payment type.', 'Invalid input!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
   /* }
   else {
      this.spinner.hide();
      this.toastr.error('Please enter valid account no.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }*/
  }

  edit() {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    var acc_arrays =[];
    console.log(this.imgURL);
    if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
    if(this.imgURL.includes('data:image/jpeg;base64,'))
     this.paymentDTO.image_url = this.imgURL.replace("data:image/jpeg;base64,","");
     if(this.imgURL.includes('data:image/png;base64,'))
     this.paymentDTO.image_url = this.imgURL.replace("data:image/png;base64,","");
    }
    console.log(this.paymentDTO.image_url);
    if(this.paymentDTO.detailList != null)
    {
      for(var i = 0 ; i < this.paymentDTO.detailList.length; i++)
       {
        var acc_no = $("#acc"+this.paymentDTO.detailList[i].id).val();
        let customObj = new PaymentDetailModel();
        customObj.id = this.paymentDTO.detailList[i].id ;
        customObj.account_no = acc_no; 
        customObj.payment_id = this.paymentDTO.id; 
        this.detailList.push(customObj);
       }
    }
    this.paymentDTO.detailList= this.detailList ;
    console.log(this.paymentDTO.detailList)
    this.http.post(this.funct.ipaddress + 'payment/update', this.paymentDTO, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/payment-list']).then(() => {
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

  /*not use the following functions now*/
  add(){
      this.count++;
      let row = document.createElement('div');  
      row.className = 'div'+this.count;
      row.innerHTML = `
      <br>
     <div class ="row"><div class ="col-sm-12"><input type="text" class = "form-control form-control-sm" name = "data[]" [(ngModel)]="paymentDTO.account_no"
      [ngModelOptions]="{standalone: true}" id="textbox' + count + '">
      </div></div>`;
      document.querySelector('.showInputField').appendChild(row);
      if(this.count >0 )
        $("#btn-rem").show();
      if(this.count >=9 )
      {
        this.toastr.error("Only 10 textboxes allow", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });
      }
  }
   minus()
  {
     if(this.count == 0)
     {
        this.toastr.error("No more textbox to remove", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      //$("#btn-rem").hide();
      return false;
     }
     $(".div"+this.count).remove();
     this.count--;
  }

  inactiveAcc(accId, account_no)
  {
    this.displayAcc = account_no;
    this.disableAccId = accId;
    $("#inactiveData").modal("show");
  }
  inactiveOk()
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    var formData = new FormData();
    formData.append("accId", this.disableAccId);
    this.http.post(this.funct.ipaddress + 'payment/inactiveAcc', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          $("#inactiveData").modal("hide");
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
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
  activeAcc(accId)
  {
    this.spinner.show();
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    var formData = new FormData();
    formData.append("accId", accId);
    this.http.post(this.funct.ipaddress + 'payment/activeAcc', formData, { headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe( //change
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
            this.toastr.success(this.dto.Response.message, 'Success!', {
              timeOut: 3000,
              positionClass: 'toast-top-right'
            });
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
