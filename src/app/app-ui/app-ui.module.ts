import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TakePictureComponent} from './take-picture/take-picture.component';
import {AppMaterialModule} from '../material/app-material.module';
import {FileProgressDialogComponent} from './file-progress-dialog/file-progress-dialog.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  exports: [
    TakePictureComponent,
    FileProgressDialogComponent
  ],
  declarations: [
    TakePictureComponent,
    FileProgressDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule
  ],
  entryComponents:[
    FileProgressDialogComponent
  ]
})
export class AppUiModule { }
