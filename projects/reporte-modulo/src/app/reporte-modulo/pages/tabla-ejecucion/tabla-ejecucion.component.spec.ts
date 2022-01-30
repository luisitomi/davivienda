import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEjecucionComponent } from './tabla-ejecucion.component';

describe('TablaEjecucionComponent', () => {
  let component: TablaEjecucionComponent;
  let fixture: ComponentFixture<TablaEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEjecucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
