import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAsientosComponent } from './tabla-asientos.component';

describe('TablaAsientosComponent', () => {
  let component: TablaAsientosComponent;
  let fixture: ComponentFixture<TablaAsientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAsientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAsientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
