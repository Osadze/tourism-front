import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderTypeComponent } from './border-type.component';

describe('BorderTypeComponent', () => {
  let component: BorderTypeComponent;
  let fixture: ComponentFixture<BorderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BorderTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
