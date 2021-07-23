import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosPendientesComponent } from './asientos-pendientes.component';

describe('AsientosPendientesComponent', () => {
  let component: AsientosPendientesComponent;
  let fixture: ComponentFixture<AsientosPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsientosPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
