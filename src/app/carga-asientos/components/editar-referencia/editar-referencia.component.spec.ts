import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReferenciaComponent } from './editar-referencia.component';

describe('EditarReferenciaComponent', () => {
  let component: EditarReferenciaComponent;
  let fixture: ComponentFixture<EditarReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarReferenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
