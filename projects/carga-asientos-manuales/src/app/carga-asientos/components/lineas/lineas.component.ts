import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { EditarLineaComponent } from '../editar-linea/editar-linea.component';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss']
})
export class LineasComponent implements OnInit, AfterViewChecked {
  @Input() visibleTable: boolean;
  @Output() proceesLine = new EventEmitter<boolean>();
  title = "Líneas";
  lineList: Array<LineaAsientoInsert> = [];
  lines: MatTableDataSource<LineaAsientoInsert> = new MatTableDataSource();
  displayedColumns: string[] = ['combinacion', 'moneda', 'debito', 'credito', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private cdRef:ChangeDetectorRef,
  ) { }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    const model = JSON.parse(localStorage.getItem('model') || '{}');
    if (model?.line) {
      this.lines.data = model?.line || [];
      this.proceesLine.emit(!!this.lines.data.length);
    }
  }

  deleteLine(index: number): void {
    this.lines.data.splice(index, 1);
    this.lines.data = this.lines.data;
    const model = JSON.parse(localStorage.getItem('model') || '{}');
    const request: ManualLading = {
      header: model?.header,
      line: this.lines.data,
    }
    localStorage.removeItem('model');
    localStorage.setItem('model',JSON.stringify(request));
    this.proceesLine.emit(!!this.lines.data.length);
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
      if (result?.SegCurrency) {
        this.lineList.push(result);
      }
      this.lines.data = this.lineList;
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList,
      }
      localStorage.removeItem('model');
      localStorage.setItem('model',JSON.stringify(request));
      this.proceesLine.emit(!!this.lines.data.length);
    });
  }

}
