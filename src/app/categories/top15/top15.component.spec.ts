import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top15Component } from './top15.component';

describe('Top15Component', () => {
  let component: Top15Component;
  let fixture: ComponentFixture<Top15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Top15Component],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Top15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
