import { ComponentFixture, TestBed } from '@angular/core/testing';

import { headerForMain } from './headerForMain.component';

describe('headerForMain', () => {
  let component: headerForMain;
  let fixture: ComponentFixture<headerForMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [headerForMain],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(headerForMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
