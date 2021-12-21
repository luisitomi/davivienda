import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionReversaComponent } from './confirmacion-reversa.component';

describe('CorregirConfirmacionComponent', () => {
  let component: ConfirmacionReversaComponent;
  let fixture: ComponentFixture<ConfirmacionReversaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionReversaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionReversaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
