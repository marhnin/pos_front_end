import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { Router, ActivatedRoute   } from '@angular/router';

import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { Subject } from 'rxjs';
import { isThisISOWeek } from 'date-fns';
declare var $: any;
@Component({
  selector: 'app-advertise-team-detail',
  templateUrl: './advertise-team-detail.component.html',
  styleUrls: ['./advertise-team-detail.component.css']
})
export class AdvertiseTeamDetailComponent implements OnInit {
  agentDTO: any;
  token: any;
  agentId: any;
  parentId : any;
  fieldTextType: boolean;
  confrimFieldTextType: boolean;
  roleName:any;
  phoneNo: string= '';
  name: string= '';
  referralCode: string= '';
  status: string= '';
  agentList: any;
  activeagentList : any;
  agent : any;
  idIndex: any;
  withdraw_balance : any;
  commission_balance : any;
  none_agent: any;
  dtTrigger: Subject<any> = new Subject();
  roleList = [];
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService) {
      this.getActiveAgents();
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
    this.agentId = this.route.snapshot.paramMap.get("id");
    console.log("Agent id is : "+this.agentId)
    if(this.agentId == null){
      $(document).ready(function () {
        $('#referralCode').remove();
        $('#updatedata').remove();
        $('.commbalance').remove();
        $('.withdrawbalance').remove();
        $(".total_withdraw").remove();
        $(".tcommission").remove();
        $(".wallet").remove();
      });

      this.agentDTO = {
      //  id: 0,
        phone_no: '',
        name: '',
        password: '',
        confirmPassword: '',
     //   balance: 0,
      //  referralCode: '',
      //  image: '',
       // total_commission: '',
       // total_withdraw: '',
       // createdDate: '',
       // createdBy: '',
      //  updatedDate: '',
       // updatedBy: '',
        status: 'ACTIVE',
        role_id : '',
        parent_id : 0,
       // commission_balance:'',
       // withdraw_balance : ''
      }
    }
    else{
      $(document).ready(function () {
        this.updateData = true;
        $('#password').remove();
        $('#confirmPassword').remove();
        $('#updatedata').show();

        $('.commbalance').remove();
        $('.withdrawbalance').remove();
        $(".total_withdraw").show();
        $(".tcommission").show();
        $(".wallet").show();

      });
      this.agentDTO = {
        id: 0,
        phoneNo: '',
        name: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
        newPassword: '',
        balance: 0,
        referralCode: '',
        image: '',
        total_commission: '',
        total_withdraw: '',
        createdDate: '',
        createdBy: '',
        updatedDate: '',
        updatedBy: '',
        status: 'ACTIVE',
        roleName : '',
        parent_id : '',
        commission_balance:'',
        withdraw_balance : ''
      };
      this.getAgentById();
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

  getActiveAgents() {
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.token);
    this.http.get(this.funct.ipaddress + 'agent/GetActiveAgents', { headers: headers }).subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.activeagentList = this.dto.Response;
        this.activeagentList.push("None");
      }
    );
  }
  search(){
    this.agentList = [];
    var id = 'tblAgent' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.dto.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',  this.dto.token);
    let params = new HttpParams();
    params = params.set('phoneNo',this.phoneNo).set('name',this.name).set('referralCode',this.referralCode).set('status', this.status);
    this.http.get(this.funct.ipaddress + 'agent/agentsByparams', { params: params, headers: headers } )
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentList = this.dto.Response;
        this.dtTrigger.next();
        this.spinner.hide();
      }
    );
  }
  getAgentById(){
    this.token = this.storage.retrieve('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.token);
    let params = new HttpParams();
    params = params.set('id',this.agentId);
    this.http.get(this.funct.ipaddress + 'agent/GetDetail', {params: params, headers: headers })
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        this.agentDTO = this.dto.Response; 
        console.log(this.agentDTO.updated_by_name);
        this.search();
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleConfrimFieldTextType() {
    this.confrimFieldTextType = !this.confrimFieldTextType;
  }

  goSave(){
    if(this.agentId == null){
      this.save();
    }
    else{
      this.edit();
    }
  }

  goCancel(){
    if(this.agentId == null){
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
    console.log("Parent agent id is >> "+ this.agentDTO.parent_id)
    var formData = new FormData();
    formData.append("id",this.agentId);
    formData.append("phone_no",this.agentDTO.phone_no);
    formData.append("role_id",this.agentDTO.role_id);
    formData.append("name",this.agentDTO.name);
    formData.append("status",this.agentDTO.status);
    if(this.agentDTO.parent_id == null)
    formData.append("parent_id","0");
    else
    formData.append("parent_id" , this.agentDTO.parent_id);
    console.log(formData)
    this.http.post(this.funct.ipaddress + 'agent/update', formData, {headers: headers})
    .pipe(
      catchError(this.handleError.bind(this))
     )
    .subscribe(
      result => {
        this.dto.Response = {};
        this.dto.Response = result;
        if (this.dto.Response.status == 'Success') {
          this.spinner.hide();
          this.router.navigate(['/advertise-team-list']).then(() => {
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

  save(){
    this.spinner.show();
    let mobNumberPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
      if (mobNumberPattern.test(this.agentDTO.phone_no)) {
          this.agentDTO.phone_no = this.agentDTO.phone_no.toString();
          if (this.agentDTO.phone_no == 7) {
            this.agentDTO.phone_no = '+95' + '9' + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("9") == 0 && this.agentDTO.phone_no.length == 8) {
            this.agentDTO.phone_no = '+95' + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("09") == 0 && this.agentDTO.phone_no.length == 9) {
            this.agentDTO.phone_no = "+95" + this.agentDTO.phone_no.substring(1);
          }
          else if (this.agentDTO.phone_no.length == 8 && this.agentDTO.phone_no.indexOf("9") != 0) {
            this.agentDTO.phone_no = "+95" + '9' + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("9") == 0 && this.agentDTO.phone_no.length == 9) {
            this.agentDTO.phone_no = "+95" + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("09") == 0 && this.agentDTO.phone_no.length == 10) {
            this.agentDTO.phone_no = "+95" + this.agentDTO.phone_no.substring(1);
          }
          else if (this.agentDTO.phone_no == 9) {
            this.agentDTO.phone_no = "+95" + '9' + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("9") == 0 && this.agentDTO.phone_no.length == 10) {
            this.agentDTO.phone_no = "+95" + this.agentDTO.phone_no;
          }
          else if (this.agentDTO.phone_no.indexOf("09") == 0 && this.agentDTO.phone_no.length == 11 && this.agentDTO.phone_no.charAt(2) != "3") {
            this.agentDTO.phone_no = "+95" + this.agentDTO.phone_no.substring(1);
          }
      }
    if (mobNumberPattern.test(this.agentDTO.phone_no)) {
      if(this.agentDTO.role_id != "")
      {
      if(this.agentDTO.password === this.agentDTO.confirmPassword){
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization',  this.token);
          console.log(JSON.stringify(this.agentDTO))
          if(this.agentDTO.parent_id == '' || this.agentDTO.parent_id == null || this.agentDTO.parent_id =='undefined')
             this.agentDTO.parent_id = 0; 
          this.http.post(this.funct.ipaddress + 'agent/agentInsert', this.agentDTO, {headers: headers})
          .pipe(
            catchError(this.handleError.bind(this))
           )
          .subscribe(
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              console.log(this.dto.Response);
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/advertise-team-list']).then(() => {
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
      this.toastr.error('Password missmatch', 'Invalid input!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
      }
    }
    else{
      this.spinner.hide();
      this.toastr.error('Please choose role.', 'Invalid input!', {
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
    this.agentDTO = {
      id: 0,
      phoneNo: '',
      name: '',
      password: '',
      confirmPassword: '',
      oldPassword: '',
      newPassword: '',
      balance: 0,
      referralCode: '',
      image: '',
      status: 'ACTIVE',
      roleName : '',
      parent_id :''
    }
  }
  editCancel(){
    this.getAgentById();
  }
  flagAgent(){
    this.agentDTO.parent_id = $("#parent_id").val();
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
    this.agentDTO.role_id = $("#roleName").val();
  }

}
