import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { UserTableFacade } from './shared/store/user-table/user-table.facade';
import { UiFacade } from './shared/store/ui/ui.facade';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WrapperComponent } from './shared/components/wrapper/wrapper.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, WrapperComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly uiFacade = inject(UiFacade);

  protected readonly title = signal('forms-homework-project');

  ngOnInit(): void {
    this.authFacade.init();
    this.uiFacade.isDarkTheme$.pipe().subscribe((val) => {
      document.documentElement.classList.toggle('dark-theme', val);
    });
  }
}
