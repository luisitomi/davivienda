import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaResumenAsientoComponent } from './tabla-resumen-asiento.component';

describe('TablaResumenAsientoComponent', () => {
  let component: TablaResumenAsientoComponent;
  let fixture: ComponentFixture<TablaResumenAsientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaResumenAsientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaResumenAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
