import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoFiltroComponent } from './nuevo-filtro.component';

describe('NuevoFiltroComponent', () => {
  let component: NuevoFiltroComponent;
  let fixture: ComponentFixture<NuevoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
