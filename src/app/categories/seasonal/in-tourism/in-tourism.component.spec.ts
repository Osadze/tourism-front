import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InTourismComponent } from './in-tourism.component';

describe('InTourismComponent', () => {
  let component: InTourismComponent;
  let fixture: ComponentFixture<InTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InTourismComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
