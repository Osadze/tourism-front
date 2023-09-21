import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexENComponent } from './index-en.component';

describe('IndexENComponent', () => {
  let component: IndexENComponent;
  let fixture: ComponentFixture<IndexENComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexENComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexENComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
