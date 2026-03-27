import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService, RegisterCredentials } from '../../core/services/auth.service';
import { catchError, take, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    WrapperComponent,
    MatFormField,
    MatLabel,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  protected errorMessage: string | null = null;
  protected successMessage: string | null = null;

  protected hide: boolean = true;
  protected readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  get disabledRegister() {
    return !this.registerForm.valid;
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onLoginClick() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    this.errorMessage = null;
    const credentials: RegisterCredentials = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
    };

    this.authService
      .register(credentials)
      .pipe(
        take(1),
        tap(() => {
          this.successMessage = 'Successful register. Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }),
        catchError((err) => (this.errorMessage = err.error.message)),
      )
      .subscribe();
  }
}
