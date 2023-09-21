import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutTourismComponent } from './out-tourism.component';

describe('OutTourismComponent', () => {
  let component: OutTourismComponent;
  let fixture: ComponentFixture<OutTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutTourismComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
