import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonProfileService} from '../../app-profile/person-profile.service';
import {PersonalDataComponent} from '../../app-profile/personal-data/personal-data.component';
import {PersonFilesComponent} from '../../app-profile/person-files/person-files.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Location} from '@angular/common';

@Component({
  selector: 'app-files-step',
  templateUrl: './files-step.component.html',
  styleUrls: ['./files-step.component.css']
})
export class FilesStepComponent implements OnInit {

  @ViewChild('filesComponent', {static: true}) filesComponent: PersonFilesComponent;
  isValid$;
  uploadValid;
  constructor(
    private profileService: PersonProfileService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.isValid$ = profileService.isFilesValid$;
  }

  ngOnInit() {

  }

  testUploadClick() {
    this.uploadValid = false;
    this.profileService.uploadFilesOnServer().subscribe(res => {
      this.snackBar.open('FILES_UPLOAD_COMPLETE', 'x', {duration: 3000})
    });
  }

  onUploadValid($event: boolean) {
    this.uploadValid = $event;

  }

  onBack() {
    this.location.back()
  }
}
