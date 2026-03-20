import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UiFacade } from '../../store/ui/ui.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly uiFacade = inject(UiFacade);

  handleDarkMode() {
    this.uiFacade.isDarkTheme$
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe((val) => {
        this.uiFacade.updateDarkTheme(!val);
      });
  }
}
