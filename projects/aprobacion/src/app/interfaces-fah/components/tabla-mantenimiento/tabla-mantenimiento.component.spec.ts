import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMantenimientoComponent } from './tabla-mantenimiento.component';

describe('TablaMantenimientoComponent', () => {
  let component: TablaMantenimientoComponent;
  let fixture: ComponentFixture<TablaMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
