import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLineaComponent } from './editar-linea.component';

describe('EditarLineaComponent', () => {
  let component: EditarLineaComponent;
  let fixture: ComponentFixture<EditarLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
