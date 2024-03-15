import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenApiService {

  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) {}

  /**
   * Validates the token on the server side.
   * @param token The token to validate.
   * @returns An Observable indicating whether the token is valid.
   */
  public validateToken(tokenValue: string): Observable<{ result : boolean }> {
    return this.httpClient.post<{ result : boolean }>(`${this.pathService}/validateToken`, { token: tokenValue });
  }
}
