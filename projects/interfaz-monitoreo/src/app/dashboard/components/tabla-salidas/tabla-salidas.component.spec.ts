import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSalidasComponent } from './tabla-salidas.component';

describe('TablaSalidasComponent', () => {
  let component: TablaSalidasComponent;
  let fixture: ComponentFixture<TablaSalidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSalidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
