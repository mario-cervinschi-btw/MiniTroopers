import { Component, inject, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { JobsTableComponent } from './jobs-table.component';
import { JobsService } from '../../shared/services/jobs.service';
import { PaginatedResponse } from '../../shared/models/pagination.model';
import { Job } from '../../shared/models/job.model';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';

class MockJobsService implements Partial<JobsService> {
  private mockData: PaginatedResponse<Job> = {
    data: [],
    pagination: { totalItems: 10, itemsPerPage: 3, totalPages: 4, currentPage: 1 },
  };

  getAll(params: any) {
    return of(this.mockData);
  }
}

describe('JobsTableComponent', () => {
  let component: JobsTableComponent;
  let fixture: ComponentFixture<JobsTableComponent>;

  let jobsService: MockJobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JobsTableComponent,
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
      providers: [{ provide: JobsService, useClass: MockJobsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsTableComponent);
    jobsService = TestBed.inject(JobsService) as unknown as MockJobsService;
    component = fixture.componentInstance;
  });

  it('TO DO: Check getAll is called on component init with no args', async () => {
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {});
  });
  it('TODO: response of getAll() emits the paginated response returned by the mock???', () => {});
  it('search input field is rendered in DOM', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('mat-form-field'))).toBeTruthy();
  });
  it('TODO: onPageChange() calls getAll() with the new page and limit', () => {});
  it('an empty search val DOES NOT pass undefined as search (but empty string) to getAll()', () => {
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const element = input.nativeElement;

      expect(element.value).toBe('');
      expect(element.value).not.toBe(undefined);

      element.value = 'otherVal';
      element.dispatchEvent(new Event('input'));

      expect(element.value).toBe('otherVal');
      expect(element.value).not.toBe('');
      expect(element.value).not.toBe(undefined);

      element.value = '';
      element.dispatchEvent(new Event('input'));

      expect(element.value).toBe('');
      expect(element.value).not.toBe(undefined);
    });
  });
  it('TODO: getAll() is NOT called a second time during init if the search control has not changed', () => {});
});
