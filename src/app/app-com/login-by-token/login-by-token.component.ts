import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../app-core/auth.service';
import {ConfigService} from '../../app-core/config.service';

@Component({
  selector: 'app-login-by-token',
  templateUrl: './login-by-token.component.html',
  styleUrls: ['./login-by-token.component.css']
})
export class LoginByTokenComponent implements OnInit {

  isError: boolean;
  isSuccess: boolean;
  inProgress = true;
  message: string;
  redirectUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.config.config().then(cfg => {
      this.redirectUrl = cfg.loginUrl;
    });
    this.route.params.subscribe(params => {
      const tokenID = params.tokenID;
      // console.log(tokenID);
      this.auth.loginByToken(tokenID).subscribe(res => {
        console.log(res);
        this.isError = !!res.error;
        this.isSuccess = !! res.success;
        if (res.message) this.message = res.message;
        if (res.success) {

          this.router.navigateByUrl('/profile/personal');
        }
        this.inProgress = false;

      });
    });
  }

}
