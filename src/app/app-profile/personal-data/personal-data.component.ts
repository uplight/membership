import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonProfileService} from '../person-profile.service';
import {VOPerson} from '../../models/user-models';
import * as  moment from 'moment';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  person: VOPerson;

  @Input() family: VOPerson;

  @Output() onFormChange: EventEmitter<FormGroup> = new EventEmitter();

  mobnumPattern = /(\(?[0-9]{3}\)?-?\s?[0-9]{3}-?[0-9]{4})/;

  phoneFormControl = new FormControl('', [
    Validators.required
   // Validators.pattern(this.mobnumPattern)
  ]);

  sub1;
  sub2;
  isValid = false;

  constructor(
    private fb: FormBuilder,
    private profileService: PersonProfileService
  ) {

    this.profileForm = fb.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
     // language: ['', [Validators.required]],
     // gender:  ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
      phone2: ['']
    });

    this.sub2 = this.profileForm.valueChanges.subscribe(formValue => {
      if(this.patching) return;
      if(this.family) this.onFormChange.emit(this.profileForm);
      else {
        this.profileService.personValid = this.profileForm.valid;
        if(this.profileForm.dirty) {
          const copy: VOPerson = Object.assign({}, this.profileForm.value);
          copy.dirty = true;
          this.profileService.setPerson(copy);
        }
      }


    });

  }

  ngOnInit() {

    if(this.family) {
      console.log(this.family);
      this.person = this.family;
      this.fillForm();

    } else {

      this.profileService.downloadPerson();


      this.sub1 = this.profileService.personSub$.subscribe(p => {
        if (!p) return;
        if(this.sub1)this.sub1.unsubscribe();
        this.person = p;
        this.fillForm();
      });
    }



  }

  patching = false;
  private fillForm() {
    const p: VOPerson = this.person;

    if (!p) {
      return;
    }

    const birthday = p.birthday ? moment(p.birthday).format() : null;


    this.patching = true;
    this.profileForm.patchValue({
      firstName: p.firstName,
      lastName: p.lastName,
      middleName: p.middleName,
      email: p.email,
      birthday,
      phone: p.phone,
      phone2: p.phone2,
    //  gender: p.gender,
     // language: p.language
    }, {emitEvent: false});

    this.profileForm.markAsTouched();
    this.patching = false;
    this.profileService.personValid = this.profileForm.valid;
  }

  ngOnDestroy(): void {
    if(this.sub2) this.sub2.unsubscribe();
    if(this.sub1) this.sub1.unsubscribe();
   // if(!this.family) this.saveData();
  }

  /*saveData() {
    const copy: VOPerson = Object.assign({}, this.profileForm.value);
   // copy.birthday = moment(copy.birthday).format('YYYY-MM-DD');
    this.profileService.setPerson(copy);
  }*/
}
