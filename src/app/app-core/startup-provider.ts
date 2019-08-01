import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthService} from './auth.service';
import {AppConfig, ConfigService} from './config.service';


export function startupProviderFactory(provider: StartupProvider) {
  return () => provider.load();
}


@Injectable()
export class StartupProvider {
  constructor(
    private configService: ConfigService
  ) {
  }

  public async load() {
   await this.configService.loadConfig();

  }
}
