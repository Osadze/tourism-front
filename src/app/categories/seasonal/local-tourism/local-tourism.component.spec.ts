import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalTourismComponent } from './local-tourism.component';

describe('LocalTourismComponent', () => {
  let component: LocalTourismComponent;
  let fixture: ComponentFixture<LocalTourismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalTourismComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalTourismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
