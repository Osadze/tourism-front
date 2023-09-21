import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareIndicatorsComponent } from './compare-indicators.component';

describe('CompareIndicatorsComponent', () => {
  let component: CompareIndicatorsComponent;
  let fixture: ComponentFixture<CompareIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareIndicatorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
