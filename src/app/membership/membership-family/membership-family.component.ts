import {Component, OnDestroy, OnInit} from '@angular/core';

import {MembershipFormTypes, MembershipService} from '../membership.service';
import {FormGroup} from '@angular/forms';
import {VOMember} from '../../models/cps-models';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-membership-family',
  templateUrl: './membership-family.component.html',
  styleUrls: ['./membership-family.component.css']
})
export class MembershipFamilyComponent implements OnInit, OnDestroy {

  student = 'no';
  family: VOMember[];
  familyRoles$ :BehaviorSubject<string[]>
  headers = [];
  valids = [];
  constructor(
    private memberService: MembershipService
  ) { }

  ngOnInit() {
    this.familyRoles$ = this.memberService.familyRoles$;

    this.memberService.family$.subscribe(family => {
      console.log(family);
      if(!family) return;

      this.family = family;
    });
  }

  onAddClick() {
    this.memberService.addFamilyMember();
  }

  onSaveClick() {
    this.memberService.saveMembership().then(res => {
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.memberService.storeData();
  }

  onFamilyFormChage(i: number, $event: FormGroup) {
    console.log(i, $event.valid);
    this.headers[i] = $event.get('firstName').value
    let isValid = $event.valid;
    // const form = $event.
    setTimeout(() => {
      this.valids[i] = isValid?'valid':'not-valid';
    }, 500);



  }
  onFamilyDeleteClick(i: number) {
    this.memberService.removeFamilyMember(i);
    console.log(i);

  }

  onFamilyRoleChanged(i: number, $event: {}) {
    console.log(this.family);
  }
}
