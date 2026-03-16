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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-companies-table',
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
  ],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.scss',
})
export class CompaniesTableComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly currentPage$ = new Subject<number>();
  private readonly itemsPerPage$ = new Subject<number>();

  private filterDebounce: number | undefined = undefined;

  protected readonly companyService = inject(CompaniesService);
  protected readonly displayedColumns: string[] = ['company', 'location', 'website', 'open_jobs'];

  protected totalCompanies: number = 0;
  protected itemsPerPage: number = 10;
  protected pageIndex: number = 0;

  protected companiesAvailable: Company[] = [];
  protected loadingCompanies: boolean = false;

  private searchValue$ = new BehaviorSubject<string>('');
  protected searchValue: string = '';

  ngOnInit() {
    this.companyService
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingCompanies = false)),
      )
      .subscribe((comp) => {
        this.companiesAvailable = comp.data;
        this.totalCompanies = comp.pagination.totalItems;
      });

    this.searchValue$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.companyService.getAll({ search: val }).pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => (this.loadingCompanies = false)),
          ),
        ),
      )
      .subscribe((val) => {
        this.companiesAvailable = val.data;
        this.totalCompanies = val.pagination.totalItems;
      });

    this.currentPage$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.companyService.getAll({ page: val, search: this.searchValue }).pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => (this.loadingCompanies = false)),
          ),
        ),
      )
      .subscribe((val) => {
        this.companiesAvailable = val.data;
        this.totalCompanies = val.pagination.totalItems;
      });

    this.itemsPerPage$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((val) =>
          this.companyService
            .getAll({ page: this.pageIndex, search: this.searchValue, limit: val })
            .pipe(
              takeUntilDestroyed(this.destroyRef),
              finalize(() => (this.loadingCompanies = false)),
            ),
        ),
      )
      .subscribe((val) => {
        this.companiesAvailable = val.data;
        this.totalCompanies = val.pagination.totalItems;
      });
  }

  applyFilter(event: Event) {
    this.loadingCompanies = true;
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue;

    clearTimeout(this.filterDebounce);
    this.filterDebounce = setTimeout(() => {
      this.searchValue$.next(this.searchValue);
    }, 500);
  }

  private pageEvent: PageEvent | undefined;
  handlePageEvent(e: PageEvent) {
    this.loadingCompanies = true;
    this.pageEvent = e;
    this.itemsPerPage = this.pageEvent.pageSize;
    this.pageIndex = this.pageEvent.pageIndex;

    this.itemsPerPage$.next(this.pageEvent.pageSize);
    this.currentPage$.next(this.pageEvent.pageIndex + 1);
  }
}
