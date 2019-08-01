import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService, VOLanguage} from '../../app-core/config.service';
import {AuthService} from '../../app-core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string;
  isSettings = true;
  logo: string;
  logoHeight: string;
  logoWidth: string;

  settingsPanelClass: string;
  language: VOLanguage = new VOLanguage();
  currentLanguage: string;
  languages: VOLanguage[];
  constructor(
    private configService: ConfigService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.configService.myConfig$.subscribe(cfg => {
      if (!cfg) return;
      this.languages = Object.values(cfg.languages).filter(function(item) {
        return item.show;
      });
    });

    this.auth.language$.subscribe(ln => {
      this.currentLanguage = ln;
      if (!this.languages || !ln) return;
      const lng = this.languages.find(function(item) {
        return item.index === ln;
      });
      this.language = lng;
      this.currentLanguage = lng.index;
    });
  }

  onSettingsClick() {
    this.isSettings = true; {
      setTimeout(() => {
        this.settingsPanelClass = 'open';
      }, 100);
    }


  }

  onCloseMemuClick() {
    this.settingsPanelClass = '' ;
    setTimeout(() => {
      this.isSettings = false;
    }, 700);
  }

  onLanguageChanged() {
    console.log(' language changed ', this.currentLanguage);
    this.auth.setLanguage(this.currentLanguage);

  }
}
