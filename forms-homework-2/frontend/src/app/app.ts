import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthFacade } from './shared/store/auth/auth.facade';
import { UserTableFacade } from './shared/store/user-table/user-table.facade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly tableUsersFacade = inject(UserTableFacade);

  protected readonly title = signal('forms-homework-project');

  ngOnInit(): void {
    this.authFacade.init();
    this.tableUsersFacade.init();
  }
}
