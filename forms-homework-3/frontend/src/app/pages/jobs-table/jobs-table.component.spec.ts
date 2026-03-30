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
import { MatFormField } from '@angular/material/form-field';

class MockJobsService implements Partial<JobsService> {
  private mockData: PaginatedResponse<Job> = {
    data: [],
    pagination: { totalItems: 0, itemsPerPage: 10, totalPages: 0, currentPage: 1 },
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
      imports: [JobsTableComponent],
      providers: [{ provide: JobsService, useClass: MockJobsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsTableComponent);
    jobsService = TestBed.inject(JobsService) as unknown as MockJobsService;
  });

  it('TODO: Check getAll is called on component init with no args', () => {});
  it('TODO: response of getAll() emits the paginated response returned by the mock???', () => {});
  it('TODO: search input field is rendered in DOM', () => {});
  it('TODO: onPageChange() calls getAll() with the new page and limit', () => {});
  it('TODO: an empty search val passes undefined as search (not empty string) to getAll()', () => {});
  it('TODO: getAll() is NOT called a second time during init if the search control has not changed', () => {});
});
