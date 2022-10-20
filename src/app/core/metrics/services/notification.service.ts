import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NotificationDomain } from '../domains/notification.domain';
import { NotificationCreatorDomain } from '../domains/notification-creator.domain';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  readonly API_URL = environment.syncfyManagement.apiURL;
  readonly PORT =  environment.syncfyManagement.port;
  readonly httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private httpClient: HttpClient
  ) { }

  notificationByOAuth(authId: Number) : Observable<NotificationDomain[]> {
    return this.httpClient.get(`${this.API_URL}:${this.PORT}/metrics/notification/${authId}`)
      .pipe(
        map((response: any) => {
          (response as NotificationDomain[]).map(notDomain => {
            notDomain.isValidForFilter = true;
            return notDomain;
          });
          return response;
        })
      );
  }

  newNotification(notificationCreator: NotificationCreatorDomain) : void {
    this.httpClient.post(`${this.API_URL}:${this.PORT}/metrics/notification/new-notification`, 
      notificationCreator, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response as NotificationDomain),
        catchError(e => throwError(e))
      ).subscribe(); 
  }

  deleteNotification(alertId: Number) : void {
    this.httpClient.delete(`${this.API_URL}:${this.PORT}/metrics/notification/${alertId}`)
    .subscribe();
  }

}
