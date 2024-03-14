import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { SessionService } from 'src/app/services/session.service';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { AuthService } from '../../services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {


  public hide = true;

  /**
   * Form for user login.
   */
  public form = this.fb.group({
    usernameOrEmail: [
      '',
      [
        Validators.required,
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(3)
      ]
    ]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar) {
  }

  /**
   * Submits the login request.
   */
  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/posts']);
      },
      error: error => this.matSnackBar.open('Une erreur s\'est produite ', 'Fermer', { duration: 3000 }),
    });
  }

  /**
   * Navigates back to the previous page.
   */
  public back(): void {
    window.history.back();
  }
}
