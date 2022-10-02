import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DtoService } from '../app/service/dto.service';
import { UtilService } from '../app/service/util.service';
import { FunctService } from '../app/service/funct.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxDatePickerModule } from '@ngx-tiny/date-picker';
import { FormsModule} from '@angular/forms';
import { IndDetailComponent } from './component/admin/inv-detail.component';
import { HeaderSidebarComponent } from './component/header-sidebar/header-sidebar.component';
import { InvoiceListComponent } from './component/invoice-list/invoice-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvoiceChartComponent } from './component/invoice-chart/invoice-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    IndDetailComponent,
    HeaderSidebarComponent,
    InvoiceListComponent,
    InvoiceChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    DataTablesModule,
    NgxDatePickerModule,
    NgxPaginationModule
  ],
  providers: [
    DtoService,
    UtilService,
    FunctService,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
