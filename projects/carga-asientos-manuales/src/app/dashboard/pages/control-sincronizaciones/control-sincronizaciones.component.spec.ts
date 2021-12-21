import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSincronizacionesComponent } from './control-sincronizaciones.component';

describe('ControlSincronizacionesComponent', () => {
  let component: ControlSincronizacionesComponent;
  let fixture: ComponentFixture<ControlSincronizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSincronizacionesComponent ],
      imports: [ HttpClientModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSincronizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
