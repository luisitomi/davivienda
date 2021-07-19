import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSalidaComponent } from './control-salida.component';

describe('ControlSalidaComponent', () => {
  let component: ControlSalidaComponent;
  let fixture: ComponentFixture<ControlSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
