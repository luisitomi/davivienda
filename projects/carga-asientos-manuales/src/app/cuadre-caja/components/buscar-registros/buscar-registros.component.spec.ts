import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRegistrosComponent } from './buscar-registros.component';

describe('BuscarRegistrosComponent', () => {
  let component: BuscarRegistrosComponent;
  let fixture: ComponentFixture<BuscarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
