import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  finalize,
  switchMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  catchError,
  of,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobsService } from '../../shared/services/jobs.service';
import { Job } from '../../shared/models/job.model';
import { DatePipe, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-jobs-table',
  standalone: true,
  imports: [
    WrapperComponent,
    MatProgressBar,
    MatFormField,
    MatLabel,
    MatTableModule,
    MatIcon,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly jobsService = inject(JobsService);

  protected readonly searchValue$ = new BehaviorSubject<string>('');
  protected readonly pageIndex$ = new BehaviorSubject<number>(0);
  protected readonly itemsPerPage$ = new BehaviorSubject<number>(10);

  protected readonly displayedColumns: string[] = ['job', 'location', 'type', 'posted'];

  protected totalJobs: number = 0;
  protected jobsAvailable: Job[] = [];
  protected loadingJobs: boolean = false;

  ngOnInit() {
    combineLatest({
      search: this.searchValue$.pipe(debounceTime(500), distinctUntilChanged()),
      page: this.pageIndex$.pipe(distinctUntilChanged()),
      limit: this.itemsPerPage$.pipe(distinctUntilChanged()),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => (this.loadingJobs = true)),
        switchMap(({ search, page, limit }) =>
          this.jobsService
            .getAll({
              search,
              page: page + 1,
              limit,
            })
            .pipe(
              finalize(() => (this.loadingJobs = false)),
              catchError(() => {
                return of({ data: [], pagination: { totalItems: 0 } });
              }),
            ),
        ),
      )
      .subscribe((res) => {
        this.jobsAvailable = res.data;
        this.totalJobs = res.pagination.totalItems;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pageIndex$.next(0);
    this.searchValue$.next(filterValue);
  }

  handlePageEvent(e: PageEvent) {
    this.itemsPerPage$.next(e.pageSize);
    this.pageIndex$.next(e.pageIndex);
  }
}
