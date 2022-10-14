import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthDomain, AuthDtoPayloadDomain } from '../domains/auth.domain';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  readonly API_URL = environment.syncfyManagement.apiURL;
  readonly PORT =  environment.syncfyManagement.port;

  constructor(
    private httpClient: HttpClient
  ) { }


}
