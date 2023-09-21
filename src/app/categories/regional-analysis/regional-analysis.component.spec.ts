import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalAnalysisComponent } from './regional-analysis.component';

describe('RegionalAnalysisComponent', () => {
  let component: RegionalAnalysisComponent;
  let fixture: ComponentFixture<RegionalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionalAnalysisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
