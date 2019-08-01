import {Injectable} from '@angular/core';
import {AuthService} from '../app-core/auth.service';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {VOMembership, VOPerson} from '../models/user-models';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PersonProfileService} from '../app-profile/person-profile.service';
import {MemberState, SOSquadron, VOMember} from '../models/cps-models';
import {FileUpload} from '../models/app-models';

export enum MembershipFormTypes {
  INDIVIDUAL = 'INDIVIDUAL',
  APPLICANT = 'APPLICANT',
  FAMILY = 'FAMILY',
  FILES = 'FILES',
  SQUADRONS = 'SQUADRONS'
}

@Injectable()
export class MembershipService {

  membership$: BehaviorSubject<VOMembership> = new BehaviorSubject(null);
  family$: BehaviorSubject<VOMember[]> = new BehaviorSubject([]);

  mainApplicant$: BehaviorSubject<VOMember> = new BehaviorSubject(null);

  allSquadrons: SOSquadron[];
  applicationType: MembershipFormTypes;
  familyRoles$: BehaviorSubject<string[]> = new BehaviorSubject(['FAMILY_HEAD', 'CHILD', 'WIFE', 'OTHER']);
  memberTypes$: BehaviorSubject<string[]> = new BehaviorSubject(['REGULAR', 'OTHER']);
  memberState$: BehaviorSubject<string[]> = new BehaviorSubject(['FORMER_STUDENT', 'OTHER']);
  selectedSquadron$: BehaviorSubject<string> = new BehaviorSubject(null);


  isSquadronValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  save = true;

  familyForms: FormGroup[] = [];

  userFiles: {
    fileName: string,
    file: File,
    hdd: string
  } [] = [];

  validSub$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private profileService: PersonProfileService
  ) {
    profileService.personSub$.subscribe(person => {

    });

    /* const saved = localStorage.getItem('membershipApplication');
     if (saved) {
       this.save = true;
       const data: {
         mainApplicant
         familyMembers
         description
         squadron,
         applicationType
       } = JSON.parse(saved);
             */

    // this.selectedSquadron = data.squadron;
    // this.applicationType = data.applicationType;
    //}

  }

  downloadPerson() {
    this.profileService.downloadPerson();
  }

  setFilesData(data: { fileName: string, file: File, hdd: string } []) {
    this.userFiles = data;
  }

  isFamilyValid() {
    return false;
  }

  setFamilyMembers(family: VOMember[]) {
    this.family$.next(family);
  }

  setPersonData(i: number, person: VOPerson) {

    let members: VOMember[] = this.family$.getValue()
    let member: VOMember = members[i];
    member = Object.assign(member, person);
    // this.family$.next(members);

    // this.family$.next(ms);
  }


  setFormType(type: MembershipFormTypes) {
    this.applicationType = type;
  }

  addFamilyForm(form: FormGroup) {
    const ind = this.familyForms.indexOf(form);
    if (ind === -1) {
      this.familyForms.push(form);
    } else {
      console.warn(' form exists');
    }
  }

  /*removeFamilyForm(index: number, form: FormGroup) {

    const ind = this.familyForms.indexOf(form);
    if (ind !== -1) {
      this.familyForms.splice(ind, 1);
    }
    this.removeFamilyMember(index);
  }
*/

  /*setFamilyFromForms() {
    const familyMembers: VOMember[] = this.familyForms.map(function(item) {
      return new VOMember(item.value);
    });

    this.setFamilyMembers(familyMembers);
  }*/

  addFamilyMember() {

    let members: VOMember[] = this.family$.getValue();
    if (!members) members = [];
    members.push(new VOMember({
      firstName: '',
      lastName: '',
      language: 'en'
    }));
    this.family$.next(members)

  }

  removeFamilyMember(i: number) {
    const persons: VOMember[] = this.family$.getValue();
    persons.splice(i, 1);
    this.family$.next(persons);

  }

  async saveMembership() {
    console.log(' saveMembership  ');


  }

  /*setFamilyMember(index: number, member: VOMember) {
    if (index === -1) {
      this.mainApplicant = member;
    } else {
      this.familySub$.getValue()[index] = member;
    }
  }*/

  uploadFiles(files: FileUpload[]) {
    return this.auth.uploadIDs('uploads/membership', files);
  }


  getSquadrons() {
    if (this.allSquadrons) {
      return of(this.allSquadrons);
    }
    const url = 'api/json-data/squadrons';
    return this.auth.get(url).pipe(map((res: any) => {
      this.allSquadrons = res.data.results;
      return this.allSquadrons;
    }));
  }

  setSquadron(selectedSquadron: string) {
    this.selectedSquadron$.next(selectedSquadron);
  }

  getAllData() {
    return {
      mainApplicant: this.mainApplicant$.getValue(),
      family: this.family$.getValue(),
      squadron: this.selectedSquadron$.getValue()

    };
  }

  storeData() {
    if (!this.save) {
      return;
    }
    const data = this.getAllData();
    localStorage.setItem('membershipApplication', JSON.stringify(data));
  }

  saveData(saveData: boolean) {
    this.save = saveData;
    if (saveData) {
      this.storeData();
    } else {
      localStorage.removeItem('membershipApplication');
    }
  }
}
