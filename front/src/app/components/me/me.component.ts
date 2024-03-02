import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit {

  public user: User | undefined;

  constructor(private router: Router,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar,
              private userService: UserService) {
  }

  public ngOnInit(): void {
    this.userService
      .getById(this.sessionService.sessionInformation!.id.toString())
      .subscribe((user: User) => this.user = user);
  }

  public back(): void {
    window.history.back();
  }



}
