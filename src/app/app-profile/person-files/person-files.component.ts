import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {PersonProfileService} from '../person-profile.service';
import {VOPersonFile} from '../../models/user-models';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {forkJoin, of, interval} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {FileProgressDialogComponent} from '../../app-ui/file-progress-dialog/file-progress-dialog.component';

@Component({
  selector: 'app-person-files',
  templateUrl: './person-files.component.html',
  styleUrls: ['./person-files.component.css']
})
export class PersonFilesComponent implements OnInit, OnDestroy {

  @Output() uploadValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  typeOfFile: string;
  makePicture = false;

  validDocuments: string[];
  totalSize = 0;
  classTotalSize = '';
  personFiles: VOPersonFile[] = [];
  classUpload = '';

  isValid$;
  maxUpload = 10000;
  sub1;
  sub2;

  isPleaseSelect = false;
  uploadReady = false;

  constructor(
    private profileService: PersonProfileService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {

    this.isValid$ = this.profileService.isFilesValid$
  }

  ngOnInit() {

    this.sub2 = this.profileService.personSub$.subscribe(person => {
      if (!person) {
        return;
      }
      const files = this.profileService.personFilesSub$.getValue();
      if (!files) this.profileService.getPersonFiles('application');
    });

    this.profileService.getListOfValidDocuments().subscribe(res => {
      this.validDocuments = res;
    });


    this.sub1 = this.profileService.personFilesSub$.subscribe(files => {
      if (!files) {
        return;
      }

      this.personFiles = files;
      this.checkValid();
      this.checkUploads();
      // console.log(files);
    });


  }

  onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    const files: FileList = evt.dataTransfer.files;
    const out: VOPersonFile[] = [];
    for (let i = 0, n = files.length; i < n; i++) {
      const file: File = files[i];
      const typeOfFile = this.typeOfFile;
      const belongs = 'application';
      const filename = file.name;
      const size = Math.round(file.size / 1000);
      const f: VOPersonFile = new VOPersonFile({filename, size, typeOfFile, belongs, file});
      out.push(f);
    }

    this.personFiles = this.personFiles.concat(out);
    this.profileService.setUploadFiles(this.personFiles);
    this.resetClass();
    this.calculateTotal();
  }

  calculateTotal() {
    const files = this.personFiles.filter(function (item) {
      return !item.id;
    });
    const size = Math.round(files.reduce(function (s, item) {
      s += item.file.size;
      return s;
    }, 0) / 1000);

    this.totalSize = size;
    if (size > this.maxUpload) {
      this.classTotalSize = 'accent';
    } else {
      this.classTotalSize = '';
    }
  }

  checkValid() {
    if(this.personFiles.length === 0) {
      this.profileService.isFilesValid$.next(false);
      return;
    }
    // this.profileService.filesValid = this.personFiles.length !== 0;

    const uploads = this.personFiles.filter(function (item) {
      return !item.id;
    });

    if (uploads.length) {
      this.profileService.isFilesValid$.next(false);
    } else {
      this.profileService.isFilesValid$.next(true);
    }

    // this.uploadValid.emit(true);



  //   console.log(types, size);

   // const isValid = types && size && (size < this.maxUpload);

   // this.uploadValid.emit(false);
   //
  }


  checkUploads() {
    const size = this.totalSize;
    const uploads = this.personFiles.filter(function (item) {
      return !item.id;
    });

    if(!uploads.length) {
      this.isPleaseSelect = false;
      this.uploadReady = false;
      return
    }

    const noTypes = uploads.every(function (item) {
      return !item.typeOfFile;
    });

    console.log('no types ' + noTypes);
    this.isPleaseSelect = noTypes;
    this.uploadReady = !noTypes;

  }

  onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = 'copy';
    if (this.classUpload !== 'over') {
      this.classUpload = 'over';
    }
  }

  resetClass() {
    setTimeout(() => {
      this.classUpload = '';
    }, 100);
  }

  onDragLeave($event: DragEvent) {
    this.resetClass();
  }

  async onDeleteFileClick(myFile: VOPersonFile) {
    const name = myFile.filename || myFile.typeOfFile;

    const message = (await this.translate.get('DO_YOU_WANT_REMOVE_FILE_P_FROM_UPLOADS').toPromise())
      .replace('{{name}}', name);

    if (!confirm(message)) {
      return;
    }

    let res;
    if (myFile.url) {
      try {
        res = await this.profileService.deleteFileFromServer(myFile);

      } catch (e) {
        this.snackBar.open('ERROR ' + e.message, 'x');

      }
    } else {
      res = true;
    }
    if (!res) {
      return;
    }

    const ind = this.personFiles.indexOf(myFile);

    if (ind !== -1) {
      this.personFiles.splice(ind, 1);
    }
    this.profileService.setUploadFiles(this.personFiles);
    this.calculateTotal();
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

 /* testUploadClick() {
    this.testValid = false;
    this.profileService.uploadFilesOnServer().subscribe(res => {
      this.snackBar.open('FILES_UPLOAD_COMPLETE', 'x', {duration: 3000})
    });
  }*/

  onTypeOfFileChange() {
   this.checkUploads();
   this.checkValid();
  }

  onCameraClick() {
    this.makePicture = !this.makePicture;

  }

  onCaptureFile($event: File) {
    const file: File = $event;
    const typeOfFile = this.typeOfFile;
    const belongs = 'application';
    const filename = file.name;
    const size = Math.round(file.size / 1000);
    const f: VOPersonFile = new VOPersonFile({filename, size, typeOfFile, belongs, file});
    this.personFiles.push(f);
    this.profileService.setUploadFiles(this.personFiles);
    this.calculateTotal();
    this.makePicture = false;
   //  this.checkValid();
  }


  testUploadClick() {
    console.log('testUploadClick');
    this.uploadReady = false;
    this.profileService.uploadFilesOnServer().subscribe( res => {

      console.log(res);

      //const msg = await this.translate.get('FILES_UPLOAD_COMPLETE').toPromise();
      //this.snackBar.open(msg, 'x', {duration: 3000, panelClass: 'success'})
    }, err => {
      this.uploadReady = true;
     // this.snackBar.open(err.message, 'x', {duration: 3000, panelClass: 'error'})
    }, () => {
      this.profileService.uploadDialog.close('SUCCESS');
      this.profileService.getPersonFiles('application');
    });

    /*const uploads = this.personFiles.filter(function (item) {
      return !!item.progress;
    });
*/
  }

  onBrowseChange($event) {
    console.log($event.target.files);
    const files: FileList =$event.target.files;
    const out: VOPersonFile[] = [];
    for (let i = 0, n = files.length; i < n; i++) {
      const file: File = files[i];
      const typeOfFile = this.typeOfFile;
      const belongs = 'application';
      const filename = file.name;
      const size = Math.round(file.size / 1000);
      const f: VOPersonFile = new VOPersonFile({filename, size, typeOfFile, belongs, file});
      out.push(f);
    }

    this.personFiles = this.personFiles.concat(out);
    this.profileService.setUploadFiles(this.personFiles);
    this.resetClass();
    this.calculateTotal();

  }
}
