import {Component, Inject, OnInit} from '@angular/core';
import {VOPersonFile} from '../../models/user-models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FileUpload} from '../../models/app-models';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-file-progress-dialog',
  templateUrl: './file-progress-dialog.component.html',
  styleUrls: ['./file-progress-dialog.component.scss']
})
export class FileProgressDialogComponent implements OnInit {

  files: FileUpload[];

  constructor(
    public dialogRef: MatDialogRef<FileProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VOPersonFile[],
    private translate: TranslateService
  ) {
    console.warn(data);
    this.files = data;
  }

  ngOnInit() {



  }

  async onCancelClick() {

    const msg = await this.translate.get('CANCEL_UPLOADS').toPromise();

    if(confirm(msg + '?')) this.dialogRef.close('CANCEL');
  }

  onComplete() {
    this.dialogRef.close('COMPLETE')
  }

}
