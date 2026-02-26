import { Component, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UsersService } from '../../shared/services/users.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-settings',
  providers: [provideNativeDateAdapter()],
  imports: [
    WrapperComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private readonly userService: UsersService = inject(UsersService);
  private user?: User;
  protected isLoading: boolean = false;
  protected message: string = '';

  settingsForm = new FormGroup({
    profileForm: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      headline: new FormControl('', Validators.required),
      profileImage: new FormControl(''),
      dateOfBirth: new FormControl(''),
      location: new FormControl(''),
    }),
    contactForm: new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl(''),
      website: new FormControl(''),
    }),
    aboutForm: new FormGroup({
      about: new FormControl('', [Validators.minLength(20)]),
    }),
  });

  ngOnInit() {
    this.isLoading = true;
    this.userService
      .currentUser()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((user) => {
        this.user = user;
        Object.keys(this.settingsForm.controls).forEach((key) => {
          const group = this.settingsForm.get(key) as FormGroup;

          group.patchValue(user);
        });
      });
  }

  onSubmit() {
    if (!this.user) return;

    const merged = {
      ...this.settingsForm.value.profileForm,
      ...this.settingsForm.value.contactForm,
      ...this.settingsForm.value.aboutForm,
    };

    const sanitized = Object.fromEntries(
      Object.entries(merged).map(([key, value]) => [key, value ?? '']),
    );

    this.user = {
      ...this.user,
      ...sanitized,
    };

    this.message = '';
    this.isLoading = true;

    this.userService
      .updateUser(this.user)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.message = 'Successful update';
        },
        error: (err) => {
          this.message = err?.error?.message ?? 'An error occurred';
        },
      });
  }
}
