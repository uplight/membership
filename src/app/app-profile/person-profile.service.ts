import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, forkJoin, from, Observable, of, Subject} from 'rxjs';
import {VOAddress, VOPerson, VOPersonFile} from '../models/user-models';
import {AuthService} from '../app-core/auth.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {concatMap, delay, filter, map, mergeMap, switchMap} from 'rxjs/operators';
import {mysqlTime} from '../app-com/utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FileUpload} from '../models/app-models';
import {FileProgressDialogComponent} from '../app-ui/file-progress-dialog/file-progress-dialog.component';
import {HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonProfileService {

  complete$: Subject<boolean> = new Subject();
  personSub$: BehaviorSubject<VOPerson> = new BehaviorSubject(null);
  isPersonValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addressSub$: BehaviorSubject<VOAddress> = new BehaviorSubject(null);
  isAddressValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  personFilesSub$: BehaviorSubject<VOPersonFile[]> = new BehaviorSubject(null);
  isFilesValid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // isFilesToUpload$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isAgree$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  formValid$: BehaviorSubject<number> = new BehaviorSubject(0);
  agreement: string;

  uploadCanceled = false;
  uploadDialog: MatDialogRef<FileProgressDialogComponent>;

  set agree(v: boolean) {
    const p: VOPerson = this.personSub$.getValue();
    if (!p) return;
    p.submittedAt = v ? mysqlTime() : null;
    this.isAgree$.next(v);
    this.checkForm();
  }

  set filesValid(v: boolean) {
    this.isFilesValid$.next(v);
    this.checkForm();
  }

  set addressValid(v: boolean) {
    this.isAddressValid$.next(v);
    this.checkForm();
  }

  set personValid(v: boolean) {
    this.isPersonValid$.next(v);
    this.checkForm();
  }


  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }


  refresh() {
    const url = '/api/get-session';
    this.auth.get(url).subscribe(res => {
      const time = moment(res.data.cookie.expires).format('HH:mm');
      // console.log(time);
    });
  }

  downloadPerson() {
    this.auth.userID$.subscribe(id => {
      if (!id) {
        return;
      }
      const url = '/profile?address=home';
      this.auth.getID(url).subscribe(res => {
        if (res.success) {
          const person: VOPerson = new VOPerson(res.data);
          let address: VOAddress = new VOAddress();
          if (person.addresses && person.addresses.length) {
            address = person.addresses.find(function (item) {
              return item.addressType === 'home';
            });
          }
          const personAddress = res.data.addresses;
          this.personSub$.next(person);
          this.addressSub$.next(address);
        }
      }, err => {

        this.snackBar.open(err.message, 'x');

      });
    }, err => {


      this.snackBar.open(err.message, 'x');
    });


  }

  getListOfValidDocuments(): Observable<string[]> {
    const url = '/api/json-data/application-valid-documents';
    return this.auth.language$.pipe(filter(ln => !!ln),
      mergeMap(ln => this.auth.get(url + '_' + ln))
    ).pipe(map((res: any) => res.data));
  }


  setPersonAddress(copy: VOAddress) {
    //  console.log(copy);
    this.addressSub$.next(copy);
    sessionStorage.setItem('personAddress', JSON.stringify(copy));
  }

  setPerson(p: VOPerson) {
    sessionStorage.setItem('personProfile', JSON.stringify(p));
    this.personSub$.next(p);
  }

  setUploadFiles(userFiles: VOPersonFile[]) {
    this.personFilesSub$.next(userFiles);
    this.checkForm();
  }

  saveDataOnServer() {
    const filesUpload = this.uploadFilesOnServer();

    const url = '/profile';
    const profile: VOPerson = this.personSub$.getValue();
    profile.language = this.auth.language$.getValue();
    const address = this.addressSub$.getValue();
    if (address) {
      profile.addresses = [address];
    }

    return filesUpload.pipe(
      map(res => {
        //   console.warn(res);
        return res;
      }),
      concatMap(res => this.auth.postID(url, profile).pipe(map(res2 => {
        //  console.log(res);

        return res2;
      })))
    );
  }

  async getAgreement(ln?: string) {
    const url = '/htm/agreement_' + ln + '.htm';
    return this.auth.loadText(url).toPromise().then(res => {
      this.agreement = res;
      return res;
    });
  }


  uploadFilesOnServer(): Observable<any> {
    this.uploadCanceled = false;
    const files: VOPersonFile[] = (this.personFilesSub$.getValue() || []).filter(function (item) {
      return !item.id;
    });

   //  console.log(files);
    if (!files.length) {
      return new BehaviorSubject(null);
    }


    const uploads = files.map((item) => {
      item.progress = new Subject();
      return this.auth.uploadID('/upload/' + item.belongs + '/' + item.typeOfFile, item as FileUpload);
    });

   // console.log('uploads  ', files);
    this.uploadDialog = this.dialog.open(FileProgressDialogComponent, {
      data: files,
      width: '350px',
      disableClose: true
    });

    this.uploadDialog.afterClosed().subscribe(result => {
      if (result === 'CANCEL') {
        console.warn('CANCEL');
        this.uploadCanceled = true;
      }
    });

    return combineLatest(uploads).pipe(map((res: any) => {
      if (this.uploadCanceled) res.abort();
     // console.log('combineLatest ', res);

    }));
  }

  async deleteFileFromServer(file: VOPersonFile): Promise<boolean> {
    const userID = await this.auth.getUserId();
    const url = '/api/private/user/' + userID + '/upload/' + file.id;
    return this.auth.delete(url).toPromise().then(res => {
      return !!res.success;
    });
  }

  checkForm() {
    let sum = this.isPersonValid$.getValue() ? 25 : 0;
    sum += this.isAddressValid$.getValue() ? 25 : 0;
    sum += this.isFilesValid$.getValue() ? 25 : 0;
    sum += this.isAgree$.getValue() ? 25 : 0;
    this.formValid$.next(sum);
  }

  getPersonFiles(belongs: string) {
    const url = '/files/' + belongs;
    return this.auth.getID(url).subscribe(serverFiles => {
      if (serverFiles.success) {
        const myFiles = serverFiles.data.map(function (item: VOPersonFile) {
          return new VOPersonFile(item);
        });
        this.personFilesSub$.next(myFiles);
      }

    });

  }
}
