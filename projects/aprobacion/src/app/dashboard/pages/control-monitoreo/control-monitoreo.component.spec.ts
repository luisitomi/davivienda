import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ControlMonitoreoComponent } from './control-monitoreo.component';

describe('ControlMonitoreoComponent', () => {
  let component: ControlMonitoreoComponent;
  let fixture: ComponentFixture<ControlMonitoreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMonitoreoComponent ],
      imports: [ HttpClientModule, MatDialogModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
      ],
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
