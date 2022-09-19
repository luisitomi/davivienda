import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { CombinacionContable } from '../../models/combinacion-contable.model';
import { HeaderLineService } from '../../services/header-line.service';
import { CombinacionContableComponent } from '../combinacion-contable/combinacion-contable.component';
import { EditarLineaComponent } from '../editar-linea/editar-linea.component';
import { EditarValueComponent } from '../editar-value/editar-value.component';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss'],
})
export class LineasComponent extends UnsubcribeOnDestroy implements OnInit, AfterViewChecked {
  @Input() visibleTable: boolean;
  @Input() refreshLine: boolean;
  @Output() proceesLine = new EventEmitter<boolean>();
  @Output() proceesLineRefresh = new EventEmitter<boolean>();
  title = "Líneas";
  lineList: Array<LineaAsientoInsert> = [];
  lines: MatTableDataSource<LineaAsientoInsert> = new MatTableDataSource();
  displayedColumns: string[] = ['index', 'duplicate', 'combinacion', 'moneda', 'debito', 'credito', 'referenciales', 'descripcion', 'acciones'];
  queryParams: any;
  lineName: string;
  validateInfo: any;
  spinner: boolean;

  constructor(
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private headerLineService: HeaderLineService,
  ) {
    super();
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngAfterViewChecked() {
    if (this.refreshLine) {
      this.lines.data = [];
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getLine();
  }

  getLine(): void {
    this.lines.data = [];
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    if (model?.line) {
      this.lines.data = model?.line || [];
      let number = 1;
      this.lines.data.forEach((element: any) => {
        element.nroLinea = number;
        number++;
      });
      let validateConta: number = 0;

      model?.line?.forEach((element: any) => {
        if (!element?.combinationAccount) {
          validateConta += 1;
        }
        /*if (!element?.columnasReferenciales.length) {
          validateRefe += 1;
        }*/
      });
      this.proceesLine.emit(Boolean(this.lines.data.length && !validateConta));
    } else {
      this.lines.data = [];
      this.proceesLineRefresh.emit(this.refreshLine);
      this.proceesLine.emit(Boolean(this.lines.data.length));
    }
  }

  addReference(index: number): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    this.lineName = model?.header?.SourceName;
    this.validateInfo = model?.line[index]?.combinationAccount?.SegGlAccountValue || undefined;
    /*if (this.validateInfo) {*/
    this.router.navigate(['carga-asientos/referencias-complementarias', index, this.lineName, this.validateInfo],
      {
        queryParams: this.queryParams,
        skipLocationChange: false,
        queryParamsHandling: 'merge',
      }
    );
    /*} else {
      this.toastr.warning(`Falta agregar Combinación Contable en el ${index + 1} registro.`, 'Advertencia');
      return;
    }*/
  }

  editLine(data: LineaAsientoInsert, index: number): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: data, type: appConstants.typeEvent.EDIT },
      panelClass: 'my-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
      const references = this.lineList[index]?.columnasReferenciales;
      const complementary = this.lineList[index]?.combinationAccount;
      this.lineList.splice(index, 1);
      if (result?.SegCurrency) {
        result.columnasReferenciales = references || [];
        result.combinationAccount = complementary || undefined;
        this.lineList.splice(index, 0, result);
        const request: ManualLading = {
          header: model?.header,
          line: this.lineList,
        }
        this.setDataLocal(request, this.lineList);
      }
    });
  }

  deleteLine(index: number): void {
    this.lines.data.splice(index, 1);
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    this.lines.data?.forEach((element: any, indexItem: any) => {
      if (indexItem > index) {
        element.nroLinea -= 1;
      }
    });
    const request: ManualLading = {
      header: model?.header,
      line: this.lines.data,
    }
    this.setDataLocal(request, this.lines.data);
  }

  newLine(event: any): void {
    if (event?.srcElement?.tagName == "MAT-ICON") {
      let validateConta: number = 0;

      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      model?.line?.forEach((element: any) => {
        if (!element?.combinationAccount) {
          validateConta += 1;
        }
        /*if (!element?.columnasReferenciales.length) {
          validateRefe += 1;
        }*/
      });
      if (this.visibleTable && Boolean(this.lines.data.length && !validateConta)) {
        const dialogRef = this.dialog.open(EditarLineaComponent, {
          width: '80%',
          maxWidth: '400px',
          data: { data: null, type: appConstants.typeEvent.SAVE },
          panelClass: 'my-dialog',
          disableClose: true,
        });

        dialogRef.afterClosed().subscribe(result => {
          const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
          this.lineList = model?.line || [];
          if (result?.SegCurrency) {
            result.nroLinea = this.lineList.length + 1;
            this.lineList.push(result);
            const request: ManualLading = {
              header: model?.header,
              line: this.lineList,
            }
            this.setDataLocal(request, this.lineList);
          }
        });
      } else {
        if (this.lines.data.length === 0 && this.visibleTable) {
          const dialogRef = this.dialog.open(EditarLineaComponent, {
            width: '80%',
            maxWidth: '400px',
            data: { data: null, type: appConstants.typeEvent.SAVE },
            panelClass: 'my-dialog',
            disableClose: true,
          });

          dialogRef.afterClosed().subscribe(result => {
            const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
            this.lineList = model?.line || [];
            if (result?.SegCurrency) {
              result.nroLinea = this.lineList.length + 1;
              this.lineList.push(result);
              const request: ManualLading = {
                header: model?.header,
                line: this.lineList,
              }
              this.setDataLocal(request, this.lineList);
            }
          });
        } else {
          this.toastr.warning(`Faltan completar datos`, 'Advertencia');
        }
      }
    }
  }

  complementary(index: number): void {
    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    this.lineList = model?.line || [];
    const complem = this.lineList[index]?.combinationAccount || undefined;

    const dialogRef = this.dialog.open(CombinacionContableComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: complem ? complem : null, type: complem ? appConstants.typeEvent.EDIT : appConstants.typeEvent.SAVE },
      panelClass: 'my-dialog',
      maxHeight: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lineList[index].combinationAccount = this.lineList[index].combinationAccount || undefined;
      if (result?.SegGlAccount) {
        result.nroLinea = index + 1;
        this.lineList[index].combinationAccount = result;
        const request: ManualLading = {
          header: model?.header,
          line: this.lineList,
        }
        this.setDataLocal(request, this.lineList);
      }
    });

  }

  numerTranfors(number: any): string {
    var num = Number(number)?.toFixed(2)
    var numArr = num.split('.')
    // eslint-disable-next-line no-redeclare
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for (var i = 0; i < len; i++) {
      result.push(operateNum[i])
      if (((i + 1) % 3 === 0) && (i !== len - 1)) {
        result.push(',')
      }
    }

    if (dotNum) {
      result.reverse().push('.', ...dotNum)
      return result.join('')
    } else {
      return result.reverse().join('')
    }
  }

  setDataLocal(request: ManualLading, lits: Array<LineaAsientoInsert>): void {
    localStorage.removeItem(appConstants.modelSave.NEWSEAT);
    localStorage.setItem(appConstants.modelSave.NEWSEAT, JSON.stringify(request));
    let validateConta: number = 0;

    const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
    model?.line?.forEach((element: any) => {
      if (!element?.combinationAccount) {
        validateConta += 1;
      }
      /*if (element?.columnasReferenciales.length) {
        validateRefe += 1;
      }*/
    });
    this.lines.data = lits;
    this.proceesLine.emit(Boolean(this.lines.data.length && !validateConta));
    let number = 1;
    this.lines.data.forEach((element: any) => {
      element.nroLinea = number;
      number++;
    });
  }

  copyLine(position: number): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: null, type: appConstants.typeEvent.SAVE },
      panelClass: 'my-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
      if (result?.SegCurrency) {
        result.nroLinea = this.lineList.length + 1;
        result.columnasReferenciales = this.lineList[position].columnasReferenciales;
        result.combinationAccount = this.lineList[position].combinationAccount;
        this.lineList.push(result);
        const request: ManualLading = {
          header: model?.header,
          line: this.lineList,
        }
        this.setDataLocal(request, this.lineList);
      }
    });
  }

  refreshValue(value: string, index: number, typeId: number): void {
    const dialogRef = this.dialog.open(EditarValueComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { data: { valor: value }, type: appConstants.typeEvent.EDIT },
      panelClass: 'my-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      this.lineList = model?.line || [];
      let data = this.lineList[index]?.combinationAccount;
      if (result?.valor) {
        switch (typeId) {
          case 0:
            const request = {
              tipo: appConstants.segmentValue.Compania,
              valor: result.valor,
            }
            this.spinner = true;
            const $event = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1  ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData0: CombinacionContable = {
                    Company: result.valor || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData0
                  const request: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request, this.lineList);
                }
              )
            this.arrayToDestroy.push($event)
            break;
          case 1:
            const request1 = {
              tipo: appConstants.segmentValue.Cuenta,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event1 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request1)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  var cuentaSeleccionada = response[0];
                  var typeCuenta = 
                  ( 
                    (
                      cuentaSeleccionada.REQUIERE_IDENTIFICACION_CLI == 'Y' && 
                      cuentaSeleccionada.REQUIERE_AUXILIAR_CONCILIACION == 'Y' )? "Y" :
                      
                     ( (cuentaSeleccionada.REQUIERE_IDENTIFICACION_CLI == 'Y') ?"Y1":  
                     
                     ( (cuentaSeleccionada.REQUIERE_AUXILIAR_CONCILIACION == 'Y') ? "Y2" :"")
                     )
                     // event?.result?.REQUIERE_IDENTIFICACION_CLI == 'Y' || event?.result?.REQUIERE_IDENTIFICACION_CLI == 'Y') ? 'Y': event?.result?.tipo 
                    )
                  const valueData1: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: result.valor || '',
                    SegGlAccountValue: typeCuenta || 'N',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData1
                  const request1: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request1, this.lineList);
                }
              )
            this.arrayToDestroy.push($event1)
            break;
          case 2:
            const request2 = {
              tipo: appConstants.segmentValue.Oficina,
              codigo: result.valor,
              padre: data?.SegSucursal,
            }
            this.spinner = true;
            const $event2 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request2)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData2: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: result.valor || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData2
                  const request2: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request2, this.lineList);
                })
            this.arrayToDestroy.push($event2)
            break;
          case 3:
            const request3 = {
              tipo: appConstants.segmentValue.Sucursal,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event3 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request3)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData3: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: 'OFICINA' || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: result.valor || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData3
                  const request3: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request3, this.lineList);
                })
            this.arrayToDestroy.push($event3)
            break;
          case 4:
            const request4 = {
              tipo: appConstants.segmentValue.Proyecto,
              codigo: result.valor,
              padre: data?.Company,
            }
            this.spinner = true;
            const $event4 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request4)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData4: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: result.valor || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData4
                  const request4: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request4, this.lineList);
                })
            this.arrayToDestroy.push($event4)
            break;
          case 5:
            const request5 = {
              tipo: appConstants.segmentValue.Subproyecto,
              codigo: result.valor,
            }
            const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
            let origen = ""; 
            let origenSIF = "";
            if (model?.header) {
                origen = model?.header?.SourceName;
                origenSIF = appConstants.origen.ORIGEN_SIF;
              }
              if (origen == origenSIF) {
                if (result.valor== undefined || result.valor == null || result.valor == '') {
                  this.toastr.warning(`Debe ingresar un valor`, 'Advertencia');
                    return;
                }

                const valueData5: CombinacionContable = {
                  Company: data?.Company || '',
                  SegF1: data?.SegF1 || '',
                  SegF2: data?.SegF2 || '',
                  SegGlAccount: data?.SegGlAccount || '',
                  SegGlAccountValue: data?.SegGlAccountValue || '',
                  SegIntecompany: data?.SegIntecompany || '',
                  SegOficina: data?.SegOficina || '',
                  SegProyecto: data?.SegProyecto || '',
                  SegSubProyecto: result.valor || '',
                  SegSucursal: data?.SegSucursal || '',
                  SegTipoComprobante: data?.SegTipoComprobante || '',
                  SegVinculado: data?.SegVinculado || '',
                  ValueInformation: data?.ValueInformation || '',
                  addCuenta: '',
                  addFuturo1: '',
                  addFuturo2: '',
                  addIntercompañia: '',
                  addOficina: '',
                  addProyecto: '',
                  addSubProyecto: '',
                  addSucursal: '',
                  addTipoComprobante: '',
                  addVinculado: '',
                  nameSucursal: '',
                  nameOficina: ''
                }
                this.lineList[index].combinationAccount = valueData5
                const request5: ManualLading = {
                  header: model?.header,
                  line: this.lineList,
                }
                this.setDataLocal(request5, this.lineList);
                return;
              }
            this.spinner = true;
            const $event5 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request5)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData5: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: result.valor || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData5
                  const request5: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request5, this.lineList);
                })
            this.arrayToDestroy.push($event5)
            break;
          case 6:
            const request6 = {
              tipo: appConstants.segmentValue.Tipo_Comprobante,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event6 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request6)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData6: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: result.valor || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData6
                  const request6: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request6, this.lineList);
                })
            this.arrayToDestroy.push($event6)
            break;
          case 7:
            const request7 = {
              tipo: appConstants.segmentValue.Intercompañía,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event7 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request7)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData7: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: result.valor || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData7
                  const request7: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request7, this.lineList);
                })
            this.arrayToDestroy.push($event7)
            break;
          case 8:
            const request8 = {
              tipo: appConstants.segmentValue.Vinculado,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event8 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request8)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData8: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: result.valor || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData8
                  const request8: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request8, this.lineList);
                })
            this.arrayToDestroy.push($event8)
            break;
          case 9:
            const request9 = {
              tipo: appConstants.segmentValue.Futuro_1,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event9 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request9)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData9: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: result.valor || '',
                    SegF2: data?.SegF2 || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData9
                  const request9: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request9, this.lineList);
                })
            this.arrayToDestroy.push($event9)
            break;
          case 10:
            const request10 = {
              tipo: appConstants.segmentValue.Futuro_2,
              codigo: result.valor,
            }
            this.spinner = true;
            const $event10 = this.headerLineService
              .getApiUrlTsFahGetSegmentosWS(request10)
              .pipe(finalize(() => this.spinner = false))
              .subscribe(
                (response: any) => {
                  if (response == null || response?.length != 1 ) {
                    this.toastr.warning(`El valor ingresado no es correcto`, 'Advertencia');
                    return;
                  }
                  const valueData10: CombinacionContable = {
                    Company: data?.Company || '',
                    SegF1: data?.SegF1 || '',
                    SegF2: result.valor || '',
                    SegGlAccount: data?.SegGlAccount || '',
                    SegGlAccountValue: data?.SegGlAccountValue || '',
                    SegIntecompany: data?.SegIntecompany || '',
                    SegOficina: data?.SegOficina || '',
                    SegProyecto: data?.SegProyecto || '',
                    SegSubProyecto: data?.SegSubProyecto || '',
                    SegSucursal: data?.SegSucursal || '',
                    SegTipoComprobante: data?.SegTipoComprobante || '',
                    SegVinculado: data?.SegVinculado || '',
                    ValueInformation: data?.ValueInformation || '',
                    addCuenta: '',
                    addFuturo1: '',
                    addFuturo2: '',
                    addIntercompañia: '',
                    addOficina: '',
                    addProyecto: '',
                    addSubProyecto: '',
                    addSucursal: '',
                    addTipoComprobante: '',
                    addVinculado: '',
                    nameSucursal: '',
                    nameOficina: ''
                  }
                  this.lineList[index].combinationAccount = valueData10
                  const request10: ManualLading = {
                    header: model?.header,
                    line: this.lineList,
                  }
                  this.setDataLocal(request10, this.lineList);
                })
            this.arrayToDestroy.push($event10)
            break;
        }
      }
    })
  }
}
