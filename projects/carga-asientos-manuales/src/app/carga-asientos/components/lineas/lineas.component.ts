import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { EditarLineaComponent } from '../editar-linea/editar-linea.component';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss']
})
export class LineasComponent implements OnInit {
  @Input() visibleTable: boolean;
  title = "Líneas";
  lineList: Array<LineaAsientoInsert> = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //
  }

  newLine(): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: null, type: 0 },
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem('model') || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      this.lineList.push(result);
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList,
      }
      localStorage.removeItem('model');
      localStorage.setItem('model',JSON.stringify(request));
    });
  }

}
