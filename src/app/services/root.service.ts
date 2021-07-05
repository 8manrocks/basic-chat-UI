import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Env } from 'src/models/root/env-model';
import { UrlHelper } from 'src/utils/url-helper';
import { landingPageKeys } from 'src/utils/landing-page-enums';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) { }

  getEnvUrls(): Observable<Env> {
    let headers = new HttpHeaders();
    headers = headers.append('loaderFor', 'app-root');
    return (this.http.get(environment.envUrl, {headers}) as Observable<Env>);
  }
  getPing(): Observable<any> {
    return (this.http.get(UrlHelper.getInstance().constructApi(landingPageKeys.ping)) as Observable<any>);
  }
}
