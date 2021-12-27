import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { EditarReferenciaComponent } from '../../components/editar-referencia/editar-referencia.component';
import { ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-referencias-complementarias',
  templateUrl: './referencias-complementarias.component.html',
  styleUrls: ['./referencias-complementarias.component.scss']
})
export class ReferenciasComplementariasComponent implements OnInit {
  title = "Referencias Complementarias";
  index: number;
  lineList: Array<LineaAsientoInsert> = [];
  displayedColumns: string[] = ['nombre', 'valor', 'acciones'];
  references: MatTableDataSource<ReferenciaComplementaria> = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.index = +params['linea'];
    });
  }

  ngOnInit(): void {
    this.getReferncesByid();
  }

  getReferncesByid(): void {
    const model = JSON.parse(localStorage.getItem('model') || '{}');
    if (model?.line) {
      this.lineList = model?.line;
      const indexList = this.lineList[this.index].columnasReferenciales || [];
      this.references.data = indexList;
    }
  }

  deleteReference(index: number): void {
    const model = JSON.parse(localStorage.getItem('model') || '{}');
    if (model?.line) {
      this.lineList = model?.line;
      const indexList = this.lineList[this.index].columnasReferenciales || [];
      indexList.splice(index, 1);
      this.lineList[this.index].columnasReferenciales = indexList;
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList
      }
      this.setDataLocal(request);
    }
  }

  newReference(): void {
    const dialogRef = this.dialog.open(EditarReferenciaComponent, {
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
      let indexList: Array<ReferenciaComplementaria> = this.lineList[this.index].columnasReferenciales || [];
      if (result?.nombre) {
        indexList = this.lineList[this.index].columnasReferenciales || [];
        indexList.push(result);
      }
      this.lineList[this.index].columnasReferenciales = indexList;
      const request: ManualLading = {
        header: model?.header,
        line: this.lineList
      }
      this.setDataLocal(request);
    });
  }

  setDataLocal(request: ManualLading): void {
    localStorage.removeItem('model');
    localStorage.setItem('model',JSON.stringify(request));
    this.getReferncesByid();
  }

  goToBack(): void {
    this.router.navigate(['carga-asientos/nuevo-asiento-manual?token=prueb']);
  }
}
