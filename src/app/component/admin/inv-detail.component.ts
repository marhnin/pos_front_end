import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { throwError } from 'rxjs';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { catchError, retry } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-inv-detail',
  templateUrl: './inv-detail.component.html',
  styleUrls: ['./inv-detail.component.css']
})
export class IndDetailComponent implements OnInit {
  itemcode : string ='';
  pname : string ='';
  imagePath: string ='';
  stock: string = '';
  price : number = 0;
  dtOptions: { responsive: boolean; order: any[]; };
  dtTrigger: any;
  productList :any;
  productInputList :any;
  isImagePath : boolean;
  isClicksearch:boolean;
  productData  =[];
  parentDTO : any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService,private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService) {
 
  }

  ngOnInit(): void {
    this.isImagePath = false;
    this.isClicksearch = false; 
    this.parentDTO = {
      cname:'',
      sname :'',
      notes:'',
      created_date:'',
      productData :[]
    }
    this.productList = [
    {itemcode: 1111,pname: "Product 1", imagePath: "./assets/image/prod-1.jpg",stock:"Stock 1",price : 6800}, 
    {itemcode: 2222,pname: "Product 2", imagePath: "./assets/image/prod-3.jpg",stock:"Stock 2",price : 9000}
     ];
    this.productInputList = [{itemcode: "",pname: "", imagePath: "",stock:"",price : 0}];
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    if (!this.storage.retrieve('loadFlag')) {
      this.storage.store('loadFlag', 'noLoad');
      setTimeout(function () {
        location.reload();
      }, 5);
    }
    else {
      this.storage.clear('loadFlag');
    }
  }
    ngAfterViewInit() {
    }
   searchProduct(event,index)
    {
      var userItemCode =  $("#itemcode"+index).val();
      var nFound = false;
      if(userItemCode == "")
      {
        this.toastr.error("Please enter item code", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
          return;
      }
      for(var i = 0; i < this.productList.length; i++) 
      {
        if(userItemCode == this.productList[i].itemcode)
        {
          this.isClicksearch = true;
          $("#pname"+index).val(this.productList[i].pname);
          $("#stock"+index).val(this.productList[i].stock);
          $("#price"+index).val(this.productList[i].price);
          $("#imagePath"+index).attr("src", this.productList[i].imagePath);
          this.isImagePath = true;
          nFound = false;
          break;
        }
        else
        {
            nFound =  true;
        }
      }
      if(nFound== true)
      {
        this.toastr.error("No product found", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
          this.isImagePath = false;
      }
    }
    Add()
    {
      this.isClicksearch = false;
      if(this.productInputList.length >=2 )
      {
        this.toastr.error("Only two products can be added", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        return;
      }
      this.productInputList.push({itemcode: "",pname: "", imagePath: "",stock:"",price : 0});
    }
    Save()
    {
      if(this.parentDTO.created_date == "")
      {
        this.toastr.error("Please choose date", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        return;
      }
      if(this.parentDTO.cname == "")
      {
        this.toastr.error("Please enter customer name", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        return;
      }
      if(this.parentDTO.sname == "")
      {
        this.toastr.error("Please enter sale person name", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        return;
      }
      for(var i = 0 ;i < this.productInputList.length ; i++)
      {
        var pname = $("#pname"+i).val();
        var stock = $("#stock"+i).val();
        var price = $("#price"+i).val();
        var itemcode =  $("#itemcode"+i).val();
        var imagePath = $("#imagePath"+i).val();
        if(itemcode != "" && pname != "" && stock != "" && price != "" )
        {
          if(this.parentDTO.productData.length > 0)
          {
            var result = this.parentDTO.productData.filter(x => x.itemcode == itemcode);
            if(result.length == 0 )
            {
               this.parentDTO.productData.push({itemcode:itemcode ,pname:pname, imagePath:imagePath,stock:stock,price : price});
            }
          }
          else
          {
            this.parentDTO.productData.push({itemcode:itemcode ,pname:pname, imagePath:imagePath, stock:stock, price : price});
          }
        }
      }
      if(this.parentDTO.productData.length == 0)
      {
        this.toastr.error("Please add one product", 'Invalid!', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          });
        return;
      }
      this.http.post(this.funct.ipaddress+"saveInvoices", this.parentDTO)
      .pipe(
        catchError(this.handleError.bind(this))
       )
      .subscribe( 
        result => {
          this.dto.Response = result;
        });
    }
    
handleError(error: HttpErrorResponse)
  {
    if(error.status == 200)
    {
      this.toastr.success("Save Success.", 'Success!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
      window.location.href = window.location.href;
      return;
    }
    if(error.status == 400)
    {
      this.toastr.error("Save Fail", 'Invalid!', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        });
    }
    return throwError(error);
    }
}
