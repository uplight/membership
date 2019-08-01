import { Component, OnInit } from '@angular/core';
import {PersonProfileService} from '../../app-profile/person-profile.service';

@Component({
  selector: 'app-membership-address-step',
  templateUrl: './membership-address-step.component.html',
  styleUrls: ['./membership-address-step.component.css']
})
export class MembershipAddressStepComponent implements OnInit {

  isValid$;
  constructor(
    private profileService: PersonProfileService
  ) {
    this.isValid$ = profileService.isAddressValid$;
  }

  ngOnInit() {

  }

}
