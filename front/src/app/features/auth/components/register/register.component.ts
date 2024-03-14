import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  /**
   * Indicates if there is an error.
   */
  public onError = false;

  /**
   * Form for user registration.
   */
  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.min(3),
        Validators.max(20)
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(3),
        Validators.max(40)
      ]
    ]
  });


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private matSnackBar: MatSnackBar) {
  }

  /**
   * Submits the registration request.
   */
  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
        next: (_: void) => this.router.navigate(['login']),
        error: error => this.matSnackBar.open('Une erreur s\'est produite ', 'Fermer', { duration: 3000 }),
      }
    );
  }

  public back(): void {
    window.history.back();
  }
}
