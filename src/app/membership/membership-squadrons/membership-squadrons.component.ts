import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {MembershipService} from '../membership.service';
import {SOSquadron} from '../../models/cps-models';


@Component({
  selector: 'app-membership-squadrons',
  templateUrl: './membership-squadrons.component.html',
  styleUrls: ['./membership-squadrons.component.css']
})

export class MembershipSquadronsComponent implements OnInit, OnDestroy {

  isValid$;

  squadrons: { name: string, id: string, selected: boolean, district: string }[];

  selectedSquadronId: string;

  selectedSquadron: { name: string, id: string, selected: boolean, district: string } = {
    name: '',
    id: '',
    district: '',
    selected: false
  };


  constructor(
    private membersService: MembershipService,
    private location: Location
  ) {
    this.isValid$ = membersService.isSquadronValid$;
  }

  ngOnInit() {
    // this.selectedSquadronId = this.membersService.selectedSquadron;
    const id = this.selectedSquadronId;
    this.showSelectSquadron();
    this.membersService.getSquadrons().subscribe((data: SOSquadron[]) => {
      this.squadrons = data.map(function(item) {
        return {
          id: item.squadronId,
          name: item.nameEN,
          district: item.districtNameEN,
          selected: id === item.squadronId

        };
      });
      this.showSelectSquadron();
    });
  }

  onNextClick() {

  }

  showSelectSquadron() {
    const sel = this.selectedSquadronId;
    if (!sel || !this.squadrons) return;
    this.selectedSquadron = this.squadrons.find(function(item) {
      return item.id === sel;
    });

  }

  onSquadronSelected($event: {}) {
    this.membersService.setSquadron(this.selectedSquadronId);
    this.showSelectSquadron();
  }
  ngOnDestroy(): void {
    this.membersService.storeData();
  }

  onPrevClick() {
    this.location.back()
  }
}
