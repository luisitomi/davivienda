import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { ResumenAsientoComponent } from './resumen-asiento.component';
import { HttpClientModule } from '@angular/common/http';

describe('ResumenAsientoComponent', () => {
  let component: ResumenAsientoComponent;
  let fixture: ComponentFixture<ResumenAsientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenAsientoComponent ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (v: any) => {}} }} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenAsientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
