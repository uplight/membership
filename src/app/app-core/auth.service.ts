import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, filter, map} from 'rxjs/operators';
import {AppConfig, ConfigService} from './config.service';
import {TranslateService} from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FileUpload} from '../models/app-models';


export interface SOResponse {
  data: any;
  success: string;
  error: string;
  message: string;
  redirect: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  on401$ = new Subject();
  private userID: number;
  userID$: BehaviorSubject<number> = new BehaviorSubject(0);
  language$: BehaviorSubject<string>;
  error$: Subject<{ error: string, message: string }> = new Subject();

  get userUrl(): string {
    return '/api/private/user/' + this.userID;
  }

  static toQuery(obj) {
    const ar = Object.keys(obj);
    return ar.map(function (item) {
      return item + '=' + obj[item];
    }).join('&');
  }

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private snackBar: MatSnackBar,
    private transalate: TranslateService
  ) {

    let ln = null;
    const ind = window.location.hash.indexOf('language=');
    if (ind !== -1) ln = window.location.hash.substr(ind + 9, 2);
    this.language$ = new BehaviorSubject(ln);
    this.language$.pipe(filter(v => !!v));
    this.whoAmI().subscribe((res: SOResponse) => {
      if (res.redirect) {
        window.location.href = res.redirect;
      } else if (res.success) {
        this.userID = +res.data.id;
        this.userID$.next(res.data.id);
        if (!this.language$.getValue()) {
          console.log('defining language');
          let ln = res.data.language;
          if (!ln) {
            this.config.myConfig$.subscribe((cfg: AppConfig) => {
              if (!cfg) {
                return;
              }
              ln = cfg.defaultLanguage;
              this.language$.next(ln);
            });
          } else {
            this.language$.next(ln);
          }
        }

        return res.data;
      }
    });

    this.on401$.subscribe(async err => {
      const msg: string = await this.transalate.get('AUTH_PROBLEM_REDIRECT').toPromise();
      if (confirm(msg)) window.location.href = this.config.myConfig$.getValue().loginUrl

    });

    this.language$.subscribe(ln => {
      this.transalate.use(ln);
    })
  }

  async getUserId(): Promise<number> {
    if (this.userID) {
      Promise.resolve(this.userID);
    }
    return new Promise((resolve, reject2) => {
      this.userID$.subscribe(id => {
        if (!id) {
          return;
        }
        resolve(id);
      }, reject2);
    });

  }

  onError(err) {
    if (err.status === 401) {
      this.on401$.next({error: 'Unauthorized', message: 'PLEASE_LOGIN'})
    }
    return of(err);
  }

  async getLanguage(): Promise<string> {
    const lng = this.language$.getValue();
    if (lng) {
      return Promise.resolve(lng);
    }
    return new Promise((resolve, reject2) => {
      this.language$.subscribe(ln => {
        if (!ln) {
          return;
        }
        resolve(ln);
      }, reject2);
    });
  }

  whoAmI() {
    const url = '/api/private/user/whoami';
    return this.http.get(url);
  }

  loginByToken(tokenID: string): Observable<SOResponse> {
    const url = '/api/login-by-token/' + tokenID;
    return this.http.get(url) as Observable<SOResponse>;
  }

  getID(url: string, params?: { [index: string]: string }): Observable<SOResponse> {
    url = this.userUrl + url;
    if (params) {
      url += '?' + AuthService.toQuery(params);
    }
    return this.http.get(url).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  postID(url, data: any): Observable<SOResponse> {
    url = this.userUrl + url;
    return this.http.post(url, data).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  putID(url: string, data: any): Observable<SOResponse> {
    url = this.userUrl + url;
    return this.http.put(url, data).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  patchID(url: string, data: any): Observable<SOResponse> {
    url = this.userUrl + url;
    return this.http.patch(url, data).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  deleteID(url: string): Observable<SOResponse> {
    url = this.userUrl + url;
    return this.http.delete(url).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  uploadID(url: string, file: FileUpload) {
    url = this.userUrl + url;
    return this.upload(url, file);
  }

  uploadIDs(url: string, files: FileUpload []) {
    url = this.userUrl + url;
    return this.uploads(url, files);
  }

  get(url: string, params?: { [index: string]: string }): Observable<SOResponse> {
    if (params) {
      url += '?' + AuthService.toQuery(params);
    }
    return this.http.get(url).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  post(url, data: any): Observable<SOResponse> {
    return this.http.post(url, data).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
  }

  put(url: string, data: any) {
    return this.http.put(url, data);
  }

  patch(url: string, data: any) {
    return this.http.patch(url, data).pipe(catchError(this.onError.bind(this))) as Observable<SOResponse>;
    ;
  }

  delete(url: string): Observable<SOResponse> {
    return this.http.delete(url) as Observable<SOResponse>;
  }

  upload(url: string, upload: FileUpload): Observable<any> {
    // TODO test with HttpClient POST is progress works
    if (!upload.progress) upload.progress = new Subject();
    const formData: FormData = new FormData();
    const file: File = upload.file;
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });


    const http = this.http.request(req);
    return http.pipe(map(function (evt: any, data,) {
      if (evt.type === HttpEventType.UploadProgress) {
        upload.progress.next(Math.round(100 * evt.loaded / evt.total));

      } else if (evt instanceof HttpResponse) {
        upload.progress.complete();

      }
      return http;
    }));
    // return progress;
  }

  uploads(url: string, files: FileUpload []) {
    const status: { [key: string]: Observable<number> } = {};
    return files.map(file => {
      return this.upload(url, file);
    });

  }

  loadText(url: string): Observable<string> {
    return this.http.get(url, {responseType: 'text'});
  }

  setLanguage(currentLanguage: string) {
    console.log(' set language ', currentLanguage);
    this.language$.next(currentLanguage);
  }
}

