import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoInterfacesComponent } from './mantenimiento-interfaces.component';

describe('MantenimientoInterfacesComponent', () => {
  let component: MantenimientoInterfacesComponent;
  let fixture: ComponentFixture<MantenimientoInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
