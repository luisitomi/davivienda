import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CorreccionDatosComponent } from './correccion-datos.component';

describe('CorreccionDatosComponent', () => {
  let component: CorreccionDatosComponent;
  let fixture: ComponentFixture<CorreccionDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreccionDatosComponent ],
      imports: [ HttpClientModule, MatDialogModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreccionDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
