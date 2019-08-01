import { Component, OnInit } from '@angular/core';
import {MembershipService} from '../membership.service';

import {SOSquadron, VOMember} from '../../models/cps-models';

@Component({
  selector: 'app-membership-preview',
  templateUrl: './membership-preview.component.html',
  styleUrls: ['./membership-preview.component.css']
})
export class MembershipPreviewComponent implements OnInit {

  applicationType;
  squadronId: string;
  mainApplicant: VOMember;
  description: string;
  userFiles: string[];
  family: VOMember[];
  squadron = {
    name: '',
    district: ''
  };
  constructor(
    private memberService: MembershipService
  ) { }

  ngOnInit() {
    this.applicationType = this.memberService.applicationType;
    // this.squadronId = this.memberService.selectedSquadron;

    if (this.squadronId) {
      const id = this.squadronId;
      this.memberService.getSquadrons().subscribe(squadrons => {
        const my: SOSquadron = squadrons.find(function(item) {
          return item.squadronId === id;
        });
        this.squadron = {
          name: my.nameEN,
          district: my.districtNameEN
        };
      });
    }
  //  this.mainApplicant = this.memberService.mainApplicant;
  //  this.family = this.memberService.familySub$.getValue();
  //  this.description = this.memberService.description;
   // if (this.memberService.userFiles)
   //   this.userFiles = this.memberService.userFiles.map(function(item) {
   //   return item.fileName;
   // });
  }

}
