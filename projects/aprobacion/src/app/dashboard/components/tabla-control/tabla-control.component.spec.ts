import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaControlComponent } from './tabla-control.component';

describe('TablaControlComponent', () => {
  let component: TablaControlComponent;
  let fixture: ComponentFixture<TablaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
