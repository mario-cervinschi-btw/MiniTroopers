import { Component, DestroyRef, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../store/auth/auth.facade';
import { first, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [MatIcon, MatAnchor, RouterLink, AvatarComponent, MatDivider],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  private readonly destroyRef = inject(DestroyRef);

  protected currentUser: User | null = null;

  sidebarExpanded = false;

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

  navigateToCurrentUser() {
    if (this.currentUser) this.router.navigate(['profile', this.currentUser.id]);
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
