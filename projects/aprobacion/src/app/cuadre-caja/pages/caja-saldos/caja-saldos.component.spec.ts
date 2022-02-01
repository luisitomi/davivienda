import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaSaldosComponent } from './caja-saldos.component';

describe('CajaSaldosComponent', () => {
  let component: CajaSaldosComponent;
  let fixture: ComponentFixture<CajaSaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaSaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaSaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
