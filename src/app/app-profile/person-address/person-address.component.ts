import {Component, OnDestroy, OnInit} from '@angular/core';
import {VOAddress, VOMemberSubscription, VOPerson} from '../../models/user-models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonProfileService} from '../person-profile.service';
import * as moment from '../personal-data/personal-data.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-person-address',
  templateUrl: './person-address.component.html',
  styleUrls: ['./person-address.component.css']
})
export class PersonAddressComponent implements OnInit, OnDestroy {

  addressForm: FormGroup;
  isValid = false;
  id;
  sub1;
  sub2;
  constructor(
    private fb: FormBuilder,
    private profileService: PersonProfileService
  ) {
    this.addressForm = fb.group({
      id: [0],
      address1: ['', [Validators.required]],
      address2: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      province: ['', [Validators.required]],
      postCode: ['', [Validators.required]]
    });
    this.sub2 = this.addressForm.valueChanges.subscribe(() => {
      this.profileService.addressValid = this.addressForm.valid;
      if(this.addressForm.dirty) {
        const copy: VOAddress = Object.assign({}, this.addressForm.value);
        copy.addressType = 'home';
        copy.dirty = true;
        this.profileService.setPersonAddress(copy);
      }
      this.isValid = this.addressForm.valid;
    });
  }

  ngOnInit() {
    this.sub1 = this.profileService.addressSub$
      .pipe(filter(v => !!v))
      .subscribe(addr => {
      this.id = addr.id;
      this.fillForm(addr);
      setTimeout(() => this.sub1.unsubscribe(), 100);
    });

  }

  private fillForm(a: VOAddress) {
    if (!a) {
      return;
    }
    this.addressForm.patchValue(a);
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.saveData();
  }

  saveData() {
    const copy: VOAddress = Object.assign({}, this.addressForm.value);
    copy.id = this.id;
    copy.addressType = 'home';
    this.profileService.setPersonAddress(copy);

  }


}
