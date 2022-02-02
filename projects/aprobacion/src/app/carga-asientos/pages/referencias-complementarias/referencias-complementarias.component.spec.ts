import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ReferenciasComplementariasComponent } from './referencias-complementarias.component';

describe('ReferenciasComplementariasComponent', () => {
  let component: ReferenciasComplementariasComponent;
  let fixture: ComponentFixture<ReferenciasComplementariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciasComplementariasComponent ],
      imports: [ HttpClientModule, MatDialogModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (v: any) => {} } } } },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciasComplementariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
