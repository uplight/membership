import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {PersonProfileService} from '../person-profile.service';
import {AuthService} from '../../app-core/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {merge} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-person-agreement',
  templateUrl: './person-agreement.component.html',
  styleUrls: ['./person-agreement.component.scss']
})
export class PersonAgreementComponent implements OnInit {

  isValid = true;
  isComplete = false;
  isFormValid = false;
  agree: boolean;
  agreement: SafeHtml;
  sub;

  formValid$;

  constructor(
    private profileService: PersonProfileService,
    protected sanitizer: DomSanitizer,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {

    this.formValid$ = merge(
      this.profileService.isAddressValid$,
      this.profileService.isPersonValid$,
      this.profileService.isFilesValid$).pipe(map(v => {
        if(!v && this.agree) {
          this.agree = false;
          this.profileService.agree = false;

        }
        return v
    }))
  }

  ngOnInit() {


    this.profileService.formValid$.subscribe(num => {
      this.isFormValid = num > 70;
    });

    this.auth.language$.subscribe(ln => {
      if (!ln) return;
      this.profileService.getAgreement(ln).then(data => {
        this.agreement = this.sanitizer.bypassSecurityTrustHtml(data);
      });
    });

    this.sub = this.profileService.formValid$.subscribe(valid => {
      this.isValid = (valid === 100);
    });
  }

  onSubmitClick($event: MouseEvent) {
    this.isValid = false;
    this.profileService.saveDataOnServer().subscribe(res => {
      if (res.error) this.snackBar.open(res.message, 'x', {panelClass: 'error'});
      if (res.success) {
        this.isComplete = true;
        this.translate.get('APPLICATION_SUBMITTED').toPromise().then(msg => {
          this.snackBar.open(msg, 'x', {panelClass: 'success', duration: 10000});
        });
        this.profileService.complete$.next(true);
      }
    });
  }

  onAgreeChange() {

    this.profileService.agree = this.agree;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.profileService.agree = false;
  }


}
