import {Component, OnDestroy, OnInit} from '@angular/core';
import {MembershipFormTypes, MembershipService} from '../membership.service';
import {PersonProfileService} from '../../app-profile/person-profile.service';
import {MemberState, VOMember} from '../../models/cps-models';
import {BehaviorSubject} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {VOPerson} from '../../models/user-models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-membership-personal',
  templateUrl: './membership-personal.component.html',
  styleUrls: ['./membership-personal.component.css']
})
export class MembershipPersonalComponent implements OnInit, OnDestroy {
  isValid$;
  memberState: MemberState;
  isIndividual = 'true';
  isFamily = false;
  familyRole: string;
  familyRoles$;
  familyRoles = [];
  memberStates = [];
  //  student = 'no';
  family: VOMember[];
  headers = [];
  valids = [];
  main: VOMember;


  constructor(
    private memberService: MembershipService,
    private profileService: PersonProfileService,
    private snackBar: MatSnackBar
  ) {
    this.isValid$ = profileService.isPersonValid$
    this.familyRoles$ = memberService.familyRoles$
  }

  ngOnInit() {
    this.profileService.personSub$.subscribe(main => {
      console.log('main ', main);
      const props = {
        familyRole: this.familyRole,
        memberState: this.memberState
      };

      this.main = Object.assign(props, main) as VOMember;
      if (this.family) this.checkValidFamily();
      else {
        this.checkValidIndividual();
      }
    });

    this.memberService.family$.subscribe(family => {
      console.log('family ', family);
      if (!family) return;
      this.family = family;
      if (family.length) this.isFamily = true;
      setTimeout(() => this.checkValidFamily(), 500);
    });
  }

  onSaveClick() {
    if (!this.isFamily) this.memberService.family$.next([]);
    this.memberService.saveMembership().then(res => {
      console.log(res);
    });

  }

  ngOnDestroy(): void {
    if (!this.isFamily) this.memberService.family$.next([]);
  }

  onTypeChanged() {
    this.isFamily = this.isIndividual === 'false';
  }

  onAddClick() {
    this.memberService.addFamilyMember();
  }


  onFamilyFormChange(i: number, $event: FormGroup) {
    const person: VOPerson = $event.value;
    if ($event.dirty) {
      this.memberService.setPersonData(i, person);
    }

   // console.log(i, $event.valid);
    // this.headers[i] = $event.get('firstName').value
   // let isValid = $event.valid;
    // const form = $event.


    setTimeout(() => {
      this.checkValidFamily();
      this.valids[i] =  $event.valid? 'valid' : 'not-valid';
    }, 500);

  }

  onFamilyDeleteClick(i: number) {
    this.memberService.removeFamilyMember(i);
    console.log(i);

  }

  onFamilyRoleChanged(i: number, $event) {
    if (i === -1) this.updateMain();
    else {
      const member = this.family[i];
      console.log(i, member.familyRole);
    }

    this.checkValidFamily();
  }

  onMemberStateChanged(i, $event) {
    if (i === -1) this.updateMain();
    else {
      const member = this.family[i];
      console.log(i, member.memberState);
    }
  }

  timeout;

  checkValidFamily() {
    if (this.timeout) return;
    if (!this.main || this.family.length === 0) return;
    this.timeout = setTimeout(() => {
      this._checkValidFamily();
      this.timeout = null;
    }, 500)
  }

  private _checkValidFamily() {

    console.log('check  family');

    const head = this.family.find(function (item) {
      return item.familyRole === 'FAMILY_HEAD'
    });

    if (head && this.familyRole === 'FAMILY_HEAD') {
      this.snackBar.open('2 heads', 'x', {duration: 3000});
      return;
    }

    if (!head && this.familyRole !== 'FAMILY_HEAD') {
      this.snackBar.open('1 head should be selected', 'x', {duration: 3000});
      return
    }



    // this.valids[i] = isValid ? 'valid' : 'not-valid';

  }

  updateMain() {
    this.memberService.mainApplicant$.next(this.main);
  }

  checkValidIndividual() {
    console.log('check  individual');
  }


}
