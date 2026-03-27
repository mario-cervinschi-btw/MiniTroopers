import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { filter, pairwise, tap } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../shared/models/user.model';
import { websiteValidator } from '../../shared/validators/website-validator';
import { SettingsInfoDirective } from '../../shared/directives/settings-info.directive';
import { SaveFormDirective } from '../../shared/directives/save-form.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade } from '../../shared/store/auth/auth.facade';

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
    SettingsInfoDirective,
    SaveFormDirective,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly authFacade = inject(AuthFacade);

  private user: User | null = null;
  protected isLoading: boolean = false;

  protected message: string = '';

  protected readonly settingsForm = new FormGroup({
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
      website: new FormControl('', [websiteValidator]),
    }),
    aboutForm: new FormGroup({
      about: new FormControl('', [Validators.minLength(20)]),
    }),
  });

  ngOnInit() {
    this.authFacade.currentUser$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.user = user;
      Object.keys(this.settingsForm.controls).forEach((key) => {
        const group = this.settingsForm.get(key) as FormGroup;

        if (user) {
          group.patchValue(user);
        }
      });
    });

    this.authFacade.loadingCurrentUser$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((val) => (this.isLoading = val)),
      )
      .subscribe();

    this.authFacade.loadingUpdateCurrentUser$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        pairwise(),
        filter(([prev, curr]) => prev === true && curr === false),
      )
      .subscribe(() => {
        this.authFacade.errorUpdateCurrentUser$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((error) => {
            this.message = error || 'Updated Successfully';

            setTimeout(() => (this.message = ''), 100);
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

    this.authFacade.updateUser(this.user);
  }
}
