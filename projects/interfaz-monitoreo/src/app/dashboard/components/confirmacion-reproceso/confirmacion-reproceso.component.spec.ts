import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionReprocesoComponent } from './confirmacion-reproceso.component';



describe('CorregirConfirmacionComponent', () => {
  let component: ConfirmacionReprocesoComponent;
  let fixture: ComponentFixture<ConfirmacionReprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionReprocesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionReprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
