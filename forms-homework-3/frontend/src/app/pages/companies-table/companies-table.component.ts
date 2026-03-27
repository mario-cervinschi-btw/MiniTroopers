import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Company } from '../../shared/models/company.model';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  finalize,
  switchMap,
  tap,
} from 'rxjs';
import { CompaniesService } from '../../shared/services/company.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
  templateUrl: './companies-table.component.html',
  styleUrl: './companies-table.component.scss',
})
export class CompaniesTableComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly companyService = inject(CompaniesService);

  protected readonly pageIndex$ = new BehaviorSubject<number>(0);
  protected readonly itemsPerPage$ = new BehaviorSubject<number>(10);
  protected readonly searchValue$ = new BehaviorSubject<string>('');

  protected readonly displayedColumns: string[] = ['company', 'location', 'website', 'open_jobs'];
  protected totalCompanies: number = 0;
  protected companiesAvailable: Company[] = [];
  protected loadingCompanies: boolean = false;

  ngOnInit() {
    combineLatest({
      page: this.pageIndex$,
      limit: this.itemsPerPage$,
      search: this.searchValue$.pipe(debounceTime(500), distinctUntilChanged()),
    })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => (this.loadingCompanies = true)),
        switchMap(({ page, limit, search }) =>
          this.companyService
            .getAll({
              page: page + 1,
              limit: limit,
              search: search,
            })
            .pipe(finalize(() => (this.loadingCompanies = false))),
        ),
      )
      .subscribe((res) => {
        this.companiesAvailable = res.data;
        this.totalCompanies = res.pagination.totalItems;
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
