import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { LineasComponent } from './lineas.component';

describe('LineasComponent', () => {
  let component: LineasComponent;
  let fixture: ComponentFixture<LineasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineasComponent ],
      imports: [ HttpClientModule, RouterTestingModule, MatDialogModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
