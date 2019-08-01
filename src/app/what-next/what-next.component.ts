import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../app-core/config.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../app-core/auth.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-what-next',
  templateUrl: './what-next.component.html',
  styleUrls: ['./what-next.component.css']
})
export class WhatNextComponent implements OnInit {

  whatNext$:Observable<SafeHtml>;
  constructor(
    private config: ConfigService,
    private http: AuthService,
    protected sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const ln = this.http.language$.subscribe(ln =>{
      if(!ln) return
      this.whatNext$ =  this.http.loadText('/htm/what-next_' + ln +'.htm')
        .pipe(map(res =>this.sanitizer.bypassSecurityTrustHtml(res)))
    })

  }



 /* onWhatNextClick() {
    this.config.config().then(cfg => {
      window.location.href = cfg.profileWhatNextUrl;
    });

  }*/
}
