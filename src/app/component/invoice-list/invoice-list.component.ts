import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from "ngx-spinner";
import { throwError } from 'rxjs';
import { DtoService } from '../../service/dto.service';
import { FunctService } from '../../service/funct.service';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoiceList :any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  idIndex : any;
  itemsPerPage =  10;
  totalItems : any; 
  page = 1;
  detailList = [];
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService,private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService) { }
  ngOnInit(): void {
    this.idIndex = 1;
    this.dtOptions = {
      order:[],
      paging: false,
      info : true,
    }
    this.getAllData();
  }
  getAllData() {
    this.invoiceList = [];
    var id = 'tblInvoice' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.http.get(this.funct.ipaddress+"getDatas?page=1")
    .pipe(
      catchError(this.handleError.bind(this))
     ).
    subscribe((data: any) => {
      this.dto.Response = {};
      this.dto.Response = data.data;
      this.invoiceList = this.dto.Response;
      for(var a = 0 ; a < this.invoiceList.length; a++)
      {
        var productList = this.invoiceList[a].productData;
        var sum = 0;
        for(var b = 0 ; b < productList.length; b++)
        {
            sum += productList[b].price;
        }
        this.invoiceList[a].totalPrice = sum;
      }
      this.totalItems = data.totalRows;
      this.dtTrigger.next();
      this.spinner.hide();
    })
  }
  clickPageNumber(page: any){
    this.invoiceList = [];
    var id = 'tblInvoice' + this.idIndex;
    var table = $('#' + id).DataTable();
    table.destroy();
    this.idIndex = this.idIndex +1;
    this.spinner.show();
    this.http.get(this.funct.ipaddress+"getDatas?page="+page.toString())
    .pipe(
      catchError(this.handleError.bind(this))
     )
     .subscribe((data: any) => {
      this.dto.Response = {};
      this.dto.Response = data.data;
      this.invoiceList = this.dto.Response;
      for(var a = 0 ; a < this.invoiceList.length; a++)
      {
        var productList = this.invoiceList[a].productData;
        var sum = 0;
        for(var b = 0 ; b < productList.length; b++)
        {
            sum += Number(productList[b].price);
        }
        this.invoiceList[a].totalPrice = sum;
      }
      this.totalItems = data.totalRows;
      this.dtTrigger.next();
      this.spinner.hide();
    })
  }
  viewDetail(objData)
  {
      this.detailList = objData;
    $('#detailModal').modal("show");
  }
  handleError(error: HttpErrorResponse)
  {
    this.spinner.hide();
    return throwError(error);
  }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
}
