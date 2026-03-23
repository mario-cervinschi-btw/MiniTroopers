import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthFacade } from '../../store/auth/auth.facade';
import { tap } from 'rxjs';
import { User } from '../../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, MatAnchor, RouterLink, AvatarComponent, MatDivider, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly destroyRef = inject(DestroyRef);

  protected currentUser: User | null = null;

  protected sidebarExpanded: boolean = false;

  ngOnInit() {
    this.authFacade.currentUser$
      .pipe(
        tap((currentUser) => {
          console.log('once');
          this.currentUser = currentUser;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
