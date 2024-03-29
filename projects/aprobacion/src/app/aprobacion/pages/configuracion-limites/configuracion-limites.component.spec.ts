import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ConfiguracionLimitesComponent } from './configuracion-limites.component';

describe('ConfiguracionLimitesComponent', () => {
  let component: ConfiguracionLimitesComponent;
  let fixture: ComponentFixture<ConfiguracionLimitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionLimitesComponent ],
      imports: [ HttpClientModule, MatSnackBarModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionLimitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
