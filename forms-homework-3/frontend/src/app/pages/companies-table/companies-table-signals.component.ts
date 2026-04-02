import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
  filter,
  finalize,
  switchMap,
  tap,
} from 'rxjs';
import { CompaniesService } from '../../shared/services/company.service';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
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
  ],
  templateUrl: './companies-table-signals.component.html',
  styleUrl: './companies-table.component.scss',
})
export class CompaniesTableSignalsComponent {
  protected readonly companyService = inject(CompaniesService);

  protected readonly pageIndex = signal<number>(0);
  protected readonly itemsPerPage = signal<number>(10);
  protected readonly searchValue = signal<string>('');

  protected readonly displayedColumns: string[] = ['company', 'location', 'website', 'open_jobs'];

  private readonly companiesResource$ = combineLatest({
    page: toObservable(this.pageIndex),
    limit: toObservable(this.itemsPerPage),
    search: toObservable(this.searchValue).pipe(debounceTime(500), distinctUntilChanged()),
  }).pipe(
    tap(() => this.loadingCompanies.set(true)),
    switchMap(({ page, limit, search }) =>
      this.companyService
        .getAll({
          page: page + 1,
          limit: limit,
          search: search,
        })
        .pipe(finalize(() => this.loadingCompanies.set(false))),
    ),
  );

  private readonly companiesData = toSignal(this.companiesResource$);

  protected readonly companiesAvailable = computed(() => this.companiesData()?.data ?? []);
  protected readonly totalCompanies = computed(
    () => this.companiesData()?.pagination.totalItems ?? 0,
  );
  protected readonly loadingCompanies = signal<boolean>(false);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pageIndex.set(0);
    this.searchValue.set(filterValue);
  }

  handlePageEvent(e: PageEvent) {
    this.itemsPerPage.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
  }
}
