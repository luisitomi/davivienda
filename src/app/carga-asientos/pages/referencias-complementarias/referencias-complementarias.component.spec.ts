import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasComplementariasComponent } from './referencias-complementarias.component';

describe('ReferenciasComplementariasComponent', () => {
  let component: ReferenciasComplementariasComponent;
  let fixture: ComponentFixture<ReferenciasComplementariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenciasComplementariasComponent ]
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
