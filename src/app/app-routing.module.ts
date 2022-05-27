import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UserforgotpasswordComponent } from './component/userforgotpassword/userforgotpassword.component';
import { UserforgotpassworddetailComponent } from './component/userforgotpassworddetail/userforgotpassworddetail.component';
import { PageNotfoundComponent } from './component/page-notfound/page-notfound.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {AuthGuard} from './service/auth.guard';
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
import { TopupCheckDetailUpdateComponent } from './component/topup-check-detail-update/topup-check-detail-update.component';
import { WithdrawCheckComponent } from './component/withdraw-check/withdraw-check.component';
import { WithdrawCheckDetailComponent } from './component/withdraw-check-detail/withdraw-check-detail.component';
import { TwodbetRecordComponent } from './component/twodbet-record/twodbet-record.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { ChangepasswordDetailComponent } from './component/changepassword-detail/changepassword-detail.component';
import { ServicephoneComponent } from './component/servicephone/servicephone.component';
import { ServicephoneDetailComponent } from './component/servicephone-detail/servicephone-detail.component';
import { TwodBetAmountLimitationComponent } from './component/twod-bet-amount-limitation/twod-bet-amount-limitation.component';
import { TwodBetAmountLimitationDetailComponent } from './component/twod-bet-amount-limitation-detail/twod-bet-amount-limitation-detail.component';
import {TwodBetAmountLimitationDetailUpdateComponent} from './component/twod-bet-amount-limitation-detail-update/twod-bet-amount-limitation-detail-update.component';

import { ThreedBetAmountLimitationComponent } from './component/threed-bet-amount-limitation/threed-bet-amount-limitation.component';
import { ThreedBetAmountLimitationDetailComponent } from './component/threed-bet-amount-limitation-detail/threed-bet-amount-limitation-detail.component';
import { ThreedBetAmountLimitationDetailUpdateComponent} from './component/threed-bet-amount-limitation-detail-update/threed-bet-amount-limitation-detail-update.component';

import { PromotionAndNewsComponent } from './component/promotion-and-news/promotion-and-news.component';
import { PromotionAndNewsDetailComponent } from './component/promotion-and-news-detail/promotion-and-news-detail.component';
import { TwodWinnersComponent } from './component/twod-winners/twod-winners.component';
import { ThreedbetRecordComponent } from './component/threedbet-record/threedbet-record.component';
import { ThreedWinnersComponent } from './component/threed-winners/threed-winners.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { FeedbackDetailComponent } from './component/feedback-detail/feedback-detail.component';
import { HolidayComponent } from './component/holiday/holiday.component';
import { HolidayDetailComponent } from './component/holiday-detail/holiday-detail.component';
import { ThreedResultConfigurationComponent } from './component/threed-result-configuration/threed-result-configuration.component';
import { ThreedResultConfigurationDetailComponent } from './component/threed-result-configuration-detail/threed-result-configuration-detail.component';
import { PaymentComponent } from './component/payment/payment.component';
import { PaymentDetailComponent } from './component/payment-detail/payment-detail.component';
import { TwoReportComponent } from './component/twodreport/twodreport.component';
import { ThreeDReportComponent } from './component/threedreport/threedreport.component';
import { TwodWinnerListReportComponent } from './component/twodwinnerlistreport/twodwinnerlistreport.component';
import { ThreedWinnerListReportComponent } from './component/threedwinnerlistreport/threedwinnerlistreport.component';
import { UserStatementsReportComponent } from './component/userstatementsreport/userstatementsreport.component';
import { NotificationListComponent } from './component/notification-list/notification-list.component';
import { NotificationsComponent } from './component/notification/notification.component';

import { OddEntryComponent } from './component/oddentry/oddentry.component';
import { OddEntryDetailComponent } from './component/oddentry_detail/oddentry-detail.component';

import { CommissionCalculationComponent } from './component/commission-calculation/commission-calculation.component';
import { CommissionCalculationDetailComponent } from './component/commission-calculation-detail/commission-calculation-detail.component';
import { CommissionConfrimComponent } from './component/commission-comfirmation/commission-comfirmation.component';
//import { ConfirguationComponent } from './component/thai2d3d-confirguration/thai2d3d-confirguation.component';
import { AgentWithdrawCheckComponent } from './component/agent-withdraw-check-list/withdraw-check-list.component';
import { AgentWithdrawCheckDetailComponent } from './component/agent-withdraw-check-detail/agent-withdraw-check-detail.component';
import { AgentWithdrawAddNewComponent } from './component/agent-withdraw-add-new/agent-withdraw-check-new.component';
import { PromoterCommissionReportComponent } from './component/promotercommissionreport/promoter-commission-report.component';
import { FirstTopupReportComponent } from './component/firsttopupreport/firsttopup-report.component';
import { WinnerMonthlyReportComponent } from './component/winnerreportmonthly/winnerreport_monthly.component';
import { FirstTopupReportDailyComponent } from './component/firsttopupreport_daily/firsttopup-report-daily.component';

import { AdsComponent } from './component/ads/ads.component';
import { AdsDetailComponent } from './component/ads-detail/ads-detail.component';
import { AdvertiseTeamListComponent } from './component/advertise-team-list/advertise-team-list.component';
import { AdvertiseTeamDetailComponent } from './component/advertise-team-detail/advertise-team-detail.component';
//paymentInfo
import {PaymentInfoComponent} from './component/payment_info/payment_info.component';
import {PaymentDetailInfoComponent} from './component/payment_info_detail/payment-detail-info.component';

import { ConfirguationListComponent } from './component/thai2d3d-confirguation-list/thai2d3d-confirguation-list.component';
import { TwoDDetailReportComponent } from './component/twoddetailreport/twoddetailreport.component';

import { FinancialReportComponent } from './component/userfinancialreport/userfinancialreport.component';
import { UserRegistrationComponent } from './component/userregistrationreport/userregistrationreport.component';
import { AccountHolderReportComponent } from './component/handle-amount-report/handle-amount-report.component';
import { Twod50PercentReportComponent } from './component/twodbet50percentreport/twodbet50percentreport.component';
import { Twod35PercentReportComponent } from './component/twodbetreport35percent/twodbet35percentreport.component';
import {TwoBetLimitReportComponent} from './component/twod-bet-amount-limit-report/twod-bet-amount-limit-report.component'
import { BlockBankAccountComponent } from './component/blockbankaccount/blockbankaccount.component';
import { BlockBankAccountDetailComponent } from './component/blockbankaccount-detail/blockbankaccount-detail.component';
import { MarqueeDetailComponent } from './component/marquee-component/marquee-component.component';
import {CustomerServiceComponent} from './component/customer-service/customer-service.component'
import {CustomerServiceDetailComponent} from './component/customer-service-detail/customer-service-detail.component';
import {SalePromoterComponent} from './component/sale-promoter/sale-promoter.component';
import {SalePromoterDetailComponent} from './component/sale-promoter-detail/sale-promoter-detail.component';
import {ThreedBetLimitReportComponent} from './component/threed-bet-amount-limit-report/threed-bet-amount-limit-report.component';
import { GameComponent } from './component/awc-game/game.component';
import { AWCGameDetailComponent } from './component/awc-game-detail/awc-game-detail.component';
import { DiscountComponent } from './component/discount-entry/discount.component';
import { DiscountDetailComponent } from './component/discount-detail/discount-detail.component';
import { GSGameComponent } from './component/gs-game/gs-game.component';
import { GSDetailGameComponent } from './component/gs-game-detail/gs-game-detail.component';

import { PromotionAdsComponent } from './component/promotion-ads/promotion-ads.component';
import { PromotionAdsDetailComponent } from './component/promotion-ads-detail/promotion-ads-detail.component';
import { AccountHolderBeforeCleanReportComponent } from './component/handel-amount-report-beforeclean/handle-amount-beforeclean-report.component';
import { GSGameProviderComponent } from './component/game-provider/game-provider.component';
import { GameProviderDetailComponent } from './component/game-provider-detail/provider-detail.component';
import { GSGameAlertProviderComponent } from './component/game-alert/game-alert.component';
import { GameAlertDetailComponent} from './component/game-alert-detail/game-alert-detail.component';
import { DreamBookAddNewComponent} from './component/dream-book-addnew/dream-book-addnew.component';
import { DreamBookListComponent} from './component/dream-book-list/dream-book-list.component';
import { DreamBookUpdateComponent} from './component/dream-book-update/dream-book-update.component';
import { NeedHelpComponent} from './component/needhelp/need-help.component';
import { NeedHelpDetailComponent} from './component/needhelp-detail/need-help-detail.component';
import {WithdrawalBankAccReportComponent} from './component/withdrawal-bankacc-report/withdrawalbankacc-report.component';
import {MarqueeComponent} from './component/marquee/marquee.component'; //PointPromotionComponent
import {PointPromotionComponent } from './component/point-promotion/point-promotion.component';
import { PointPromotionDetailComponent } from './component/point-promotion-detail/point-promotion-detail.component';
import {TwodLiveResultComponent } from './component/twod-live-result/twod-live-result.component';
import { TwodLiveDetailComponent } from './component/twod-live-result-detail/twod-live-detail.component';
import { PointPromotionUsersComponent } from './component/point-promotion-users/point-promotion-users.component';
import { PointPromotionUserDetilsComponent } from './component/point-promotion-user-detils/point-promotion-user-detils.component';
import { PromotionConfirmedUsersComponent } from './component/promotion-confirmed-users/promotion-confirmed-users.component';
import { PromotionConfirmedUsersDetailComponent } from './component/promotion-confirmed-users-detail/promotion-confirmed-users-detail.component';
import { Version129PointUserListComponent } from './component/version129-point-user-list/version129-point-user-list.component';
import { Version129ConfirmedPointUserListComponent } from './component/version129-confirmed-point-user-list/version129-confirmed-point-user-list.component';
import { UserActivityReportComponent } from './component/user-activity-report/user-activity-report.component';
import { PromouserdatareportComponent } from './component/promouserdatareport/promouserdatareport.component';
const routes: Routes = [
  {
    path: '', 
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'ad-login', component: LoginComponent
  },
  {
    path: 'userforgotpassword',component:UserforgotpasswordComponent
  },
  {
    path: 'userforgotpassworddetail/:id',component:UserforgotpassworddetailComponent
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'admin-list', component: AdminComponent, canActivate:[AuthGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin-detail', component: AdminDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin-detail/:id', component: AdminDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'agent-list', component: AgentComponent, canActivate:[AuthGuard]
  },
  {
    path: 'agent-detail', component: AgentDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'agent-detail/:id', component: AgentDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user-list', component: UserComponent, canActivate:[AuthGuard]
  },
  {
    path: 'user-detail/:id', component: UserDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-list', component: TwodComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-detail', component: TwodDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-detail/:id', component: TwodDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-list', component: ThreedComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-detail', component: ThreedDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-detail/:id', component: ThreedDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'topup-check-list', component: TopupCheckComponent, canActivate:[AuthGuard]
  },
  {
    path: 'topup-check-list/:id', component: TopupCheckComponent, canActivate:[AuthGuard]
  },
  {
    path: 'topup-check-detail', component: TopupCheckDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'topup-check-detail-update/:id', component: TopupCheckDetailUpdateComponent, canActivate:[AuthGuard]
  },
  {
    path: 'withdraw-check-list', component: WithdrawCheckComponent, canActivate:[AuthGuard]
  },
  {
    path: 'withdraw-check-list/:id', component: WithdrawCheckComponent, canActivate:[AuthGuard]
  },
  {
    path: 'withdraw-check-detail/:id', component: WithdrawCheckDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodbet-record-list', component: TwodbetRecordComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threedbet-record-list', component: ThreedbetRecordComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-bet-amount-limitation-list', component: TwodBetAmountLimitationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-bet-amount-limitation-detail', component: TwodBetAmountLimitationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-bet-amount-limitation-list', component: ThreedBetAmountLimitationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-bet-amount-limitation-detail', component: ThreedBetAmountLimitationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-bet-amount-limitation-detail/:id', component: ThreedBetAmountLimitationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-bet-amount-limitation-detail-update/:id', component: ThreedBetAmountLimitationDetailUpdateComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-bet-amount-limitation-detail-update/:id', component: TwodBetAmountLimitationDetailUpdateComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twod-winners-list', component: TwodWinnersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-winners-list', component: ThreedWinnersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'changepassword-list', component: ChangepasswordComponent, canActivate:[AuthGuard]
  },
  {
    path: 'changepassword-detail/:id', component: ChangepasswordDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'servicephone-list', component: ServicephoneComponent, canActivate:[AuthGuard]
  },
  {
    path: 'servicephone-detail', component: ServicephoneDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'servicephone-detail/:id', component: ServicephoneDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-and-news-list', component: PromotionAndNewsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-and-news-detail', component: PromotionAndNewsDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-and-news-detail/:id', component: PromotionAndNewsDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'feedback-list', component: FeedbackComponent, canActivate:[AuthGuard]
  },
  {
    path: 'feedback-detail/:id', component: FeedbackDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'holiday-list', component: HolidayComponent, canActivate:[AuthGuard]
  },
  {
    path: 'holiday-detail', component: HolidayDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'holiday-detail/:id', component: HolidayDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-result-configuration-list', component: ThreedResultConfigurationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-result-configuration-detail', component: ThreedResultConfigurationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threed-result-configuration-detail/:id', component: ThreedResultConfigurationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-list', component: PaymentComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-detail', component: PaymentDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-detail/:id', component: PaymentDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodreport', component: TwoReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threedreport', component: ThreeDReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodwinnerlistreport', component: TwodWinnerListReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threedwinnerlistreport', component: ThreedWinnerListReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'userstatementsreport', component: UserStatementsReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'notification', component: NotificationListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'notification-detail', component: NotificationsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'notification-detail/:id', component: NotificationsComponent, canActivate:[AuthGuard]
  },
  {
     path : 'oddentry',component: OddEntryComponent, canActivate:[AuthGuard]
  },
  {
    path: 'odd-detail', component: OddEntryDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'oddentry-detail/:id', component: OddEntryDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'commission', component: CommissionCalculationComponent, canActivate:[AuthGuard]
  },
  {
    path: 'commission-calculation', component: CommissionCalculationDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'commission-confirmation', component: CommissionConfrimComponent, canActivate:[AuthGuard]
  },
  {
    path: 'agent-withdraw', component: AgentWithdrawCheckComponent, canActivate:[AuthGuard]
  },
  {
    path: 'agent-withdraw-check-detail/:id', component: AgentWithdrawCheckDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'add-new-withdraw', component: AgentWithdrawAddNewComponent, canActivate:[AuthGuard]
  }, //AgentWithdrawCheckNewComponent
 /*{
    path: 'thai2d3d-configuration', component: ConfirguationComponent, canActivate:[AuthGuard]
  },*/   /*need to comment*/
  {
    path: 'confirguation-detail/:id', component: ConfirguationListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'confirguation-detail', component: ConfirguationListComponent, canActivate:[AuthGuard]
  },
  {
    path: 'detailtwodreport', component: TwoDDetailReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'ads-list', component: AdsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'ads-detail/:id', component: AdsDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'ads-detail', component: AdsDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-info', component: PaymentInfoComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-info-detail', component: PaymentDetailInfoComponent, canActivate:[AuthGuard]
  },
  {
    path: 'payment-info-detail/:id', component: PaymentDetailInfoComponent, canActivate:[AuthGuard]
  },
  {
    path: 'userfinancialreport', component: FinancialReportComponent, canActivate:[AuthGuard]
  },
  {
    path : 'userregistrationreport', component : UserRegistrationComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'promotercommissionreport', component: PromoterCommissionReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'firsttopupreport', component: FirstTopupReportComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'winnerreportmonthly', component: WinnerMonthlyReportComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'firsttopupreportdaily', component: FirstTopupReportDailyComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'bankaccountdetailreport', component: AccountHolderReportComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'block-bank-acc-list', component: BlockBankAccountComponent, canActivate:[AuthGuard]
  }, 
  {
    path: 'block-bankaccount-detail', component: BlockBankAccountDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodbethistoryrpt50percent', component: Twod50PercentReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodbethistoryrpt35percent', component: Twod35PercentReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'twodBetLimitReport', component: TwoBetLimitReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'marquee-detail', component: MarqueeDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'marquee-detail/:id', component: MarqueeDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'customer-service-list', component: CustomerServiceComponent, canActivate:[AuthGuard]
  },
  {
    path: 'customer-service-detail', component: CustomerServiceDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'customer-service-detail/:id', component: CustomerServiceDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'sale-promoter-list', component: SalePromoterComponent, canActivate:[AuthGuard]
  },
  {
    path: 'sale-promoter-detail', component: SalePromoterDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'sale-promoter-detail/:id', component: SalePromoterDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'threedbetlimitreport', component: ThreedBetLimitReportComponent, canActivate:[AuthGuard]
  },
  {
    path: 'game-list', component: GameComponent, canActivate:[AuthGuard]
  },
  {
    path: 'game-detail', component: AWCGameDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'game-detail/:id', component: AWCGameDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'discount-entry', component: DiscountComponent, canActivate:[AuthGuard]
  },
  {
    path: 'discount-detail/:id', component: DiscountDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'gs-game', component: GSGameComponent, canActivate:[AuthGuard]
  },
  {
    path: 'gsgame-detail/:id', component: GSDetailGameComponent, canActivate:[AuthGuard]
  },
  {
    path: 'gsgame-detail', component: GSDetailGameComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-ads-list', component: PromotionAdsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-ads-detail/:id', component: PromotionAdsDetailComponent, canActivate:[AuthGuard]
  },
  {
    path: 'promotion-ads-detail', component: PromotionAdsDetailComponent, canActivate:[AuthGuard]
  },
  {
   path :'bankaccountdetailreport-beforeclean', component:AccountHolderBeforeCleanReportComponent,canActivate:[AuthGuard]
  },
  {
    path :'game-provider', component:GSGameProviderComponent,canActivate:[AuthGuard]
   },
   {
    path :'provider-detail/:id', component:GameProviderDetailComponent,canActivate:[AuthGuard]
   },
   {
    path :'game-alert', component:GSGameAlertProviderComponent,canActivate:[AuthGuard]
   },
   {
    path :'game-alert-detail', component:GameAlertDetailComponent,canActivate:[AuthGuard]
   },
   {
    path :'game-alert-detail/:id', component:GameAlertDetailComponent,canActivate:[AuthGuard]
   },
   {
    path :'dream-book', component:DreamBookListComponent,canActivate:[AuthGuard]
   },
   {
    path :'dream-book-add-new', component:DreamBookAddNewComponent,canActivate:[AuthGuard]
   },
   {
    path :'dream-book-detail-update/:id', component:DreamBookUpdateComponent,canActivate:[AuthGuard]
   },
   {
    path :'needhelp', component:NeedHelpComponent,canActivate:[AuthGuard]
   },
   {
    path :'need-help-detail', component:NeedHelpDetailComponent,canActivate:[AuthGuard]
   },
   {
    path :'need-help-detail/:id', component:NeedHelpDetailComponent,canActivate:[AuthGuard]
   },
   {
    path :'withdrawalbankacc-report', component:WithdrawalBankAccReportComponent,canActivate:[AuthGuard]
   },
   {
    path :'marquee-list', component:MarqueeComponent,canActivate:[AuthGuard]
   },
   {
    path :'point-promotion', component:PointPromotionComponent, canActivate:[AuthGuard]
   },
   {
    path :'point-promotion-detail/:id', component: PointPromotionDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'twod-live-result', component: TwodLiveResultComponent, canActivate:[AuthGuard]
   },
   {
    path :'twod-live-detail', component: TwodLiveDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'twod-live-detail/:id', component: TwodLiveDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'point-promotion-users', component: PointPromotionUsersComponent, canActivate:[AuthGuard]
   },
  {
   path :'point-promotion-users-detail/:id', component: PointPromotionUserDetilsComponent, canActivate:[AuthGuard]
  },
  {
    path :'confirmed-promotion-users', component: PromotionConfirmedUsersComponent, canActivate:[AuthGuard]
   },
   {
     path :'confirmed-promotion-users-detail/:id', component: PromotionConfirmedUsersDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'v129promotionUsers', component: Version129PointUserListComponent, canActivate:[AuthGuard]
   },
   {
    path :'v129confirmedpromotionUsers', component: Version129ConfirmedPointUserListComponent, canActivate:[AuthGuard]
   },
   {
    path :'useractivityreport', component: UserActivityReportComponent, canActivate:[AuthGuard]
   },
   {
    path :'advertise-team-list', component: AdvertiseTeamListComponent, canActivate:[AuthGuard]
   },
   {
    path :'advertise-team-detail/:id', component: AdvertiseTeamDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'advertise-team-detail', component: AdvertiseTeamDetailComponent, canActivate:[AuthGuard]
   },
   {
    path :'promouserdatareport',component:PromouserdatareportComponent,canActivate:[AuthGuard]
   },
   {
    path: '**', component: PageNotfoundComponent
   },
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
