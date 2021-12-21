import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoletOrigenComponent } from './infolet-origen.component';

describe('InfoletOrigenComponent', () => {
  let component: InfoletOrigenComponent;
  let fixture: ComponentFixture<InfoletOrigenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoletOrigenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoletOrigenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
