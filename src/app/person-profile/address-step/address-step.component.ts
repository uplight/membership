import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonProfileService} from '../../app-profile/person-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {PersonalDataComponent} from '../../app-profile/personal-data/personal-data.component';
import {PersonAddressComponent} from '../../app-profile/person-address/person-address.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-address-step',
  templateUrl: './address-step.component.html',
  styleUrls: ['./address-step.component.css']
})
export class AddressStepComponent implements OnInit {
  @ViewChild('addressComponent', {static: true}) addressComponent: PersonAddressComponent;
  isDirty = false;
  isValid$;
  constructor(
    private profileService: PersonProfileService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private location: Location

  ) {
    this.isValid$ = profileService.isAddressValid$;
  }

  ngOnInit() {
    this.addressComponent.addressForm.valueChanges.subscribe(v => {
      this.isDirty =  this.addressComponent.addressForm.dirty;
    })

  }

  onSaveClick() {
    this.addressComponent.saveData();
    this.isDirty = false;
    this.profileService.saveDataOnServer().subscribe(async res => {
      const saved = await this.translate.get('SAVED').toPromise();
      this.snackBar.open(saved, 'x', {panelClass: 'success', duration: 3000})
    }, async err => {
      const error = await this.translate.get('ERROR').toPromise();
      this.snackBar.open(error,  'x', {panelClass: 'error'})
    })
  }

  onBack() {
    this.location.back()
  }
}

