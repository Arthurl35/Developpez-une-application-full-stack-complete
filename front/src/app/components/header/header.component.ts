import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sessionService: SessionService, public router: Router) { }



  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public isSmallScreen(): boolean {
    return window.innerWidth < 640; // Taille de l'écran "sm" en pixels
  }
}
