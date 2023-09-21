import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultVarComponent } from './default-var.component';

describe('DefaultVarComponent', () => {
  let component: DefaultVarComponent;
  let fixture: ComponentFixture<DefaultVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultVarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
