import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private sessionService: SessionService, public router: Router) { }

  /**
   * Returns an observable of the user login status.
   */
  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }
}
