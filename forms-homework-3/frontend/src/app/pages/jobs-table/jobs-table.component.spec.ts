import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { JobsTableComponent } from './jobs-table.component';
import { JobsService } from '../../shared/services/jobs.service';
import { PaginatedResponse } from '../../shared/models/pagination.model';
import { Job } from '../../shared/models/job.model';
import { WrapperComponent } from '../../shared/components/wrapper/wrapper.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { JobType } from '../../shared/models/job-type.model';

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

  it('Check getAll is called on component init with no args', fakeAsync(() => {
    spyOn(jobsService, 'getAll').and.callThrough();
    fixture.detectChanges();

    tick(500);

    expect(jobsService.getAll).toHaveBeenCalledWith({
      search: '',
      page: 1,
      limit: 10,
    });
  }));

  it('response of getAll() emits the paginated response returned by the mock', fakeAsync(() => {
    const mockResponse = {
      data: [
        { id: 1, title: 'Frontend Developer' } as Job,
        { id: 2, title: 'Backend Developer' } as Job,
      ],
      pagination: { totalItems: 2, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    };

    const mockResponse$ = of(mockResponse);

    spyOn(jobsService, 'getAll').and.returnValue(mockResponse$);

    fixture.detectChanges();
    tick(500);

    expect(component['jobsAvailable']).toEqual(mockResponse.data);
    expect(component['totalJobs']).toBe(mockResponse.pagination.totalItems);

    expect(component['loadingJobs']).toBeFalse();
  }));

  it('search input field is rendered in DOM', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('mat-form-field'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('input'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('mat-label')).nativeElement.textContent).toContain(
      'Search',
    );
  });

  it('onPageChange() calls getAll() with the new page and limit', fakeAsync(() => {
    const getAllSpy = spyOn(jobsService, 'getAll').and.callThrough();

    fixture.detectChanges();
    tick(500);

    expect(getAllSpy).toHaveBeenCalledWith({
      search: '',
      page: 1,
      limit: 10,
    });

    const mockResponse = {
      data: [
        {
          id: 11,
          title: 'Frontend Developer',
          description: 'Good',
          location: 'Anywhere',
          type: JobType.FULL_TIME,
          createdAt: new Date().toDateString(),
        } as Job,
      ],
      pagination: { totalItems: 12, itemsPerPage: 10, totalPages: 2, currentPage: 2 },
    };

    getAllSpy.and.returnValue(of(mockResponse));

    const newPageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 12,
    };

    component.handlePageEvent(newPageEvent);
    fixture.detectChanges();

    expect(getAllSpy).toHaveBeenCalledWith({
      search: '',
      page: 2,
      limit: 10,
    });
  }));

  it('an empty search val DOES NOT pass undefined as search (but empty string) to getAll()', fakeAsync(() => {
    const getAllSpy = spyOn(jobsService, 'getAll').and.callThrough();

    fixture.detectChanges();
    tick(500);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));
    tick(500);

    expect(getAllSpy.calls.mostRecent().args[0]).toEqual({
      search: 'Test',
      page: 1,
      limit: 10,
    });

    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);

    expect(getAllSpy.calls.mostRecent().args[0]).toEqual({
      search: '',
      page: 1,
      limit: 10,
    });

    expect(getAllSpy.calls.mostRecent().args[0]).not.toEqual({
      search: undefined,
      page: 1,
      limit: 10,
    });
  }));

  it('getAll() is NOT called a second time during init if the search control has not changed', fakeAsync(() => {
    const getAllSpy = spyOn(jobsService, 'getAll').and.callThrough();

    expect(getAllSpy).toHaveBeenCalledTimes(0);

    fixture.detectChanges();
    tick(500);

    expect(getAllSpy).toHaveBeenCalledTimes(1);

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));

    tick(250);

    input.value = '';
    input.dispatchEvent(new Event('input'));
    tick(500);

    expect(getAllSpy).toHaveBeenCalledTimes(1);

    input.value = 'Test';
    input.dispatchEvent(new Event('input'));
    tick(500);

    expect(getAllSpy).toHaveBeenCalledTimes(2);
  }));
});
