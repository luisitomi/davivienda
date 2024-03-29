import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { EditarReferenciaComponent } from '../../components/editar-referencia/editar-referencia.component';
import { ReferenceComplementaryRequest, ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { MatTableDataSource } from '@angular/material/table';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { ToastrService } from 'ngx-toastr';
import { TypeReference } from '../../models/type-reference.model';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { HeaderLineService } from '../../services/header-line.service';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { finalize } from 'rxjs/operators';
import { UtilServices } from '../../../shared/component/general/util.sevice';

@Component({
  selector: 'app-referencias-complementarias',
  templateUrl: './referencias-complementarias.component.html',
  styleUrls: ['./referencias-complementarias.component.scss']
})
export class ReferenciasComplementariasComponent extends UnsubcribeOnDestroy implements OnInit {
  title = "Referencias Complementarias";
  index: number;
  line: string;
  lineList: Array<LineaAsientoInsert> = [];
  displayedColumns: string[] = ['index', 'nombre', 'valor', 'acciones'];
  references: MatTableDataSource<ReferenciaComplementaria> = new MatTableDataSource();
  queryParams: any;
  isIdentity: string;
  spinner = false;
  typeReference: Array<DropdownItem> = [];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private headerLineService: HeaderLineService,
    private utilServices: UtilServices,
  ) {
    super();
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
    this.utilServices.setTextValue('Masivo');
    this.getReferncesByid();
    this.getListReference();
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.nombre != null || result.nombre != undefined) {
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      let indexList: Array<ReferenciaComplementaria> = this.lineList[this.index].columnasReferenciales || [];

      
      if (this.references.data != null && this.references.data.length > 0) {
        for (let i = 0; i < this.references.data.length; i++) {
          const element = this.references.data[i];
          if (element.nombreValue == result.nombreValue) {
            this.toastr.warning(`Ya existe la referencia complementaria:  ${result.nombreValue}`, 'Advertencia');
            return;
          }
          
        }
      }
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

  getListReference(): void {
    this.spinner = true;
    const request: ReferenceComplementaryRequest = {
      origen: this.line,
      tipoColumna: '2',
    }
    const $line = this.headerLineService
      .getListReference(request)
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        (response: Array<TypeReference>) => {
          const $typeReference = this.typeReference = (response || []).map((data) => ({
            label: data?.valor,
            value: data?.codigo,
            type: data?.tipo,
          }));
          this.arrayToDestroy.push($typeReference);
        }
      );
    this.arrayToDestroy.push($line);
  }

  goToBack(): void {

    let valueFormat = 4;
    let message = '';

    var valIden = false;
    var valAux = false;
    var validacionSegmento = "";
    if (this.isIdentity === 'Y') {
      valIden = true;
      valAux = true;
      validacionSegmento = 'Y';
    } else if (this.isIdentity === 'Y1')  {
      valIden = true;
      valAux = false;
      validacionSegmento = 'Y';
    } else if (this.isIdentity === 'Y2')  {
      valAux = true;
      valIden = false;
      validacionSegmento = 'Y';
    } else {
      valIden = false;
      valAux = false;
      validacionSegmento ="";
    }
  
    if (validacionSegmento === 'Y') {
      if (this.references.data.findIndex(p => p.nombre === 'DAV_NRO_IDENTIFICACION') === -1
      && valIden /*&&
      this.typeReference.find(p => p.value === 'DAV_NRO_IDENTIFICACION') === -1*/) {
        valueFormat = 1;
        message = 'DAV_NRO_IDENTIFICACION';
      }
      let inexxx =    this.typeReference.findIndex(p => p.label === 'DAV_AUXILIAR_CONCILIACION');
      if (this.references.data.findIndex(p => p.nombre === 'DAV_AUXILIAR_CONCILIACION') === -1 &&
     /* this.typeReference.findIndex(p => p.label === 'DAV_AUXILIAR_CONCILIACION') >= 0 */ 
     this.line == 'SIF'
      && valAux) {
        valueFormat = 3;
        message = 'DAV_AUXILIAR_CONCILIACION';
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
