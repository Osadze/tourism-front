import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitsCountComponent } from './visits-count.component';

describe('VisitsCountComponent', () => {
  let component: VisitsCountComponent;
  let fixture: ComponentFixture<VisitsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitsCountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
