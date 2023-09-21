import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultIndicatorComponent } from './default-indicator.component';

describe('DefaultIndicatorComponent', () => {
  let component: DefaultIndicatorComponent;
  let fixture: ComponentFixture<DefaultIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultIndicatorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
