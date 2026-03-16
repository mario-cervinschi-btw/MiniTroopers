import { Component, DestroyRef, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { BehaviorSubject, map, Subject, take, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { MatIcon } from '@angular/material/icon';
import { TechIconsDirective } from '../../shared/directives/tech-icons.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UserTableFacade } from '../../shared/store/user-table/user-table.facade';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TablePreferences } from '../../shared/models/table-preferences.model';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
    MatFormField,
    MatLabel,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);
  private readonly userTableFacade = inject(UserTableFacade);

  private readonly currentPage$ = new Subject<number>();

  private tablePreferences: TablePreferences = {
    sort: { field: '', direction: 'asc' },
    pagination: {
      pageSize: 10,
      pageNumber: 0,
    },
    searchFilter: '',
  };

  private filterDebounce: number | undefined = undefined;

  protected readonly userService: UsersService = inject(UsersService);
  protected readonly displayedColumns: string[] = ['name', 'headline', 'location', 'connections'];
  protected usersAvailable: TableUser[] = [];

  protected totalUsers: number = 0;
  protected itemsPerPage: number = 10;
  protected pageIndex: number = 0;
  protected searchValue: string = '';

  protected loadingUsers: boolean = false;

  ngOnInit() {
    this.userTableFacade.init();

    this.userTableFacade.users$
      .pipe(
        tap((res) => {
          this.totalUsers = res?.pagination.totalItems ?? 0;
        }),
        map((res) =>
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
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((users) => {
        this.usersAvailable = users;
      });

    this.userTableFacade.tablePrefences$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pref) => {
        console.log(pref);
        if (pref) this.tablePreferences = pref;
        if (pref?.pagination.pageNumber) {
          this.pageIndex = pref.pagination.pageNumber - 1;
          this.itemsPerPage = pref.pagination.pageSize;
        }
        if (pref?.searchFilter) {
          this.searchValue = pref.searchFilter;
        }
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
    this.itemsPerPage = this.pageEvent.pageSize;
    this.pageIndex = this.pageEvent.pageIndex;

    this.tablePreferences = {
      ...this.tablePreferences,
      pagination: {
        ...this.tablePreferences.pagination,
        pageSize: this.pageEvent.pageSize,
        pageNumber: this.pageEvent.pageIndex + 1,
      },
    };

    this.userTableFacade.updateUserPreference(this.tablePreferences);
    this.currentPage$.next(this.pageEvent.pageIndex + 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    this.tablePreferences = {
      ...this.tablePreferences,
      searchFilter: filterValue,
    };

    clearTimeout(this.filterDebounce);
    this.filterDebounce = setTimeout(() => {
      this.userTableFacade.updateUserPreference(this.tablePreferences);
    }, 500);
  }

  onRowClick(row: TableUser): void {
    this.router.navigate(['/profile', row.id]);
  }
}
