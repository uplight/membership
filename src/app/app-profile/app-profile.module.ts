import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppUiModule} from '../app-ui/app-ui.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from '../material/app-material.module';
import {PersonalDataComponent} from './personal-data/personal-data.component';
import {PersonAddressComponent} from './person-address/person-address.component';
import {PersonFilesComponent} from './person-files/person-files.component';
import { PersonAgreementComponent } from './person-agreement/person-agreement.component';

import {FileProgressDialogComponent} from '../app-ui/file-progress-dialog/file-progress-dialog.component';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  exports: [
    PersonalDataComponent,
    PersonAddressComponent,
    PersonFilesComponent,
    PersonAgreementComponent
  ],
  declarations: [
    PersonalDataComponent,
    PersonAddressComponent,
    PersonFilesComponent,
    PersonAgreementComponent
  ],
  imports: [
    CommonModule,
    AppUiModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppMaterialModule,
    AppUiModule,
    NgxMaskModule.forRoot()
  ]
})
export class AppProfileModule { }
