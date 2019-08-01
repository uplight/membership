import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../app-core/config.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyRight$: Observable<string>;
  constructor(
    private config: ConfigService
  ) { }

  ngOnInit() {
    this.copyRight$ = this.config.myConfig$.pipe(map(cfg => cfg.copyRight))
  }

}
