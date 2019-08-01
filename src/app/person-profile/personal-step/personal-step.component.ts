import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonProfileService} from '../../app-profile/person-profile.service';
import {map} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {PersonalDataComponent} from '../../app-profile/personal-data/personal-data.component';

@Component({
  selector: 'app-personal-step',
  templateUrl: './personal-step.component.html',
  styleUrls: ['./personal-step.component.css']
})
export class PersonalStepComponent implements OnInit {

  @ViewChild('personalData', {static: true}) personalData: PersonalDataComponent;
  isDirty = false;
  isValid$;
  constructor(
    private profileService: PersonProfileService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.isValid$ = this.profileService.isPersonValid$;
    this.profileService.personSub$.subscribe(person => {
      if(!person) return;
      this.isDirty = this.personalData.profileForm.dirty;
    });

/*
    this.personalData.profileForm.valueChanges.subscribe(v => {
       this.isDirty = this.personalData.profileForm.dirty;
    })*/
  }

  onSaveClick() {
   // this.personalData.saveData();
    this.isDirty = false;
    this.profileService.saveDataOnServer().subscribe(async res => {
      const saved = await this.translate.get('SAVED').toPromise();
      this.snackBar.open(saved, 'x', {panelClass: 'success', duration: 3000})
    }, async err => {
      const error = await this.translate.get('ERROR').toPromise();
      this.snackBar.open(error,  'x', {panelClass: 'error'})
    })
  }
}
