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

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { PageNotfoundComponent } from './component/page-notfound/page-notfound.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HeaderSidebarComponent } from './component/header-sidebar/header-sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminDetailComponent } from './component/admin-detail/admin-detail.component';
import { AgentComponent } from './component/agent/agent.component';
import { AgentDetailComponent } from './component/agent-detail/agent-detail.component';
import { UserComponent } from './component/user/user.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { TwodComponent } from './component/twod/twod.component';
import { TwodDetailComponent } from './component/twod-detail/twod-detail.component';
import { ThreedComponent } from './component/threed/threed.component';
import { ThreedDetailComponent } from './component/threed-detail/threed-detail.component';
import { TopupCheckComponent } from './component/topup-check/topup-check.component';
import { TopupCheckDetailComponent } from './component/topup-check-detail/topup-check-detail.component';
import { WithdrawCheckComponent } from './component/withdraw-check/withdraw-check.component';
import { WithdrawCheckDetailComponent } from './component/withdraw-check-detail/withdraw-check-detail.component';
import { TwodbetRecordComponent } from './component/twodbet-record/twodbet-record.component';
import { ThreedbetRecordComponent } from './component/threedbet-record/threedbet-record.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ChangepasswordDetailComponent } from './component/changepassword-detail/changepassword-detail.component';
import { ServicephoneComponent } from './component/servicephone/servicephone.component';
import { ServicephoneDetailComponent } from './component/servicephone-detail/servicephone-detail.component';
import { TwodBetAmountLimitationComponent } from './component/twod-bet-amount-limitation/twod-bet-amount-limitation.component';
import { TwodBetAmountLimitationDetailComponent } from './component/twod-bet-amount-limitation-detail/twod-bet-amount-limitation-detail.component';
import { TwodBetAmountLimitationDetailUpdateComponent } from './component/twod-bet-amount-limitation-detail-update/twod-bet-amount-limitation-detail-update.component';
import { ThreedBetAmountLimitationComponent } from './component/threed-bet-amount-limitation/threed-bet-amount-limitation.component';
import { ThreedBetAmountLimitationDetailComponent } from './component/threed-bet-amount-limitation-detail/threed-bet-amount-limitation-detail.component';
import { ThreedBetAmountLimitationDetailUpdateComponent } from './component/threed-bet-amount-limitation-detail-update/threed-bet-amount-limitation-detail-update.component';

import { PromotionAndNewsComponent } from './component/promotion-and-news/promotion-and-news.component';
import { PromotionAndNewsDetailComponent } from './component/promotion-and-news-detail/promotion-and-news-detail.component';
import { TopupCheckDetailUpdateComponent } from './component/topup-check-detail-update/topup-check-detail-update.component';
import { TwodWinnersComponent } from './component/twod-winners/twod-winners.component';
import { ThreedWinnersComponent } from './component/threed-winners/threed-winners.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { FeedbackDetailComponent } from './component/feedback-detail/feedback-detail.component';
import { HolidayComponent } from './component/holiday/holiday.component';
import { HolidayDetailComponent } from './component/holiday-detail/holiday-detail.component';
import { ThreedResultConfigurationComponent } from './component/threed-result-configuration/threed-result-configuration.component';
import { ThreedResultConfigurationDetailComponent } from './component/threed-result-configuration-detail/threed-result-configuration-detail.component';
import {TwoReportComponent} from './component/twodreport/twodreport.component';
import {ThreeDReportComponent} from './component/threedreport/threedreport.component';
import { TwodWinnerListReportComponent } from './component/twodwinnerlistreport/twodwinnerlistreport.component';
import { ThreedWinnerListReportComponent } from './component/threedwinnerlistreport/threedwinnerlistreport.component';
import { UserStatementsReportComponent } from './component/userstatementsreport/userstatementsreport.component';
import { OddEntryComponent } from './component/oddentry/oddentry.component';
import { OddEntryDetailComponent } from './component/oddentry_detail/oddentry-detail.component';

import { CommissionCalculationComponent } from './component/commission-calculation/commission-calculation.component';
import { CommissionCalculationDetailComponent } from './component/commission-calculation-detail/commission-calculation-detail.component'
import { CommissionConfrimComponent } from './component/commission-comfirmation/commission-comfirmation.component';
import { AgentWithdrawCheckComponent } from './component/agent-withdraw-check-list/withdraw-check-list.component';
import { AgentWithdrawCheckDetailComponent } from './component/agent-withdraw-check-detail/agent-withdraw-check-detail.component'; 
import { AgentWithdrawAddNewComponent } from './component/agent-withdraw-add-new/agent-withdraw-check-new.component';

/*import { ConfirguationComponent } from './component/thai2d3d-confirguration/thai2d3d-confirguation.component';*/
import { TwoDDetailReportComponent } from './component/twoddetailreport/twoddetailreport.component';
import { ConfirguationListComponent } from './component/thai2d3d-confirguation-list/thai2d3d-confirguation-list.component';

import { from } from 'rxjs';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentDetailComponent } from './component/payment-detail/payment-detail.component';
import { NotificationsComponent } from './component/notification/notification.component';
import { NotificationListComponent } from './component/notification-list/notification-list.component';

import { AdsComponent } from './component/ads/ads.component';
import { AdsDetailComponent } from './component/ads-detail/ads-detail.component';

//paymentInfo
import {PaymentInfoComponent} from './component/payment_info/payment_info.component';
import {PaymentDetailInfoComponent} from './component/payment_info_detail/payment-detail-info.component';
import {FinancialReportComponent} from './component/userfinancialreport/userfinancialreport.component';
import { UserRegistrationComponent } from './component/userregistrationreport/userregistrationreport.component';
import { PromoterCommissionReportComponent } from './component/promotercommissionreport/promoter-commission-report.component';
import { FirstTopupReportComponent } from './component/firsttopupreport/firsttopup-report.component';
import { WinnerMonthlyReportComponent } from './component/winnerreportmonthly/winnerreport_monthly.component';
import { FirstTopupReportDailyComponent } from './component/firsttopupreport_daily/firsttopup-report-daily.component';
import { AccountHolderReportComponent } from './component/handle-amount-report/handle-amount-report.component';
import { Twod50PercentReportComponent } from './component/twodbet50percentreport/twodbet50percentreport.component';
import { Twod35PercentReportComponent } from './component/twodbetreport35percent/twodbet35percentreport.component';

import { BlockBankAccountComponent } from './component/blockbankaccount/blockbankaccount.component';
import { BlockBankAccountDetailComponent } from './component/blockbankaccount-detail/blockbankaccount-detail.component';
import {TwoBetLimitReportComponent} from './component/twod-bet-amount-limit-report/twod-bet-amount-limit-report.component';

import {CustomerServiceComponent} from './component/customer-service/customer-service.component';
import {CustomerServiceDetailComponent} from './component/customer-service-detail/customer-service-detail.component';

import {SalePromoterComponent} from './component/sale-promoter/sale-promoter.component';
import {SalePromoterDetailComponent} from './component/sale-promoter-detail/sale-promoter-detail.component';
import {ThreedBetLimitReportComponent} from './component/threed-bet-amount-limit-report/threed-bet-amount-limit-report.component';
import {GameComponent} from './component/awc-game/game.component';
import {AWCGameDetailComponent} from './component/awc-game-detail/awc-game-detail.component';
import {DiscountComponent} from './component/discount-entry/discount.component';
import {DiscountDetailComponent} from './component/discount-detail/discount-detail.component';
import {GSGameComponent } from './component/gs-game/gs-game.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GSDetailGameComponent } from './component/gs-game-detail/gs-game-detail.component';

import { PromotionAdsComponent } from './component/promotion-ads/promotion-ads.component';
import { PromotionAdsDetailComponent } from './component/promotion-ads-detail/promotion-ads-detail.component';

import { AccountHolderBeforeCleanReportComponent } from './component/handel-amount-report-beforeclean/handle-amount-beforeclean-report.component';
import {GSGameProviderComponent} from './component/game-provider/game-provider.component';
import {GameProviderDetailComponent} from './component/game-provider-detail/provider-detail.component';
import {GSGameAlertProviderComponent} from './component/game-alert/game-alert.component';
import {GameAlertDetailComponent} from './component/game-alert-detail/game-alert-detail.component';
import {DreamBookAddNewComponent} from './component/dream-book-addnew/dream-book-addnew.component';
import {DreamBookListComponent} from './component/dream-book-list/dream-book-list.component';
import {DreamBookUpdateComponent} from './component/dream-book-update/dream-book-update.component';
import {NeedHelpComponent} from './component/needhelp/need-help.component';
import {NeedHelpDetailComponent} from './component/needhelp-detail/need-help-detail.component';
import {WithdrawalBankAccReportComponent} from './component/withdrawal-bankacc-report/withdrawalbankacc-report.component';
import {MarqueeComponent} from './component/marquee/marquee.component';
import {MarqueeDetailComponent} from './component/marquee-component/marquee-component.component';
import {PointPromotionComponent } from './component/point-promotion/point-promotion.component';
import {PointPromotionDetailComponent } from './component/point-promotion-detail/point-promotion-detail.component';
import {TwodLiveResultComponent } from './component/twod-live-result/twod-live-result.component';
import { TwodLiveDetailComponent } from './component/twod-live-result-detail/twod-live-detail.component';
import { PointPromotionUsersComponent } from './component/point-promotion-users/point-promotion-users.component';
import { PointPromotionUserDetilsComponent } from './component/point-promotion-user-detils/point-promotion-user-detils.component';
import { PromotionConfirmedUsersComponent } from './component/promotion-confirmed-users/promotion-confirmed-users.component';
import { PromotionConfirmedUsersDetailComponent } from './component/promotion-confirmed-users-detail/promotion-confirmed-users-detail.component';
import { Version129PointUserListComponent } from './component/version129-point-user-list/version129-point-user-list.component';
import { Version129ConfirmedPointUserListComponent } from './component/version129-confirmed-point-user-list/version129-confirmed-point-user-list.component';
import { UserActivityReportComponent } from './component/user-activity-report/user-activity-report.component';
import { AdvertiseTeamListComponent } from './component/advertise-team-list/advertise-team-list.component';
import { AdvertiseTeamDetailComponent } from './component/advertise-team-detail/advertise-team-detail.component';
import { AdvertisingTeamAddComponent } from './component/advertising-team-add/advertising-team-add.component';
import { UserforgotpasswordComponent } from './component/userforgotpassword/userforgotpassword.component';
import { PromouserdatareportComponent } from './component/promouserdatareport/promouserdatareport.component';
import { UserforgotpassworddetailComponent } from './component/userforgotpassworddetail/userforgotpassworddetail.component';
  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotfoundComponent,
    WelcomeComponent,
    DashboardComponent,
    HeaderSidebarComponent,
    FooterComponent,
    AdminComponent,
    AdminDetailComponent,
    AgentComponent,
    AgentDetailComponent,
    UserComponent,
    UserDetailComponent,
    TwodComponent,
    TwodDetailComponent,
    ThreedComponent,
    ThreedDetailComponent,
    TopupCheckComponent,
    TopupCheckDetailComponent,
    WithdrawCheckComponent,
    WithdrawCheckDetailComponent,
    TwodbetRecordComponent,
    ThreedbetRecordComponent,
    ChangepasswordComponent,
    ChangepasswordDetailComponent,
    ServicephoneComponent,
    ServicephoneDetailComponent,
    TwodBetAmountLimitationComponent,
    TwodBetAmountLimitationDetailComponent,
    TwodBetAmountLimitationDetailUpdateComponent,
    ThreedBetAmountLimitationComponent,
    ThreedBetAmountLimitationDetailComponent,
    ThreedBetAmountLimitationDetailUpdateComponent,

    PromotionAndNewsComponent,
    PromotionAndNewsDetailComponent,
    TopupCheckDetailUpdateComponent,
    TwodWinnersComponent,
    ThreedWinnersComponent,
    FeedbackComponent,
    FeedbackDetailComponent,
    HolidayComponent,
    HolidayDetailComponent,
    ThreedResultConfigurationComponent,
    ThreedResultConfigurationDetailComponent,
    PaymentComponent,
    PaymentDetailComponent,
    TwoReportComponent,
    ThreeDReportComponent,
    TwodWinnerListReportComponent,
    ThreedWinnerListReportComponent,
    UserStatementsReportComponent,
    NotificationsComponent,
    NotificationListComponent,
    OddEntryComponent,
    OddEntryDetailComponent,
    
    CommissionCalculationComponent,
    CommissionCalculationDetailComponent,
    CommissionConfrimComponent,
    //ConfirguationComponent,
    AgentWithdrawCheckComponent,
    AgentWithdrawCheckDetailComponent, 
    AgentWithdrawAddNewComponent,
    
    ConfirguationListComponent,
    TwoDDetailReportComponent,
    AdsComponent,
    AdsDetailComponent,

    PaymentInfoComponent,
    PaymentDetailInfoComponent,

    FinancialReportComponent,
    UserRegistrationComponent,
    PromoterCommissionReportComponent,
    FirstTopupReportComponent,
    WinnerMonthlyReportComponent,
    FirstTopupReportDailyComponent,
    AccountHolderReportComponent,
    BlockBankAccountComponent,
    BlockBankAccountDetailComponent,
    Twod50PercentReportComponent,
    Twod35PercentReportComponent,
    TwoBetLimitReportComponent,
    MarqueeDetailComponent,
    CustomerServiceComponent,
    CustomerServiceDetailComponent,
    SalePromoterComponent,
    SalePromoterDetailComponent,
    ThreedBetLimitReportComponent,
    GameComponent,
    AWCGameDetailComponent,
    DiscountComponent,
    DiscountDetailComponent,
    GSGameComponent,
    GSDetailGameComponent,
    PromotionAdsComponent,
    PromotionAdsDetailComponent,
    AccountHolderBeforeCleanReportComponent,
    GSGameProviderComponent,
    GameProviderDetailComponent,
    GSGameAlertProviderComponent,
    GameAlertDetailComponent,
    DreamBookAddNewComponent,
    DreamBookListComponent,
    DreamBookUpdateComponent,
    NeedHelpComponent,
    NeedHelpDetailComponent,
    WithdrawalBankAccReportComponent,
    MarqueeComponent,
    PointPromotionComponent,
    PointPromotionDetailComponent,
    TwodLiveResultComponent,
    TwodLiveDetailComponent,
    PointPromotionUsersComponent,
    PointPromotionUserDetilsComponent,
    PromotionConfirmedUsersDetailComponent,
    PromotionConfirmedUsersComponent,
    Version129PointUserListComponent,
    Version129ConfirmedPointUserListComponent,
    UserActivityReportComponent,
    AdvertiseTeamListComponent,
    AdvertiseTeamDetailComponent,
    AdvertisingTeamAddComponent, 
    UserforgotpasswordComponent,
    PromouserdatareportComponent,
    UserforgotpassworddetailComponent  
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
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    NgxBootstrapMultiselectModule,
    NgMultiSelectDropDownModule.forRoot()
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
