import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInterfacesComponent } from './tabla-interfaces.component';

describe('TablaInterfacesComponent', () => {
  let component: TablaInterfacesComponent;
  let fixture: ComponentFixture<TablaInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
