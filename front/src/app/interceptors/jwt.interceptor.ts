import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  /**
   * Add the token to the request header
   * @param request
   * @param next
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const session = localStorage.getItem('session');
    if (session) {
      const sessionObject = JSON.parse(session);
      const token = sessionObject.token;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
