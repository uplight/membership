import {Component, OnInit} from '@angular/core';
import {PersonProfileService} from '../../app-profile/person-profile.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-person-outlet',
  templateUrl: './person-outlet.component.html',
  styleUrls: ['./person-outlet.component.css']
})
export class PersonOutletComponent implements OnInit {

  classPersonal = 'not-btn';
  classAddress = 'not-btn';
  classFiles = 'not-btn';
  classAgreement = 'not-btn';
  progressbarValue = 0;
  isValid = false;
  isComplete = false;

  constructor(
    private personService: PersonProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.personService.complete$.subscribe(complete => {
      this.isComplete = complete;
    });
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.renderButtons(evt.urlAfterRedirects);
      }
    });

    this.personService.formValid$.subscribe(num => {
      setTimeout(() => {
        this.progressbarValue = num;
        this.isValid = (num === 100);
      }, 100);


    });
    this.personService.downloadPerson();
  }

  renderButtons(path) {

    switch (path) {
      case '/profile/personal':
        this.classPersonal = 'not-btn';
        this.classAddress = 'not-btn';
        this.classFiles = 'not-btn';
        this.classAgreement = 'not-btn';
        break;
      case '/profile/address':
        this.classPersonal = 'btn';
        this.classAddress = 'not-btn';
        this.classFiles = 'not-btn';
        this.classAgreement = 'not-btn';
        break;
      case '/profile/files':
        this.classPersonal = 'btn';
        this.classAddress = 'btn';
        this.classFiles = 'not-btn';
        this.classAgreement = 'not-btn';
        break;

      case '/profile/agreement':
        this.classPersonal = 'btn';
        this.classAddress = 'btn';
        this.classFiles = 'btn';
        this.classAgreement = 'not-btn';
        break;
    }
  }

  onPersonalClick() {
    if (this.classPersonal === 'btn') {
      this.router.navigateByUrl('profile/personal');
    }
  }

  onAddressClick() {
    if (this.classAddress === 'btn') {
      this.router.navigateByUrl('profile/address');
    }
  }

  onFilesClick() {
    if (this.classFiles === 'btn') {
      this.router.navigateByUrl('profile/files');
    }
  }

  onAgreementClick() {

  }
}
