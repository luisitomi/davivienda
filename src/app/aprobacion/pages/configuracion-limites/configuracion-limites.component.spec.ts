import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionLimitesComponent } from './configuracion-limites.component';

describe('ConfiguracionLimitesComponent', () => {
  let component: ConfiguracionLimitesComponent;
  let fixture: ComponentFixture<ConfiguracionLimitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionLimitesComponent ]
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
