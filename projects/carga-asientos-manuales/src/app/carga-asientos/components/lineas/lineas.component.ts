import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { CombinacionContableComponent } from '../combinacion-contable/combinacion-contable.component';
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
  displayedColumns: string[] = ['index', 'combinacion', 'moneda', 'debito', 'credito', 'referenciales', 'acciones'];
  queryParams: any;

  constructor(
    private dialog: MatDialog,
    private cdRef:ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getLine();
  }

  getLine(): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    if (model?.line) {
      this.lines.data = model?.line || [];
      let number = 1;
      this.lines.data.forEach((element: any) => {
        element.index = number;
        number++;
      });
      this.proceesLine.emit(this.lines.data.length ? true : false);
    }
  }

  addReference(index: number): void {
    this.router.navigate(['carga-asientos/referencias-complementarias', index],
      {
        queryParams: this.queryParams,
        skipLocationChange: false,
        queryParamsHandling: 'merge',
      }
    );
  }

  editLine(data: LineaAsientoInsert, index: number): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: data, type: 1 },
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
      const references = this.lineList[index]?.columnasReferenciales;
      result.columnasReferenciales = references || [];
      const complementary = this.lineList[index]?.SegGlAccount;
      result.SegGlAccount = complementary || undefined;
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
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
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
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
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

  newComplementary(index: number): void {
    const dialogRef = this.dialog.open(CombinacionContableComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: null, type: 0 },
      panelClass: 'my-dialog',
      maxHeight: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
      this.lineList[index].SegGlAccount = undefined;
      if (result?.comp1) {
        this.lineList[index].SegGlAccount = result;
      }
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList,
      }
      this.setDataLocal(request, this.lineList);
    });
  }

  setDataLocal(request: ManualLading, lits: Array<LineaAsientoInsert>): void {
    localStorage.removeItem(appConstants.modelSave.NEWSEAT);
    localStorage.setItem(appConstants.modelSave.NEWSEAT,JSON.stringify(request));
    this.proceesLine.emit(this.lines.data.length ? true : false);
    this.lines.data = lits;
    let number = 1;
    this.lines.data.forEach((element: any) => {
      element.index = number;
      number++;
    });
  }
}
