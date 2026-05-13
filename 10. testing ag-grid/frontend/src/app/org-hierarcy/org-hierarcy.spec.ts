import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHierarcy } from './org-hierarcy';

describe('OrgHierarcy', () => {
  let component: OrgHierarcy;
  let fixture: ComponentFixture<OrgHierarcy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgHierarcy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgHierarcy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
