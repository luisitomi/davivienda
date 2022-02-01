import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInterfacesComponent } from './control-interfaces.component';

describe('ControlInterfacesComponent', () => {
  let component: ControlInterfacesComponent;
  let fixture: ComponentFixture<ControlInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlInterfacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
