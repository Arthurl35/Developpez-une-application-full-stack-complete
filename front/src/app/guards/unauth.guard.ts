import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
export class UnauthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  /**
   * Redirects to the posts page if the user is already logged in.
   * @returns A boolean indicating whether the route can be activated.
   */
  public canActivate(): boolean {
    if (this.sessionService.isLogged) {
      this.router.navigate(['/posts']);
      return false;
    }
    return true;
  }
}
