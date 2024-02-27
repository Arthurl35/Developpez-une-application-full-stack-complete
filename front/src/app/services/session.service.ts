import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  constructor() {
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
      this.isLogged = true;
      this.next();
    }
  }

  private clearSession(): void {
    localStorage.removeItem('session');
  }
}
