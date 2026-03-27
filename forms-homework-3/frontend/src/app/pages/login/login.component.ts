import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import { catchError, debounce, delay, filter, finalize, tap } from 'rxjs';
import { checkAuthToken } from '../../shared/store/auth/auth.actions';
import { AuthFacade } from '../../shared/store/auth/auth.facade';
import { jwtDecode } from 'jwt-decode';

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
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);

  private readonly authFacade = inject(AuthFacade);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  protected errorMessage: string | null = null;
  protected hide: boolean = true;
  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.authFacade.isLoggedIn$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((val) => val === true),
        tap((_) => {
          this.router.navigate(['/']);
        }),
      )
      .subscribe();
  }

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
        catchError((err) => (this.errorMessage = err.error.message)),
      )
      .subscribe();
  }
}
