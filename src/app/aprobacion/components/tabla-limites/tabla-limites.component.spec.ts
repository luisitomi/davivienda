import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaLimitesComponent } from './tabla-limites.component';

describe('TablaLimitesComponent', () => {
  let component: TablaLimitesComponent;
  let fixture: ComponentFixture<TablaLimitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaLimitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaLimitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
