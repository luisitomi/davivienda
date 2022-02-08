import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { HeadboardSeat } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';
import { InserHeaderLine, LineSave } from '../../models/insert-header-line';
import { ReferenciaComplementaria } from '../../models/referencia-complementaria.model';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss'],
  providers: [DatePipe],
})
export class NuevoAsientoManualComponent extends UnsubcribeOnDestroy implements AfterViewChecked {
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

  constructor(
    private cdRef:ChangeDetectorRef,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerLineService: HeaderLineService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) {
    super();
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  proceesAutomaty(validate: boolean){
    if(validate){
      this.saveHeadboard();
    }
  }

  dataValidate(data: HeadboardSeat): void {
    if (this.validateForm) {
      this.dataHeader = data;
    }
  }

  processValidate(validate: boolean): void {
    this.validateForm = validate;
  }

  proceesLine(validate: boolean): void {
    this.validateTable = validate;
  }

  saveHeadboard(): void {
    if (this.validateForm) {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      const header: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: this.dataHeader?.leader,
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: this.datePipe.transform(this.dataHeader?.accountingDate, appConstants.eventDate.format) || '',
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
      this.disabledForm = true;
    }
  }

  send(): void {
    if (this.validateTable) {
      this.spinner = true;
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      const line: Array<LineaAsientoInsert> = model?.line || [];
      const lineSaveComprobante = line[0]?.combinationAccount?.SegTipoComprobante;;
      const lineSave: LineSave[] = (line || []).map((data) => ({
        id: 0,
        nroLinea: data?.nroLinea,
        company: data?.combinationAccount?.Company,
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
        informacionReferencial: (data?.columnasReferenciales || []).map((refere: ReferenciaComplementaria) => ({
          nroRefCom: refere?.index,
          referenciaComprobante: refere?.nombreValue,
          referenciaComprobanteValue:  refere?.nombre,
          valor: refere?.valor,
        }))
      }));
      let permission = true;
      lineSave.forEach((element, index) => {
        if (!element.informacionReferencial?.length) {
          this.toastr.warning("Falta agregar Información Referencial en el " + (index + 1 ) + " registro.", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }
        if (element?.segTipoComprobante !== lineSaveComprobante) {
          this.toastr.warning("Los tipos de comprobante son diferentes", 'Advertencia');
          this.spinner = false;
          permission = false;
          return;
        }
        let exist = 0;
        let message = "";

        if (element?.informacionReferencial?.findIndex(p => p.referenciaComprobanteValue === 'Plazo /Periodo') === -1) {
          exist += 1;
            message = "Plazo /Periodo";
        }

        if (element.segGlAccountValue === 'Y') {
          if (element?.informacionReferencial?.findIndex(p => p.referenciaComprobanteValue === 'Número de Identificación') === -1) {
            exist += 1;
              message = "Número de Identificación";
          }
          if (element?.informacionReferencial?.findIndex(p => p.referenciaComprobanteValue === 'Auxiliar de Conciliación') === -1) {
            exist += 1;
              message = "Auxiliar de Conciliación";
          }
          if (!exist) {
            this.toastr.warning(`Falta agregar la referencia de ${message} en el ${index + 1} registro.`, 'Advertencia');
            this.spinner = false;
            permission = false;
            return;
          }
        }
      });
      if (permission) {
        const request: InserHeaderLine = {
          id: 0,
          legderName: model?.header?.LegderName,
          sourceName: model?.header?.SourceName,
          trxNumber: model?.header?.TrxNumber,
          accountingDate: model?.header?.AccountingDate,
          description: model?.header?.Description,
          usuario: this.nombreUsuario,
          linea: lineSave || undefined,
        }
        const $save = this.headerLineService
          .saveHeaderLine(request)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if(response?.status === appConstants.responseStatus.OK) {
                localStorage.removeItem(appConstants.modelSave.NEWSEAT);
                this.router.navigate(['aprobacion'] ,
                  {
                    queryParams: this.queryParams,
                    skipLocationChange: false,
                    queryParamsHandling: 'merge',
                  }
                );
                this.toastr.success(response?.message, 'Registro');
              }          
            }
          )
        this.arrayToDestroy.push($save);
      }
    }
  }
}
