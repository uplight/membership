import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MembershipService} from '../membership.service';
import {PersonProfileService} from '../../app-profile/person-profile.service';

@Component({
  selector: 'app-membership-files',
  templateUrl: './membership-files.component.html',
  styleUrls: ['./membership-files.component.css']
})

export class MembershipFilesComponent implements OnInit {
  isValid$;
  constructor(
    private profileService: PersonProfileService,
    private memberService: MembershipService
  ) {

    this.isValid$ = this.profileService.isFilesValid$
  }

  ngOnInit() {

  }

}
