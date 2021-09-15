import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormularComponent } from './reservation-formular.component';

describe('ReservationFormularComponent', () => {
  let component: ReservationFormularComponent;
  let fixture: ComponentFixture<ReservationFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationFormularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
