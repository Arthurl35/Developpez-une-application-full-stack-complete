import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  /**
   * Intercepts the HTTP requests to add the JWT token to the headers if the user is logged in.
   * @param request
   * @param next
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.sessionService.isLogged) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.sessionInformation!.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
