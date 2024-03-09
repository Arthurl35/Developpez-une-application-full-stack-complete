import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoginOrRegisterRoute: boolean | undefined;

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginOrRegisterRoute = ['/login', '/register', '/me', '/404'].includes(event.urlAfterRedirects) || /^\/posts/.test(event.urlAfterRedirects ) || /^\/topics/.test(event.urlAfterRedirects );
      }
    });
  }
}
