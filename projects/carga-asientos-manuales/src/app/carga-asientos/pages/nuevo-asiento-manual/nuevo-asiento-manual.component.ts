import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { HeadboardSeat } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { UtilServices } from '../../../shared/component/general/util.sevice';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { InserHeaderLine, LineSave } from '../../models/insert-header-line';
import { ReferenceComplementaryRequest, ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { TypeReference } from '../../models/type-reference.model';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss'],
  providers: [DatePipe],
})
export class NuevoAsientoManualComponent extends UnsubcribeOnDestroy implements AfterViewChecked, OnInit {
  disabledForm = false;
  validateForm = false;
  visibleForm = true;
  validateTable = false;
  visibleTable = false;
  dataHeader: HeadboardSeat;
  lineList: Array<LineaAsientoInsert>;
  queryParams: any;
  spinner = false;
  nombreUsuario: string;
  typeReference: Array<DropdownItem> = [];
  updateLine = false;
  restForm = false;
  valorupdateForm: string;
  leaders: Array<DropdownItem>;
  autorizacion: string;
  listValidacionCuenta: any[]
  constructor(
    private cdRef:ChangeDetectorRef,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerLineService: HeaderLineService,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog,
    private periodoContableService: HeaderLineService,
    private utilServices: UtilServices,
  ) {
    super();
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }
  
  ngOnInit(): void {
    this.authService.getToken().subscribe(
      (token) => {
        this.autorizacion = 'Bearer ' + token;
      }
    );
    this.utilServices.setTextValue('Carga Manual');
    this.getLeader();
    this.getTsFahCargaAsientoCrossCuentasWS();
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  proceesAutomaty(validate: boolean){
    if(validate){
      this.disabledForm = true;
      this.validateTable = false;
      this.visibleForm = false;
      this.visibleTable = true;
    }
  }

  dataValidate(data: HeadboardSeat): void {
    if (this.validateForm) {
      this.dataHeader = data;
    }
  }

  proceesAutomatyResh(validate: boolean): void {
    this.updateLine = validate;
    this.restForm = validate;
    this.visibleForm = true;
    this.disabledForm = false;
    this.visibleTable = false;
  }

  processValidate(validate: boolean): void {
    this.validateForm = validate;
  }

  proceesLine(validate: boolean): void {
    this.validateTable = validate;
  }

  proceesLineRefresh(validate: boolean): void {
    if ( validate ){
      this.validateTable = false;
      this.visibleForm = true;
      this.visibleTable = false;
      this.disabledForm = false;
    }
  }

  proceesLineRefreshInitial(validate: boolean): void {
    if ( validate ){
      this.validateTable = false;
      this.visibleForm = true;
      this.visibleTable = false;
      this.disabledForm = false;
    }
  }

  getLeader(): void {
    const $leader = this.periodoContableService
      .getListLeader()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.leaders = (response || []).map((data) => ({
            label: data?.BU_NAME,
            value: data?.LEDGER_ID,
          }),
        )}
      );
    this.arrayToDestroy.push($leader);
  }

  getTsFahCargaAsientoCrossCuentasWS(): void {
    const $leader = this.periodoContableService
      .getTsFahCargaAsientoCrossCuentasWS()
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any[]) => {
          this.listValidacionCuenta = response;
          /*
          this.leaders = (response || []).map((data) => ({
            label: data?.BU_NAME,
            value: data?.LEDGER_ID,
          }),
        )
       */
      }
      );
    
    this.arrayToDestroy.push($leader);
  }

  saveHeadboard(): void {
    if (this.validateForm) {
      this.disabledForm = true;
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      const header: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: this.dataHeader?.leader,
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: this.datePipe.transform(this.dataHeader?.accountingDate, appConstants.eventDate.format2) || '',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: this.nombreUsuario,
        Period: this.dataHeader?.period,
      }
      const request: ManualLading = {
        header: header,
        line: this.lineList,
      }
      localStorage.removeItem(appConstants.modelSave.NEWSEAT);
      localStorage.setItem(appConstants.modelSave.NEWSEAT,JSON.stringify(request));
      this.visibleForm = false;
      this.visibleTable = true;
      this.validateForm = false;
      this.updateLine = false;
      this.validateTable = false;
      this.restForm = false;
      this.getListReference(this.dataHeader?.origen);
    }
  }

  getListReference(valueOrigen: string): void {
    this.spinner = true;
    this.disabledForm = true;
    const request: ReferenceComplementaryRequest = {
      origen: valueOrigen,
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

  send(): void {
    
    if (this.validateTable) {
      this.spinner = true;
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      const line: Array<LineaAsientoInsert> = model?.line || [];
      const lineSaveComprobante = line[0]?.combinationAccount?.SegTipoComprobante;
      //const lineSaveSucursal = line[0]?.combinationAccount?.SegSucursal;
      const lineSaveOficina = line[0]?.combinationAccount?.SegOficina;
      const lineSave: LineSave[] = (line || []).map((data, index) => ({
        id: 0,
        nameSucursal: data?.combinationAccount?.nameSucursal || '',
        nameOficina: data?.combinationAccount?.nameOficina || '',
        nroLinea: index + 1,
        company: data?.combinationAccount?.Company?.split(' ')[0],
        segGlAccount: data?.combinationAccount?.SegGlAccount,
        segGlAccountValue: data?.combinationAccount?.SegGlAccountValue,
        segOficina: data?.combinationAccount?.SegOficina,
        segSucursal: data?.combinationAccount?.SegSucursal,
        segProyecto: data?.combinationAccount?.SegProyecto,
        segSubProyecto: data?.combinationAccount?.SegSubProyecto,
        segTipoComprobante: data?.combinationAccount?.SegTipoComprobante,
        segIntecompany: data?.combinationAccount?.SegIntecompany,
        segVinculado: data?.combinationAccount?.SegVinculado,
        segF1: data?.combinationAccount?.SegF1,
        segF2: data?.combinationAccount?.SegF2,
        segCurrency: data?.SegCurrency,
        enteredDebit: data?.EnteredDebit,
        enteredCredit: data?.EnteredCredit,
        description: '',
        usuario: this.nombreUsuario,
        validacionReglaCuenta: this.listValidacionCuenta.filter(p => data?.combinationAccount?.SegGlAccount.startsWith( p?.valorRegla) == true ).map(item => item.reglaValidacion) +'',
        informacionReferencial: (data?.columnasReferenciales || []).map((refere: ReferenciaComplementaria, subindex) => ({
          nroRefCom: subindex + 1,
          referenciaComprobante: refere?.nombreValue,
          referenciaComprobanteValue:  refere?.nombre,
          valor: refere?.valor,
        }))
      }));
      
      /*const totalDebito = lineSave.map(item => Number(item.enteredDebit)).reduce((prev, curr) => Number(prev) + Number(curr), 0);
      const totalCredito = lineSave.map(item => Number(item.enteredCredit)).reduce((prev, curr) => Number(prev) + Number(curr), 0);
      if (totalDebito !== totalCredito) {
        this.toastr.warning("La suma entre los montos de crédito y débito son diferentes", 'Advertencia');
        this.spinner = false;
        return;
      }*/

      let permission = true;
      lineSave.forEach((element, index) => {
        const totalDebito = lineSave.filter(p => p?.segSucursal === element?.segSucursal &&  p?.segOficina === element?.segOficina &&  p?.validacionReglaCuenta === element?.validacionReglaCuenta ).map(item => Number(item.enteredDebit)).reduce((prev, curr) => Number(prev) + Number(curr), 0);
        const totalCredito = lineSave.filter(p => p?.segSucursal === element?.segSucursal && p?.segOficina === element?.segOficina &&  p?.validacionReglaCuenta === element?.validacionReglaCuenta ).map(item => Number(item.enteredCredit)).reduce((prev, curr) => Number(prev) + Number(curr), 0);
        if (totalDebito !== totalCredito) {
          this.toastr.warning(`La suma entre los montos de crédito y débito son diferentes en la sucursal ${element?.nameSucursal}, oficina ${element?.nameOficina} y la ${element?.validacionReglaCuenta}`, 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }
        /*if (!element.informacionReferencial?.length) {
          this.toastr.warning("Falta agregar Información Referencial en el " + (index + 1 ) + " registro.", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }*/
        if (element?.segTipoComprobante !== lineSaveComprobante) {
          this.toastr.warning("Los tipos de comprobante son diferentes", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }
        /*if (element?.segSucursal !== lineSaveSucursal) {
          this.toastr.warning("Los valores de sucursal son diferentes", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }*/
       /*
        if (element?.segOficina !== lineSaveOficina) {
          this.toastr.warning("Los valores de oficina son diferentes", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        } */

        if (element?.segOficina === 'OFICINA') {
          this.toastr.warning(`Debe elegir una oficina en la linea ${index + 1} `, 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }
        let exist = 0;
        let message = "";

        var valIden = false;
        var valAux = false;
        var validacionSegmento = "";
        if (element.segGlAccountValue === 'Y') {
          valIden = true;
          valAux = true;
          validacionSegmento = 'Y';
        } else if (element.segGlAccountValue === 'Y1')  {
          valIden = true;
          valAux = false;
          validacionSegmento = 'Y';
        } else if (element.segGlAccountValue === 'Y2')  {
          valAux = true;
          valIden = false;
          validacionSegmento = 'Y';
        } else {
          valIden = false;
          valAux = false;
          validacionSegmento ="";
        }

        if (validacionSegmento === 'Y') {
       //   console.log('element.segGlAccountValue === Y')
        //  console.log(element?.informacionReferencial)
          if (element?.informacionReferencial?.findIndex(p => p.referenciaComprobanteValue === 'DAV_NRO_IDENTIFICACION') === -1 
          && valIden /*&&
            this.typeReference.find(p => p.value === 'DAV_NRO_IDENTIFICACION') === -1*/) {
            exist += 1;
              message = "Número de Identificación";
          }
       //   let inexxx =    this.typeReference.findIndex(p => p.label === 'DAV_AUXILIAR_CONCILIACION');

    
          if (element?.informacionReferencial?.findIndex(p => p.referenciaComprobanteValue === 'DAV_AUXILIAR_CONCILIACION') === -1 &&
          this.dataHeader?.origen === 'SIF'/* this.typeReference.findIndex(p => p.label === 'DAV_AUXILIAR_CONCILIACION') >= 0  */
            && valAux) {
            exist += 1;
              message = "Auxiliar de Conciliación";
          }
          if (exist) {
            this.toastr.warning(`Falta agregar la referencia de ${message} en el ${index + 1} registro.`, 'Advertencia');
            this.spinner = false;
            permission = false;
            return;
          }
        }
      });
      //return;
      if (permission) {
        const request: InserHeaderLine = {
          id: 0,
          legderName: this.leaders.find( p => p.value === model?.header?.LegderName)?.label || '',
          sourceName: model?.header?.SourceName,
          trxNumber: model?.header?.TrxNumber,
          accountingDate: model?.header?.AccountingDate?.replace('/','-').replace('/','-').replace('/','-'),
          description: model?.header?.Description,
          usuario: this.nombreUsuario,
          linea: lineSave || undefined,
          Jwt: this.autorizacion
        }

        const $save = this.headerLineService
          .saveHeaderLine(request)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if(response?.status === appConstants.responseStatus.OK) {
                localStorage.removeItem(appConstants.modelSave.NEWSEAT);
                this.dialog.open(ConfirmationComponent, {
                  width: '80%',
                  maxWidth: '400px',
                  data: { name: 'Se regitró correctamente con el número de asiento '+ response?.trxNumber},
                  panelClass: 'my-dialog',
                });
                this.valorupdateForm = response?.trxNumber;                
                this.processValidate(true);
                this.proceesAutomatyResh(true);               
                this.processValidate(true);
                this.proceesAutomatyResh(true);
                this.toastr.success(response?.message, 'Registro');
              }          
            }
          )
        this.arrayToDestroy.push($save);
      }
    }
  }
}