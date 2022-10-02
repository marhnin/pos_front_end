import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndDetailComponent } from './component/admin/inv-detail.component';
import { InvoiceListComponent } from './component/invoice-list/invoice-list.component';
import { InvoiceChartComponent } from './component/invoice-chart/invoice-chart.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'inv-detail', component: IndDetailComponent
  },
  {
    path: 'inv-list', component: InvoiceListComponent
  },
  {
    path : 'inv-chart',component:InvoiceChartComponent
  }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
