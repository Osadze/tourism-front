import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtInteractiveMapComponent } from './ht-interactive-map.component';

describe('HtInteractiveMapComponent', () => {
  let component: HtInteractiveMapComponent;
  let fixture: ComponentFixture<HtInteractiveMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtInteractiveMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtInteractiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
