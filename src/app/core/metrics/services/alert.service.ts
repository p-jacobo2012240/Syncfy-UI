import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AlertDomain } from '../domains/alert.domain';
import { AlertCreatorDomain } from '../domains/alert-creator.domain';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly API_URL = environment.syncfyManagement.apiURL;
  readonly PORT =  environment.syncfyManagement.port;
  readonly httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient
  ) { }

  alertsByOAuth(authId: Number) : Observable<AlertDomain[]> {
    return this.httpClient.get(`${this.API_URL}:${this.PORT}/metrics/alert/${authId}`)
      .pipe(
        map((response: any) => {
          (response as AlertDomain[]).map(alertDomain => {
            alertDomain.isValidForFilter = true;
            return alertDomain;
          });
          return response;
        })
      );
  }

  newAlert(alertCreator: AlertCreatorDomain) : void {
    this.httpClient.post(`${this.API_URL}:${this.PORT}/metrics/alert/new-alert`, alertCreator, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response as AlertDomain),
        catchError(e => throwError(e))
      ).subscribe(); 
  }

  deleteAlert(alertId: Number) : void {
    this.httpClient.delete(`${this.API_URL}:${this.PORT}/metrics/alert/${alertId}`)
    .subscribe();
  }

}
