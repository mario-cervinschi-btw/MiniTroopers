import { Directive, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appSaveForm]',
  // host: {
  // '(click)': 'openSnack()',
  // },
})
export class SaveFormDirective implements OnChanges {
  @Input() appSaveForm: string = 'N/A';

  private snackBar = inject(MatSnackBar);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appSaveForm'] && !changes['appSaveForm'].firstChange) {
      this.openSnack();
    }
  }

  openSnack() {
    this.snackBar.open(this.appSaveForm, 'Dismiss');
  }
}
