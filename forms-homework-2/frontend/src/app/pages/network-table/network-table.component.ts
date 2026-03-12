import { Component, DestroyRef, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { BehaviorSubject, map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { MatIcon } from '@angular/material/icon';
import { TechIconsDirective } from '../../shared/directives/tech-icons.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

interface TableUser {
  id: number;
  firstName: string;
  lastName: string;
  location: string;
  connections: number;
  headline: string;
}

@Component({
  selector: 'app-network-table',
  imports: [
    WrapperComponent,
    MatTableModule,
    AvatarComponent,
    RouterModule,
    HighlightDirective,
    TechIconsDirective,
    MatIcon,
    MatPaginatorModule,
  ],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);

  private readonly currentPage$ = new BehaviorSubject<number>(0);

  protected readonly userService: UsersService = inject(UsersService);
  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];
  protected usersAvailable: TableUser[] = [];

  ngOnInit() {
    this.currentPage$.pipe().subscribe((curr) => {
      this.userService
        .getAllUsers({ page: curr })
        .pipe(
          map(
            (users) => (
              console.log(users),
              users.data.map((u) => ({
                id: u.id,
                firstName: u.firstName,
                lastName: u.lastName,
                location: u.location,
                connections: u.connections,
                headline: u.headline,
              }))
            ),
          ),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((next) => {
          this.usersAvailable = next;
        });
    });
  }

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log(this.pageEvent);
    this.currentPage$.next(this.pageEvent.pageIndex);
  }

  onRowClick(row: TableUser): void {
    this.router.navigate(['/profile', row.id]);
  }
}
