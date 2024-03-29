import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { EditarReferenciaComponent } from '../../components/editar-referencia/editar-referencia.component';
import { ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { MatTableDataSource } from '@angular/material/table';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referencias-complementarias',
  templateUrl: './referencias-complementarias.component.html',
  styleUrls: ['./referencias-complementarias.component.scss']
})
export class ReferenciasComplementariasComponent implements OnInit {
  title = "Referencias Complementarias";
  index: number;
  line: string;
  lineList: Array<LineaAsientoInsert> = [];
  displayedColumns: string[] = ['index', 'nombre', 'valor', 'acciones'];
  references: MatTableDataSource<ReferenciaComplementaria> = new MatTableDataSource();
  queryParams: any;
  isIdentity: string;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.index = +params['index'];
      this.line = params['linea'];
      this.isIdentity= params['status'];
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngOnInit(): void {
    this.getReferncesByid();
  }

  getReferncesByid(): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    if (model?.line) {
      this.lineList = model?.line;
      const indexList = this.lineList[this.index].columnasReferenciales || [];
      this.references.data = indexList;
      let number = 1;
      this.references.data.forEach((element: any) => {
        element.index = number;
        number++;
      });
    }
  }

  editReference(data: ReferenciaComplementaria, index: number): void {
    const dialogRef = this.dialog.open(EditarReferenciaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: data, type: appConstants.typeEvent.EDIT, name: this.line },
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      this.references.data.splice(index, 1);
      if (result?.nombre) {
        result.index = index + 1;
        this.references.data.splice(index, 0, result);
        this.lineList[this.index].columnasReferenciales = this.references.data || [];
        const request: ManualLading = {
          header: model?.header,
          line: this.lineList,
        }
        this.setDataLocal(request);
      }
    });
  }

  deleteReference(index: number): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    if (model?.line) {
      this.lineList = model?.line;
      this.lineList[this.index].columnasReferenciales?.forEach((element: any,indexItem: any) => {
        if(indexItem > index) {
          element.index -=  1;
        }
      });
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
      data: { data: null, type: appConstants.typeEvent.SAVE, name: this.line },
      panelClass: 'my-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      let indexList: Array<ReferenciaComplementaria> = this.lineList[this.index].columnasReferenciales || [];
      if (result?.nombre) {
        result.index = this.lineList[this.index]?.columnasReferenciales?.length || 0 + 1;
        indexList = this.lineList[this.index].columnasReferenciales || [];
        indexList.push(result);
        this.lineList[this.index].columnasReferenciales = indexList;
        const request: ManualLading = {
          header: model?.header,
          line: this.lineList
        }
        this.setDataLocal(request);
      }
    });
  }

  setDataLocal(request: ManualLading): void {
    localStorage.removeItem(appConstants.modelSave.NEWSEAT);
    localStorage.setItem(appConstants.modelSave.NEWSEAT,JSON.stringify(request));
    this.getReferncesByid();
  }

  goToBack(): void {
    let valueFormat = 4;
    let message = '';
    if (this.references.data.findIndex(p => p.nombre === 'Plazo /Periodo') === -1) {
      valueFormat = 2;
      message = 'Plazo /Periodo';
    }
    if (this.isIdentity === 'Y') {
      if (this.references.data.findIndex(p => p.nombre === 'Auxiliar de Conciliación') === -1) {
        valueFormat = 1;
        message = 'Auxiliar de Conciliación';
      }
      if (this.references.data.findIndex(p => p.nombre === 'Número de Identificación') === -1) {
        valueFormat = 3;
        message = 'Número de Identificación';
      }
    }
    if (valueFormat !== 4) {
      this.toastr.warning(`Debe agregar información de ${message}'`, 'Advertencia');
      return;
    }
    this.router.navigate(['carga-asientos/nuevo-asiento-manual'],
      {
        queryParams: this.queryParams,
        skipLocationChange: false,
        queryParamsHandling: 'merge',
      }
    );
  }
}
