import {Observable, Subject} from 'rxjs';


export interface FileUpload {
  file: File;
  progress: Subject<number>;
  filename: string;
}
