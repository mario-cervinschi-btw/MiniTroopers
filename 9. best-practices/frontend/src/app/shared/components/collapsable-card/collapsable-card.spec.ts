import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsableCard } from './collapsable-card';

describe('CollapsableCard', () => {
  let component: CollapsableCard;
  let fixture: ComponentFixture<CollapsableCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollapsableCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollapsableCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
