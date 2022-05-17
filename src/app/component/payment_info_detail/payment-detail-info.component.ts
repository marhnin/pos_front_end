import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IMultiSelectOption } from 'ngx-bootstrap-multiselect';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;

@Component({
  selector: 'app-payment-detail-info',
  templateUrl: './payment-detail-info.component.html',
  styleUrls: ['./payment-detail-info.component.css']
})
export class PaymentDetailInfoComponent implements OnInit {

  paymentDTO: any;
  token: any;
  paymentdetailId: any;
  paymentId : any;
  imagePath: any;
  imgURL: any;
  message: string = '';
  paymentList : any;
  clickId = [] ;
  adminList = [];
  myOptions: IMultiSelectOption[];
  myUpdOptions: IMultiSelectOption[];
  optionsModel: number[];
  adminIdEditList = [];
  cashInList =[];
  cashIdid : any;
  cadmin : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router,
    private route: ActivatedRoute, private funct: FunctService) {
      this.getAssignedPayments();
      this.getAllAdmins();
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
      this.cadmin ={
        id: 0,
        admin_id :0,
        payment_detail_id : 0,
        amount : 0,
        admin_name :''
      };
      this.paymentdetailId = this.route.snapshot.paramMap.get("id");

      if (this.paymentdetailId == null) {
        $(document).ready(function () {
          $('#updatedata').hide();
          $("#updateAdmin").hide();
        });
     
        this.paymentDTO = {
          id: 0,
          accountNo: "",
          order_id : 0,
          type: '',
          status: 'ACTIVE',
          image: '',
          createdDate: '',
          createdBy: '',
          updatedDate: '',
          updatedBy: '',
          min_amount:0,
         max_amount:0,
         maxAccountCount:0,
        limited_amt :0,
  
        today_reach_amt:0,
  
        handle_admin:'',
        };
      }
      else {
        $(document).ready(function () {
            $("#insertAdmin").hide();
            $("#updateAdmin").hide();
        });
        this.paymentDTO = {
          id: 0,
          accountNo: 0,
          type: "",
          status: "",
          order_id : 0,
          image: "",
          createdDate: "",
          createdBy: "",
          updatedDate: "",
          updatedBy: "",
          min_amount:0,
          max_amount:0,
          maxAccountCount:0,
          limited_amt :0,
   
         today_reach_amt:0,
   
         handle_admin:'',
        };
      }
      this.getPaymentById();
      $('#updatedata').hide();
      $("#updateAdmin").hide();
  }

  getAllAdmins()
  {
    this.adminList =[];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.http.get(this.funct.ipaddress + 'admin/GetAllAdmin', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.adminList = this.dto.Response;
        this.myOptions = this.adminList;
        localStorage.setItem('adminList', JSON.stringify(this.adminList));
      }
    );
  }
  
  handleError(error: HttpErrorResponse){
    this.spinner.hide();
    if(error.status == 423)
    {
      this.spinner.hide();
      this.toastr.error("Transaction is Locked.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
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

  getAssignedPayments() {
    this.paymentList = [];
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    let params = new HttpParams();
    params = params.set('type', 'TOPUP');
    this.http.get(this.funct.ipaddress + 'payment/topuplistPayment', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentList = this.dto.Response;
      }
    );
  }

  getPaymentById() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('id', this.paymentdetailId);
    this.adminIdEditList = [];
    this.spinner.show();
    this.http.get(this.funct.ipaddress + 'payment/GetPaymentDetaiList', { params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.paymentDTO = this.dto.Response;
          this.paymentId = this.paymentDTO.payment_id;
          if(this.paymentDTO.role_name == "ACCOUNTANT_MANAGER")
          {
            $('#idcodenumber').prop('disabled', true);
            $('#idaccno').prop('disabled', true);
            $('#idaccname').prop('disabled', true);
          }
          this.http.get(this.funct.ipaddress + 'admin/GetAllAdmin', { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
          )
          .subscribe(
            result1 => {
              this.dto.Response1 = {};
              this.dto.Response1 = result1;
              this.adminList = this.dto.Response1;
              this.myOptions = this.adminList;
            }
          );
          if(this.adminList == null || this.adminList.length == 0)
          {
            this.adminList = JSON.parse(localStorage.getItem("adminList"));
          }
          if(this.paymentDTO.adminIdList == 0) //(this.cashInList.length 
          {
            $("#insertAdmin").show();
            $("#updateAdmin").hide();
          }
        else{
              $('#updateAdmin').show();
              $("#insertAdmin").hide();
          }
          this.paymentDTO.adminIdList.forEach(element => {
            this.cashInList.push(element);
          });

          for( var i=this.adminList.length - 1; i>=0; i--)
          {
            for( var j=0; j<this.paymentDTO.adminIdList.length; j++)
            { //this.cashInList.length, //this.cashInList[j].admin_id
                if(this.adminList[i] && (this.adminList[i].id === this.paymentDTO.adminIdList[j].admin_id))
                {
                  this.adminList.splice(i, 1);
                }
            }
        }
        
          this.myUpdOptions = this.adminList;
          $("#"+this.paymentId).css('filter','grayscale(0%)');
      });
      this.spinner.hide();
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
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  goSave() {
    if (this.paymentdetailId == null) {
      this.save();
    }
    else {
      this.edit();
    }
  }
  onChange() {
    console.log("in onchange "+ this.optionsModel);
 }
   save() {
    let mobNumberPattern =/[0-9]/g;
    this.paymentDTO.payment_id = this.paymentId;
   
    if( this.paymentDTO.payment_id == "" || this.paymentDTO.payment_id  == undefined ||  this.paymentDTO.payment_id  == null)
    {
       this.toastr.error("Please choose bank type", 'Invalid!', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
       return;
    }
           if( this.paymentDTO.account_no == "" || this.paymentDTO.account_no  == undefined ||  this.paymentDTO.account_no  == null)
           {
              this.toastr.error("Please enter account no", 'Invalid!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
              return;
           }

           if (!mobNumberPattern.test(this.paymentDTO.account_no))
           {
             this.toastr.error("Account number must be number", 'Invalid!', {
               timeOut: 3000,
               positionClass: 'toast-top-right',
             });
             return;
           }
       if(this.paymentDTO.max_amount < this.paymentDTO.min_amount)
           {
              this.toastr.error("Maximum amount must be greather than minimum amount", 'Invalid!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
              return;
           }
           if(this.paymentDTO.limited_amt == 0)
           {
              this.toastr.error("Limited amount must not be zero", 'Invalid!', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
              return;
           }
           if(this.optionsModel.length > 0)
           {
            this.paymentDTO.handle_admin = this.optionsModel.toString();
           }
          if( this.paymentDTO.handle_admin.length == 0 || this.paymentDTO.handle_admin == "" || this.paymentDTO.handle_admin  == undefined ||  this.paymentDTO.handle_admin  == null)
           {
             this.toastr.error("Please choose account holder (Admin)", 'Invalid!', {
               timeOut: 3000,
               positionClass: 'toast-top-right',
             });
             return;
           }
      this.spinner.show();
    if (mobNumberPattern.test(this.paymentDTO.account_no)) {
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          this.http.post(this.funct.ipaddress + 'payment/insertPaymentDetail', this.paymentDTO, { headers: headers })
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe( 
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/payment-info']).then(() => {
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
      this.toastr.error('Please enter valid account no.', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }

  edit() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.paymentDTO.payment_id = this.paymentId;
   // let mobNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
   let mobNumberPattern =/[0-9]/g;
    if( this.paymentDTO.payment_id == "" || this.paymentDTO.payment_id  == undefined ||  this.paymentDTO.payment_id  == null)
    {
       this.toastr.error("Please choose bank type", 'Invalid!', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
       return;
    }

    if( this.paymentDTO.account_no == "" || this.paymentDTO.account_no  == undefined ||  this.paymentDTO.account_no  == null)
    {
       this.toastr.error("Please enter account no", 'Invalid!', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
       return;
    }
   if(this.paymentDTO.max_amount < this.paymentDTO.min_amount)
    {
       this.toastr.error("Maximum amount must be greather than minimum amount", 'Invalid!', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
       return;
    }
  
    if(this.paymentDTO.limited_amt == 0)
    {
       this.toastr.error("Limited amount must not be zero", 'Invalid!', {
         timeOut: 3000,
         positionClass: 'toast-top-right',
       });
       return;
    }
    if(this.optionsModel.length > 0)
      {
       this.paymentDTO.handle_admin = this.optionsModel.toString();
      }
    this.spinner.show();
    this.http.post(this.funct.ipaddress + 'payment/updatePaymentDetail', this.paymentDTO, { headers: headers }).subscribe( 
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/payment-info']).then(() => {
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


  changeAction(id) 
 {
    if(this.paymentDTO.role_name == "ACCOUNTANT_MANAGER")
    {
    return;
    }
   if(this.clickId.length == 0)
   {
    $("#"+id).css('filter','grayscale(0%)');
      this.clickId.push(id);
      this.paymentId = id;
   }
   else
   {
     for(var i = 0 ; i < this.clickId.length; i++)
     {
       if(this.clickId[i] != id)
       {
         console.log("not equal" + this.clickId[i])
          $("#"+this.clickId[i]).css('filter','grayscale(100%)');
          $("#"+id).css('filter','grayscale(0%)');
          this.clickId[i] = id;
          this.paymentId = id;
       }
       else
       {
         $("#"+this.clickId[i]).css('filter','grayscale(0%)');
         this.clickId[i] = id;
         this.paymentId = id;
         console.log("equal")
       }
     }
   }
 }

 flagAdmin()
 {
   this.paymentDTO.handle_admin = $("#admin_id").val();
 }

 goModal(event)
 {
   this.cashIdid = event.target.id;
  $('#deleteCash').modal("show");
 }

 deleteOk()
 {
  this.spinner.show();
  this.token = this.storage.retrieve('token');
  let headers = new HttpHeaders();
  headers = headers.set('Authorization',  this.token);
  let formData= new FormData();
  formData.append("id",this.cashIdid);
  this.http.post(this.funct.ipaddress + 'payment/deletCashIn', formData, {headers: headers})
  .pipe(
    catchError(this.handleError.bind(this))
   )
  .subscribe(
    result => {
      this.dto.Response = {};
      this.dto.Response = result;
      if (this.dto.Response.status == 'Success') {
        this.spinner.hide();
        $('#deleteCash').modal("hide");
        window.location.href = window.location.href;
       
        this.router.navigate(['/payment-info-detail', this.paymentdetailId]).then(() => {
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
 hideModal()
 {
   $('#deleteCash').modal("hide");
 }

 ngAfterViewInit() {
  setTimeout(() => {
   // this.renderWidgetInsideWidgetContainer();
  }, 0);
 }

}
