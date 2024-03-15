import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, InjectionToken, Inject } from "@angular/core";
import { SessionService } from '../services/session.service';

// Define an InjectionToken for SessionService
export const SESSION_SERVICE_TOKEN = new InjectionToken<SessionService>('SESSION_SERVICE_TOKEN');

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(SESSION_SERVICE_TOKEN) private sessionService: SessionService) {}

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
