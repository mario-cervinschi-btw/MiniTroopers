import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiFacade } from './shared/store/ui/ui.facade';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  // private readonly authFacade = inject(AuthFacade);
  private readonly uiFacade = inject(UiFacade);

  protected readonly title = signal('forms-homework-project');

  ngOnInit(): void {
    // this.authFacade.init();
    this.uiFacade.isDarkTheme$.pipe().subscribe((val) => {
      document.documentElement.classList.toggle('dark-theme', val);
    });
  }
}
