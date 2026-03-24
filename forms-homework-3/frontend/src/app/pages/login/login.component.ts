import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthCredentials, AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly authService = inject(AuthService);

  protected errorMessage: string | null = null;
  protected hide: boolean = true;
  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get disabledLogin() {
    return !this.loginForm.valid;
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  onRegisterClick() {
    this.router.navigate(['register']);
  }

  onSubmit() {
    this.errorMessage = null;
    const credentials: AuthCredentials = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authService
      .auth(credentials)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((token) => this.authService.setSessionToken(token.accessToken)),
        catchError((err) => (this.errorMessage = err.error.message)),
      )
      .subscribe();
  }
}
