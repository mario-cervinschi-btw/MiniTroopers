import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPeopleCard } from './summary-people-card';

describe('SummaryPeopleCard', () => {
  let component: SummaryPeopleCard;
  let fixture: ComponentFixture<SummaryPeopleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryPeopleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryPeopleCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
