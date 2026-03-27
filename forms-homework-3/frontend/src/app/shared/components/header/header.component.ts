import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UiFacade } from '../../store/ui/ui.facade';
import { take } from 'rxjs';
import { AuthFacade } from '../../store/auth/auth.facade';

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
  protected readonly authFacade = inject(AuthFacade);
  protected readonly uiFacade = inject(UiFacade);

  handleDarkMode() {
    this.uiFacade.isDarkTheme$.pipe(take(1)).subscribe((val) => {
      this.uiFacade.updateDarkTheme(!val);
    });
  }
}
