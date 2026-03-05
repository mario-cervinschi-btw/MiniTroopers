import { Directive, inject, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appSaveForm]',
})
export class SaveFormDirective {
  @Input() saveMessage: string = '';

  @Input() openSnackBar: boolean = false;

  private snackBar = inject(MatSnackBar);

  ngOnChanges() {
    if (this.openSnackBar) {
      this.openSnack();
      // this.openSnackBar = false;
      this.saveMessage = '';
    }
  }

  openSnack() {
    this.snackBar.open(this.saveMessage, 'Dismiss');
  }
}
