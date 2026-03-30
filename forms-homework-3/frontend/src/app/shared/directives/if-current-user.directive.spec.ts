import { Component, inject, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IfCurrentUserDirective } from './if-current-user.directive';
import { AuthFacade } from '../store/auth/auth.facade';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  imports: [IfCurrentUserDirective],
  template: `<div *appIfCurrentUser="userId">visible</div>`,
})
class TestHost {
  @Input({ required: true }) userId!: number;

  protected readonly authFacade = inject(AuthFacade);
}

class MockAuthFacade implements Partial<AuthFacade> {
  readonly currentUser$? = new BehaviorSubject<User>({ id: 1 } as User);
}

describe('IfCurrentUserDirective', () => {
  let fixture: ComponentFixture<TestHost>;
  let authFacade: MockAuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost],
      providers: [{ provide: AuthFacade, useClass: MockAuthFacade }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHost);
    authFacade = TestBed.inject(AuthFacade) as unknown as MockAuthFacade;
  });

  const getElement = () => fixture.debugElement.query(By.css('div'));

  it('should render the component for valid current user', () => {
    fixture.componentRef.setInput('userId', 1);
    fixture.detectChanges();

    expect(getElement()).toBeTruthy();
  });

  it('should NOT render the component for invalid current user', () => {
    fixture.componentRef.setInput('userId', 100);
    fixture.detectChanges();

    expect(getElement()).toBeFalsy();
  });

  it('should clear and re-evaluate the view when currentUser changes in state', () => {
    fixture.componentRef.setInput('userId', 1);
    fixture.detectChanges();
    expect(getElement()).toBeTruthy();

    authFacade.currentUser$?.next({ id: 2 } as User);
    fixture.detectChanges();
    expect(getElement()).toBeFalsy();

    authFacade.currentUser$?.next({ id: 1 } as User);
    fixture.detectChanges();
    expect(getElement()).toBeTruthy();
  });
});
