import { Component, DestroyRef, inject } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Company } from '../../shared/models/company.model';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, finalize, Subject, switchMap } from 'rxjs';
import { CompaniesService } from '../../shared/services/company.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JobsService } from '../../shared/services/jobs.service';
import { Job } from '../../shared/models/job.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-jobs-table',
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
  ],
  templateUrl: './jobs-table.component.html',
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentPage$ = new Subject<number>();
  private readonly itemsPerPage$ = new Subject<number>();

  private filterDebounce: number | undefined = undefined;

  protected readonly jobsService = inject(JobsService);
  protected readonly displayedColumns: string[] = ['job', 'location', 'type', 'posted'];

  protected totalJobs: number = 0;
  protected itemsPerPage: number = 10;
  protected pageIndex: number = 0;

  protected jobsAvailable: Job[] = [];
  protected loadingJobs: boolean = false;

  private searchValue$ = new BehaviorSubject<string>('');
  protected searchValue: string = '';

  ngOnInit() {
    this.jobsService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingJobs = false)),
      )
      .subscribe((comp) => {
        this.jobsAvailable = comp.data;
        this.totalJobs = comp.pagination.totalItems;
      });

    this.searchValue$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.jobsService
            .getAll({ search: val, page: this.pageIndex, limit: this.itemsPerPage })
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              finalize(() => (this.loadingJobs = false)),
            ),
        ),
      )
      .subscribe((val) => {
        this.jobsAvailable = val.data;
        this.totalJobs = val.pagination.totalItems;
      });

    this.currentPage$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.jobsService
            .getAll({ page: val, search: this.searchValue, limit: this.itemsPerPage })
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              finalize(() => (this.loadingJobs = false)),
            ),
        ),
      )
      .subscribe((val) => {
        this.jobsAvailable = val.data;
        this.totalJobs = val.pagination.totalItems;
      });

    this.itemsPerPage$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.jobsService
            .getAll({ page: this.pageIndex, search: this.searchValue, limit: val })
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              finalize(() => (this.loadingJobs = false)),
            ),
        ),
      )
      .subscribe((val) => {
        this.jobsAvailable = val.data;
        this.totalJobs = val.pagination.totalItems;
      });
  }

  applyFilter(event: Event) {
    this.loadingJobs = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    clearTimeout(this.filterDebounce);
    this.filterDebounce = setTimeout(() => {
      this.searchValue$.next(this.searchValue);
    }, 500);
  }

  private pageEvent: PageEvent | undefined;
  handlePageEvent(e: PageEvent) {
    this.loadingJobs = true;
    this.pageEvent = e;
    this.itemsPerPage = this.pageEvent.pageSize;
    this.pageIndex = this.pageEvent.pageIndex;

    this.itemsPerPage$.next(this.pageEvent.pageSize);
    this.currentPage$.next(this.pageEvent.pageIndex + 1);
  }
}
