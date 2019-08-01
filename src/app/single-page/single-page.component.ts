import {Component, OnInit} from '@angular/core';
import {PersonProfileService} from '../app-profile/person-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {combineLatest, forkJoin, merge} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {
  // isComplete;
  isValid;
  isFilesValid;
  isPersonalValid$;

  isPersonalDirty;

  constructor(
    public profileService: PersonProfileService,
    private snackBar: MatSnackBar,
    private location: Location,
    private translate: TranslateService,
    private roter: Router
  ) {

    this.isPersonalValid$ = combineLatest(this.profileService.isPersonValid$, this.profileService.isAddressValid$)
      .pipe(map((res) => {
        this.isPersonalDirty = true;
        return (res[0] && res[1]);
      }));

  }

  ngOnInit() {

    this.profileService.isAgree$.subscribe(v => {
      this.isValid = v;
    });
    const sub = this.profileService.personSub$.subscribe(person => {
      if (!person) return;

      setTimeout(() => {
        this.isPersonalDirty = false;
        if (sub) sub.unsubscribe();
      }, 200);
    });

  }


  onSubmitClick($event: MouseEvent) {
    this.isValid = false;
    this.profileService.saveDataOnServer().subscribe(res => {
      if (res.error) this.snackBar.open(res.message, 'x', {panelClass: 'error'});
      if (res.success) {
        this.translate.get('APPLICATION_SUBMITTED').toPromise().then(msg => {
          this.snackBar.open(msg, 'x', {panelClass: 'success', duration: 10000});
        });
        this.profileService.complete$.next(true);
        setTimeout(() => {
          this.roter.navigate(['/what-next'], {replaceUrl: true});
        }, 2000);
      }
    }, e => {
      this.snackBar.open(e.message, 'x', {panelClass: 'error', duration: 10000});
    });
  }

  onSavePersonalClick() {
    this.isPersonalDirty = false;
    this.profileService.saveDataOnServer().subscribe(async res => {
      if (res.success) {
        const msg = await this.translate.get('SUCCESS').toPromise();
        this.snackBar.open(msg, 'x', {duration: 2000, panelClass: 'success'});
      } else {
        const msg = await this.translate.get('ERROR').toPromise();
        this.snackBar.open(msg, 'x', {panelClass: 'error'});
      }


    }, async err => {
      const msg = await this.translate.get('ERROR').toPromise();
      this.snackBar.open(msg, 'x', {panelClass: 'error'});
    });

  }
}
