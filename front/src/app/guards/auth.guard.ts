import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  /**
   * Redirects to the login page if the user is not logged in.
   * @returns A boolean indicating whether the route can be activated.
   */
  public canActivate(): boolean {
    if (!this.sessionService.isLogged) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
