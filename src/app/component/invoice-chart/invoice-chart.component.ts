import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { FunctService } from '../../service/funct.service';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { DtoService } from '../../service/dto.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-chart',
  templateUrl: './invoice-chart.component.html',
  styleUrls: ['./invoice-chart.component.css']
})
export class InvoiceChartComponent implements OnInit {
  chart: any;
  invoiceList: any;
  dataList =[];
  labelsList =[];
  priceList =[];
  parentObject :any;
  constructor(private storage: LocalStorageService, private spinner: NgxSpinnerService,private toastr: ToastrService, private http: HttpClient, private dto: DtoService, private router: Router, private funct: FunctService) { }

  ngOnInit(): void { 
   this.getAllData();
  }
  getAllData() {
   this.invoiceList = [];
   this.http.get(this.funct.ipaddress+"getByDate")
   .pipe(
     catchError(this.handleError.bind(this))
    ).
   subscribe((data: any) => {
     this.dto.Response = {};
     this.dto.Response = data.data;
     this.invoiceList = this.dto.Response;
     this.dataList = [];
     for(var a = 0 ; a < this.invoiceList.length; a++)
     {
        this.labelsList.push(this.invoiceList[a]._id.created_date);
        this.priceList.push(this.invoiceList[a].total_price);
     }
     this.dataList.push({label: "labels", data: this.priceList, backgroundColor: "blue"})
     this.parentObject ={
      labels:this.labelsList,
      datasets:this.dataList
   }
     this.createChart(this.parentObject);
   })
 }
  createChart(parentObject){
   this.chart = new Chart("MyChart", {
     type: 'line', 
     data: parentObject,
     options: {
       aspectRatio:2.5
     }
   });
 }
 handleError(error: HttpErrorResponse)
  {
    this.spinner.hide();
    return throwError(error);
    }
}
