import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarColumnaComponent } from './editar-columna.component';

describe('EditarColumnaComponent', () => {
  let component: EditarColumnaComponent;
  let fixture: ComponentFixture<EditarColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarColumnaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
