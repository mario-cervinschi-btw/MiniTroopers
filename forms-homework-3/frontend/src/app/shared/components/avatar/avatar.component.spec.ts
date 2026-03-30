import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { By } from '@angular/platform-browser';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
  });

  it("should display user's initials in uppercase", () => {
    fixture.componentRef.setInput('firstName', 'john');
    fixture.componentRef.setInput('lastName', 'doe');

    expect(component.initials).toBe('JD');
  });

  it('should handle single-character names', () => {
    fixture.componentRef.setInput('firstName', 'j');
    fixture.componentRef.setInput('lastName', 'd');

    expect(component.initials).toBe('JD');
  });

  it("should the rendered div display the user's initials in uppercase", () => {
    fixture.componentRef.setInput('firstName', 'john');
    fixture.componentRef.setInput('lastName', 'doe');

    fixture.detectChanges();
    const initials = fixture.debugElement.query(By.css('.avatar'));

    expect(initials.nativeElement.textContent.trim()).toBe('JD');
  });

  it('should have the corrct dimensions for different sizes', () => {
    fixture.componentRef.setInput('size', 'small');
    expect(component.plainSize).toEqual(24);

    fixture.componentRef.setInput('size', 'medium');
    expect(component.plainSize).toEqual(40);

    fixture.componentRef.setInput('size', 'large');
    expect(component.plainSize).toEqual(56);

    fixture.componentRef.setInput('size', 'xl');
    expect(component.plainSize).toEqual(100);
  });

  it('should have default size for any unknown size', () => {
    fixture.componentRef.setInput('size', 'dsadsak');
    expect(component.plainSize).toEqual(40);

    fixture.componentRef.setInput('size', '');
    expect(component.plainSize).toEqual(40);

    fixture.componentRef.setInput('size', null);
    expect(component.plainSize).toEqual(40);

    fixture.componentRef.setInput('size', undefined);
    expect(component.plainSize).toEqual(40);

    fixture.componentRef.setInput('size', 3213);
    expect(component.plainSize).toEqual(40);
  });

  it('should always have a specific background color', () => {
    expect(component.backgroundColor).toEqual('#0a66c2');
  });
});
