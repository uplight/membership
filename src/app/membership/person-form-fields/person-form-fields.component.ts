import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VOPerson} from '../../models/user-models';
import {FormBuilder, FormControl, FormGroup, Validator, Validators, FormArray} from '@angular/forms';
import {MembershipFormTypes, MembershipService} from '../membership.service';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {VOMember} from '../../models/cps-models';

@Component({
  selector: 'app-person-form-fields',
  templateUrl: './person-form-fields.component.html',
  styleUrls: ['./person-form-fields.component.css']
})
export class PersonFormFieldsComponent implements OnInit, OnDestroy {

  @Input() formType: MembershipFormTypes;
  @Input() index = -1;

  @Input() person: VOMember;
  sub;
  profileForm: FormGroup;
  familyRoles$: BehaviorSubject<string[]>;
  membershipTypes: string[];

  constructor(
    private fb: FormBuilder,
    private memberService: MembershipService
  ) {

    //this.familyRoles = memberService.familyRoles;
    //this.membershipTypes = memberService.membershipTypes;

    /* this.profileForm = fb.group({
       email: ['', [Validators.required]],
       firstName: ['', [Validators.required]],
       lastName: ['', [Validators.required]],
       birthday: ['', [Validators.required]],
       language: ['', [Validators.required]],
       familyRole: ['FAMILY_HEAD', [Validators.required]]
     });
   }*/
  }


  ngOnInit() {
    if (this.index !== -1) {
      this.fillForm();
      this.memberService.addFamilyForm(this.profileForm);
    } else {
      // this.person = this.memberService.mainApplicant;
      this.fillForm();
    }

   /* this.sub = this.profileForm.valueChanges
      .pipe(
        map(res => {
          return res;
        })
      )
      .subscribe(formValues => {
        console.log(this.profileForm.valid);

        /!* const vals = Object.assign({}, formValues);
         console.log(vals.birthday);
         if (vals.birthday) {
           vals.birthday = moment(vals.birthday).format();
         }*!/

       // this.memberService.onFormChanges(this.profileForm, this.formType);

      });*/
  }

  private fillForm() {
    const p: VOMember = this.person;
    if (!p) return;
    this.profileForm.patchValue({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      birthday: p.birthday,
      language: p.language
    });
  }

  ngOnDestroy(): void {
   //  this.sub.unsubscribe();
  //   this.memberService.setFamilyMember(this.index, this.profileForm.value);

  }


  onRemoveClick() {
   //  this.memberService.removeFamilyForm(this.index, this.profileForm);
  }
}
