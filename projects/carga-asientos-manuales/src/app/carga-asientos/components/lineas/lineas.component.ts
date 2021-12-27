import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = ['combinacion', 'moneda', 'debito', 'credito', 'referenciales', 'acciones'];

  constructor(
    private dialog: MatDialog,
    private cdRef:ChangeDetectorRef,
    private router: Router,
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

  addReference(index: number): void {
    this.router.navigate(['carga-asientos/referencias-complementarias', index]);
  }

  editLine(data: LineaAsientoInsert, index: number): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: data, type: 1 },
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem('model') || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      this.lineList.splice(index, 1);
      if (result?.SegCurrency) {
        this.lineList.splice(index, 0, result);
      }
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList,
      }
      this.setDataLocal(request, this.lineList);
    });
  }

  deleteLine(index: number): void {
    this.lines.data.splice(index, 1);
    const model = JSON.parse(localStorage.getItem('model') || '{}');
    const request: ManualLading = {
      header: model?.header,
      line: this.lines.data,
    }
    this.setDataLocal(request, this.lines.data);
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
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList,
      }
      this.setDataLocal(request, this.lineList);
    });
  }

  setDataLocal(request: ManualLading, lits: Array<LineaAsientoInsert>): void {
    localStorage.removeItem('model');
    localStorage.setItem('model',JSON.stringify(request));
    this.proceesLine.emit(!!this.lines.data.length);
    this.lines.data = lits;
  }
}
