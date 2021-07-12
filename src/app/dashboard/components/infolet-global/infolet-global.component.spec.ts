import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoletGlobalComponent } from './infolet-global.component';

describe('InfoletGlobalComponent', () => {
  let component: InfoletGlobalComponent;
  let fixture: ComponentFixture<InfoletGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoletGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoletGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
