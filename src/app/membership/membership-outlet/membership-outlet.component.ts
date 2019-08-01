import { Component, OnInit } from '@angular/core';
import {MembershipService} from '../membership.service';

@Component({
  selector: 'app-membership-outlet',
  templateUrl: './membership-outlet.component.html',
  styleUrls: ['./membership-outlet.component.css']
})
export class MembershipOutletComponent implements OnInit {

  saveData;
  constructor(
    private memberService: MembershipService
  ) {
    this.saveData = memberService.save;
  }

  ngOnInit() {
    this.memberService.downloadPerson();
  }

  onSaveChange() {
    this.memberService.saveData(this.saveData);
  }
}
