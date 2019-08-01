import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { PersonOutletComponent } from './person-outlet/person-outlet.component';
import {AppMaterialModule} from '../material/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { PersonAgreementComponent } from './person-agreement/person-agreement.component';

import {AppUiModule} from '../app-ui/app-ui.module';
import {AppProfileModule} from '../app-profile/app-profile.module';
import {PersonalStepComponent} from './personal-step/personal-step.component';
import { AddressStepComponent } from './address-step/address-step.component';
import { FilesStepComponent } from './files-step/files-step.component';


export const profileRoutes: Routes = [
  {
    path: 'profile', component: PersonOutletComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'personal', component: PersonalStepComponent},
      {path: 'address', component: AddressStepComponent},
      {path: 'files', component: FilesStepComponent},
      {path: 'agreement', component: PersonAgreementComponent}

    ]
  }
];

@NgModule({
  declarations: [
    PersonOutletComponent,
    PersonAgreementComponent,
    PersonalStepComponent,
    AddressStepComponent,
    FilesStepComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(profileRoutes),
    AppMaterialModule,
    AppUiModule,
    AppProfileModule
  ]
})
export class PersonProfileModule { }
