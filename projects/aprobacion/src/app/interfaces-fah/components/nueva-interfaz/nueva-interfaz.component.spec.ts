import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaInterfazComponent } from './nueva-interfaz.component';

describe('NuevaInterfazComponent', () => {
  let component: NuevaInterfazComponent;
  let fixture: ComponentFixture<NuevaInterfazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaInterfazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaInterfazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
