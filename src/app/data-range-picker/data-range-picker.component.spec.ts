import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRangePickerComponent } from './data-range-picker.component';

describe('DataRangePickerComponent', () => {
  let component: DataRangePickerComponent;
  let fixture: ComponentFixture<DataRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataRangePickerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
