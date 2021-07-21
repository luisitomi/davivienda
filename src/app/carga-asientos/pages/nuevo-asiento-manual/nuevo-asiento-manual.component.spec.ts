import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsientoManualComponent } from './nuevo-asiento-manual.component';

describe('NuevoAsientoManualComponent', () => {
  let component: NuevoAsientoManualComponent;
  let fixture: ComponentFixture<NuevoAsientoManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAsientoManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAsientoManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
