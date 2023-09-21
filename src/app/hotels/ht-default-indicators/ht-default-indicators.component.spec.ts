import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtDefaultIndicatorsComponent } from './ht-default-indicators.component';

describe('HtDefaultIndicatorsComponent', () => {
  let component: HtDefaultIndicatorsComponent;
  let fixture: ComponentFixture<HtDefaultIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtDefaultIndicatorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtDefaultIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
