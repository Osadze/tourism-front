import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalVarComponent } from './additional-var.component';

describe('AdditionalVarComponent', () => {
  let component: AdditionalVarComponent;
  let fixture: ComponentFixture<AdditionalVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalVarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
