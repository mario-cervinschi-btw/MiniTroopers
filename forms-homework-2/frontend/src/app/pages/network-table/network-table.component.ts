import { Component, DestroyRef, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { MatIcon } from '@angular/material/icon';
import { TechIconsDirective } from '../../shared/directives/tech-icons.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserTableFacade } from '../../shared/store/user-table/user-table.facade';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatProgressBarModule,
  ],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly userTableFacade = inject(UserTableFacade);

  private readonly currentPage$ = new BehaviorSubject<number>(0);

  protected readonly userService: UsersService = inject(UsersService);
  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];
  protected usersAvailable: TableUser[] = [];

  protected totalUsers: number = 0;
  protected itemsPerPage: number = 10;

  protected loadingUsers: boolean = false;

  ngOnInit() {
    this.userTableFacade.users$
      .pipe(
        map(
          (res) =>
            // console.log(res),
            res
              ? res.data.map((u) => ({
                  id: u.id,
                  firstName: u.firstName,
                  lastName: u.lastName,
                  location: u.location,
                  connections: u.connections,
                  headline: u.headline,
                }))
              : [],
          // (this.totalUsers = res!.pagination.totalItems),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((users) => {
        // console.log(users);
        this.usersAvailable = users;
      });

    this.userTableFacade.loadingUsers$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((val) => {
          this.loadingUsers = val;
        }),
      )
      .subscribe();
  }

  private pageEvent: PageEvent | undefined;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    console.log(this.pageEvent);
    this.itemsPerPage = this.pageEvent.pageSize;
    this.currentPage$.next(this.pageEvent.pageIndex + 1);
  }

  onRowClick(row: TableUser): void {
    this.router.navigate(['/profile', row.id]);
  }
}
