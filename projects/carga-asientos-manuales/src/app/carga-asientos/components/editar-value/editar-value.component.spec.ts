import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditarValueComponent } from './editar-value.component';

describe('EditarValueComponent', () => {
  let component: EditarValueComponent;
  let fixture: ComponentFixture<EditarValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarValueComponent ],
      imports: [ HttpClientModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
