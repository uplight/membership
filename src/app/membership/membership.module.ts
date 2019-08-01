import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MembershipOutletComponent } from './membership-outlet/membership-outlet.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AppMaterialModule} from '../material/app-material.module';
import { PersonFormFieldsComponent } from './person-form-fields/person-form-fields.component';
import {MembershipService} from './membership.service';
import { MembershipFamilyComponent } from './membership-family/membership-family.component';
import { MembershipPreviewComponent } from './membership-preview/membership-preview.component';
import { MembershipFilesComponent } from './membership-files/membership-files.component';
import { MembershipSquadronsComponent } from './membership-squadrons/membership-squadrons.component';
import { MembershipReviewComponent } from './membership-review/membership-review.component';
import { MembershipFeesComponent } from './membership-fees/membership-fees.component';
import { MembershipOrderComponent } from './membership-order/membership-order.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { MembershipFinalComponent } from './membership-final/membership-final.component';
import {PersonProfileModule} from '../person-profile/person-profile.module';
import {AppProfileModule} from '../app-profile/app-profile.module';
import { MembershipAddressStepComponent } from './membership-address-step/membership-address-step.component';
import {MembershipPersonalComponent} from './membership-personal/membership-personal.component';


export const memberRoutes: Routes = [
  {
    path: 'member', component: MembershipOutletComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'family', component: MembershipFamilyComponent},
      {path: 'address', component: MembershipAddressStepComponent},
      {path: 'personal', component: MembershipPersonalComponent},
      {path: 'files', component: MembershipFilesComponent},
      {path: 'squadron', component: MembershipSquadronsComponent},
      {path: 'review', component: MembershipReviewComponent},
      {path: 'preview', component: MembershipPreviewComponent},
      {path: 'fees', component: MembershipFeesComponent},
      {path: 'order', component: MembershipOrderComponent},
      {path: 'order-payment', component: OrderPaymentComponent},
      {path: 'payment-result', component: PaymentResultComponent},
      {path: 'final', component: MembershipFinalComponent}

    ]
  }
];


@NgModule({
  declarations: [
    MembershipOutletComponent,
    PersonFormFieldsComponent,
    MembershipFamilyComponent,
    MembershipPreviewComponent,
    MembershipFilesComponent,
    MembershipSquadronsComponent,
    MembershipReviewComponent,
    MembershipFeesComponent,
    MembershipOrderComponent,
    OrderPaymentComponent,
    PaymentResultComponent,
    MembershipFinalComponent,
    MembershipAddressStepComponent,
    MembershipPersonalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(memberRoutes),
    AppMaterialModule,
    AppProfileModule
  ],
  providers: [
    MembershipService
  ]
})
export class MembershipModule { }
