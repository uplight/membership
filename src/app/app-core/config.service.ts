import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

export class VOLanguage {
  index: string;
  icon: string;
  show: boolean;
}

export interface AppConfig {
  defaultLanguage: string;
  copyRight: string;
  languages: { [index: string]: VOLanguage };
  loginUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static instance: ConfigService;
  static translator: TranslateHttpLoader;
  myConfig$: BehaviorSubject<AppConfig> = new BehaviorSubject(null);

  static createTranslateLoader(http: HttpClient): TranslateHttpLoader {
    ConfigService.translator = new TranslateHttpLoader(http, '/language/', '.json');
    return ConfigService.translator;
  }

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {

    ConfigService.instance = this;
  }
  async loadConfig() {
    return this.http.get('/api/get-config/0').toPromise()
      .then(cfg => this.myConfig$.next(cfg as AppConfig));

  }

  async config(): Promise<AppConfig> {
    const cfg = this.myConfig$.getValue();
    if (cfg) {
      return Promise.resolve(cfg);
    }
    return new Promise((resolve, reject) => {
      this.myConfig$.subscribe(resolve, reject);
    });
  }


}
