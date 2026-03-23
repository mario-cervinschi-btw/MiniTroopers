import { Directive, inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appSettingsInfo]',
  host: {
    '(click)':
      'openSnackBar(appSettingsInfo ?? "Please fill in all (required) fields correctly.", "Dismiss")',
  },
})
export class SettingsInfoDirective {
  @Input() appSettingsInfo: string | null = null;

  private readonly snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
