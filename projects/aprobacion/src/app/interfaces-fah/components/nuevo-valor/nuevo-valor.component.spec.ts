import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoValorComponent } from './nuevo-valor.component';

describe('NuevoValorComponent', () => {
  let component: NuevoValorComponent;
  let fixture: ComponentFixture<NuevoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoValorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
