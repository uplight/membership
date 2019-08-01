import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './app-com/header/header.component';
import {LoginByTokenComponent} from './app-com/login-by-token/login-by-token.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppMaterialModule} from './material/app-material.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ConfigService} from './app-core/config.service';
import {StartupProvider, startupProviderFactory} from './app-core/startup-provider';
import {PersonProfileModule} from './person-profile/person-profile.module';
import {AppUiModule} from './app-ui/app-ui.module';
import {MembershipModule} from './membership/membership.module';
import {AppProfileModule} from './app-profile/app-profile.module';
import { FooterComponent } from './app-com/footer/footer.component';
import { SinglePageComponent } from './single-page/single-page.component';
import {NgxMaskModule} from 'ngx-mask';
import { FileProgressDialogComponent } from './app-ui/file-progress-dialog/file-progress-dialog.component';
import {WhatNextComponent} from './what-next/what-next.component';

export const appRoutes: Routes = [
  {path: 'app-login/:tokenID', component: LoginByTokenComponent},
  {path: '', redirectTo: 'application', pathMatch: 'full'},
  {path: 'application', component: SinglePageComponent},
  {path: 'what-next', component: WhatNextComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginByTokenComponent,
    FooterComponent,
    SinglePageComponent,
    WhatNextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    AppMaterialModule,
    AppUiModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: ConfigService.createTranslateLoader,
        deps: [HttpClient],
      },
      useDefaultLang: true
    }),
    PersonProfileModule,
    MembershipModule,
    AppProfileModule
  ],
  providers: [
    StartupProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: startupProviderFactory,
      deps: [StartupProvider],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
