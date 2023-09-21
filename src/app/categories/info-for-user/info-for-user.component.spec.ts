import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoForUserComponent } from './info-for-user.component';

describe('InfoForUserComponent', () => {
  let component: InfoForUserComponent;
  let fixture: ComponentFixture<InfoForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoForUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
