import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { ReprocesoComponent } from './reproceso.component';

describe('ReprocesoComponent', () => {
  let component: ReprocesoComponent;
  let fixture: ComponentFixture<ReprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoComponent ],
      imports: [ HttpClientModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (v: any) => {} } }} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
