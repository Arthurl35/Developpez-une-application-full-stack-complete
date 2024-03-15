import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { TokenApiService } from './token-api.service';
import {TokenValidationResponse} from "../interfaces/tokenValidation.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor(private tokenApiService: TokenApiService) {
    this.loadSession();
  }

  /**
   * Returns an Observable indicating whether the user is logged in.
   */
  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  /**
   * Logs in the user.
   * @param user
   */
  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.saveSession();
    this.next();
  }

  /**
   * Logs out the user.
   */
  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.clearSession();
    this.next();
  }

  /**
   * Returns the session information.
   * @private
   */
  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }

  /**
   * Saves the session to the local storage.
   * @private
   */
  private saveSession(): void {
    localStorage.setItem('session', JSON.stringify(this.sessionInformation));
  }

  /**
   * Loads the session from the local storage.
   * @private
   */
  private loadSession(): void {
    const session = localStorage.getItem('session');
    if (session) {
      this.sessionInformation = JSON.parse(session);
      this.validateToken();
      this.isLogged = true;
      this.next();
    }
  }

  /**
   * Validates the token on the server side.
   * @private
   */
  private validateToken(): void {
    if (this.sessionInformation?.token) {
      this.tokenApiService.validateToken(this.sessionInformation.token).subscribe(
        (response: TokenValidationResponse) : void => {
          if (!response.result) {
            this.logOut();
          }
        },
        (error: any) : void => {
          this.logOut();
        }
      );
    } else {
      this.logOut();
    }
  }

  /**
   * Clears the session from the local storage.
   * @private
   */
  private clearSession(): void {
    localStorage.removeItem('session');
  }
}
