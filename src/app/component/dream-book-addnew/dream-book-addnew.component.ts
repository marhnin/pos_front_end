import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common'

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
  selector: 'app-dream-book-addnew',
  templateUrl: './dream-book-addnew.component.html',
  styleUrls: ['./dream-book-addnew.component.css']
})
export class DreamBookAddNewComponent implements OnInit {
  threedbetId: any;
  dreamBookDTO: any;
  description_en: any;
  description_my: any;
  description_th: any;
  description_zh : any;
  status: string = '';
  token: any;
  threedbetnumber: any = [{ value: '' }];
  selectNum: any = [];
  message : any;
  imagePath: any;
  filePath : any;
  imgURL : any;

  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, 
    private route: ActivatedRoute, private funct: FunctService,private datepipe: DatePipe) 
    { 
      this.getThreedNumbers();
    } 

    getThreedNumbers() {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization',  this.dto.token);
      let params = new HttpParams();
      this.threedbetnumber = [];
      this.http.get(this.funct.ipaddress + 'threedbet/GetThreedNumber', { params: params, headers: headers })
      .subscribe( 
        result => {
          this.dto.Response = {};
          this.dto.Response = result;
          this.threedbetnumber =  this.dto.Response;
          for (let i = 0; i < this.threedbetnumber.length; i++) {
            this.threedbetnumber[i].flag = false;
            this.threedbetnumber[i].buttonColor = '#d1cccc';
            this.threedbetnumber[i].textcolor = '#313131';
          }
          this.spinner.hide();
        });
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

    this.threedbetId = this.route.snapshot.paramMap.get("id");
    if (this.threedbetId == null) {
      this.dreamBookDTO = {
         number :'',
         description_en :'',
         description_th :'',
         description_zh :'',
         status :'ACTIVE',
         imageUrl :''
      };
    }
    else {
      this.dreamBookDTO = {
        number :'',
        description_en :'',
        description_th :'',
        description_zh :'',
        status :'',
        imageUrl :''
     };
    }
  }

 
  numericOnly(event): boolean { 
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43 || charCode == 46) {
      return false;
    }
    return true;
  }

  goSave() {
    if (this.threedbetId == null) {
      this.save();
    }
    else {
     
    }
  }

  handleError(error: HttpErrorResponse){
    if(error.status == 423)
    {
      this.toastr.error("Need to Sign out.Login again.", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
      this.spinner.hide();
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

    

    selectAll()
    {
      for (let i = 0; i < this.threedbetnumber.length; i++) {
          this.threedbetnumber[i].flag = !this.threedbetnumber[i].flag;
          if (this.threedbetnumber[i].buttonColor == '#d1cccc' && this.threedbetnumber[i].textcolor == '#313131') {
            this.threedbetnumber[i].buttonColor = '#2456A6'
            this.threedbetnumber[i].textcolor = '#ffffff'
          } else {
            this.threedbetnumber[i].buttonColor = '#d1cccc'
            this.threedbetnumber[i].textcolor = '#313131'
          }
      }
      this.selectedData();
    }

  save()
  {
    if(this.dreamBookDTO.description_en == null || this.dreamBookDTO.description_en== undefined || this.dreamBookDTO.description_en == '')
       {
        this.toastr.error('Please enter description english', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        return;
       }
       this.selectNum.push(this.dreamBookDTO.number1);
       this.selectNum.push(this.dreamBookDTO.number2);
      
       if(this.selectNum.length ==0 )
       {
         this.toastr.error('Please select number', 'Invalid!', {
           timeOut: 3000,
           positionClass: 'toast-top-right'
         });
         return;
       }
       if (this.imgURL == '' || this.imgURL == null || this.imgURL == undefined) {
          this.toastr.error('Please upload image', 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right'
        });
        return;
       }
          this.spinner.show();
          this.token = this.storage.retrieve('token');
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', this.token);
          if (this.imgURL != '' || this.imgURL != null || this.imgURL != undefined) {
            if(this.imgURL.includes('data:image/jpeg;base64,'))
               this.dreamBookDTO.imageUrl = this.imgURL.replace("data:image/jpeg;base64,","");
            if(this.imgURL.includes('data:image/png;base64,'))
               this.dreamBookDTO.imageUrl = this.imgURL.replace("data:image/png;base64,","");
          }
        this.dreamBookDTO.number = this.selectNum.toString();
        
        this.http.post(this.funct.ipaddress + 'dreamBook/insert', this.dreamBookDTO, { headers: headers })
        .pipe(
          catchError(this.handleError.bind(this))
         ).subscribe( 
            result => {
              this.dto.Response = {};
              this.dto.Response = result;
              if (this.dto.Response.status == 'Success') {
                this.spinner.hide();
                this.router.navigate(['/dream-book']).then(() => {
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

  goCancel() {
    if(this.threedbetId == null){
      this.cancel();
    }
    else{
      this.editCancel();
    }
  }
  cancel(){
   
  }

  editCancel(){
    
  }

  threeDSelect(data, index) {
    for (let i = 0; i < this.threedbetnumber.length; i++) {
      if (this.threedbetnumber[i].number == data.number) {
        this.threedbetnumber[i].flag = !this.threedbetnumber[i].flag;
        if (this.threedbetnumber[i].buttonColor == '#d1cccc' && this.threedbetnumber[i].textcolor == '#313131') {
          this.threedbetnumber[i].buttonColor = '#2456A6'
          this.threedbetnumber[i].textcolor = '#ffffff'
        } else {
          this.threedbetnumber[i].buttonColor = '#d1cccc'
          this.threedbetnumber[i].textcolor = '#313131'
        }
      }
    }
    this.selectedData();
  }

  selectedData() {
    this.selectNum = [];
    for (let i = 0; i < this.threedbetnumber.length; i++) {
      if (this.threedbetnumber[i].flag) {
        this.selectNum.push(this.threedbetnumber[i].number);
      }
    }
    console.log("this.selectNum" + JSON.stringify(this.selectNum));
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
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log("imgURL>>>" + JSON.stringify(this.imgURL));
    }
  }


}
