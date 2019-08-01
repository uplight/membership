import {AfterContentChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {slideInAnimation} from './app-com/animations';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './app-core/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'Profile';

  constructor(
    private auth: AuthService,
    private translateService: TranslateService
  ) {

  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    this.auth.error$.subscribe(error => {
      console.error(error);
    });
  }

  ngAfterContentChecked(): void {
    const head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
    const css = 'html {background: #333333;}';
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
  }
}


