import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private httpClient: HttpClient) { }

  public validateToken(token: string): Observable<boolean> {
    return this.httpClient.post<boolean>('api/auth/validateToken', { token });
  }
}
