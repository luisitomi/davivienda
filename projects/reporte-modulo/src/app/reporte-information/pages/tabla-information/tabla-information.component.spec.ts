import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInformationComponent } from './tabla-information.component';

describe('TablaLimitesComponent', () => {
  let component: TablaInformationComponent;
  let fixture: ComponentFixture<TablaInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
