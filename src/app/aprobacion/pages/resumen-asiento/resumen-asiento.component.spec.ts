import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAsientoComponent } from './resumen-asiento.component';

describe('ResumenAsientoComponent', () => {
  let component: ResumenAsientoComponent;
  let fixture: ComponentFixture<ResumenAsientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenAsientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
