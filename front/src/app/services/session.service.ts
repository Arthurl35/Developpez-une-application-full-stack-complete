import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { TokenService } from './token-api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor(private tokenService: TokenService) {
    this.loadSession();
  }

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.saveSession();
    this.next();
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.clearSession();
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }

  private saveSession(): void {
    localStorage.setItem('session', JSON.stringify(this.sessionInformation));
  }

  private loadSession(): void {
    const session = localStorage.getItem('session');
    if (session) {
      this.sessionInformation = JSON.parse(session);
      this.validateToken();
    }
  }

  private clearSession(): void {
    localStorage.removeItem('session');
  }

  private validateToken(): void {
    if (this.sessionInformation?.token) {
      this.tokenService.validateToken(this.sessionInformation.token).subscribe(
          (isValid: any) => {
          if (!isValid) {
            this.logOut(); // Log out if token is not valid
          }
        },
          (error: any) => {
          console.error('Token validation error:', error);
          this.logOut(); // Log out on token validation error
        }
      );
    } else {
      this.logOut(); // Log out if token is missing
    }
  }
}
