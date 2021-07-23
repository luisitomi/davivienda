import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaAsientosManualComponent } from './carga-asientos-manual.component';

describe('CargaAsientosManualComponent', () => {
  let component: CargaAsientosManualComponent;
  let fixture: ComponentFixture<CargaAsientosManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaAsientosManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaAsientosManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
