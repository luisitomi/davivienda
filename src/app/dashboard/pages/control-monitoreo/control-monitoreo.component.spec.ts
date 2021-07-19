import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMonitoreoComponent } from './control-monitoreo.component';

describe('ControlMonitoreoComponent', () => {
  let component: ControlMonitoreoComponent;
  let fixture: ComponentFixture<ControlMonitoreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMonitoreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMonitoreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
