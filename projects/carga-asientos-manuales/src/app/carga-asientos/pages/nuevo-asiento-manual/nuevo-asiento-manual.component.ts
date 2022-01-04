import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeadboardSeat } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
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
export class NuevoAsientoManualComponent implements AfterViewChecked {
  disabledForm = false;
  validateForm = false;
  visibleForm = true;
  validateTable = false;
  visibleTable = false;
  dataHeader: HeadboardSeat;
  lineList: Array<LineaAsientoInsert>;
  queryParams: any;

  constructor(
    private cdRef:ChangeDetectorRef,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private headerLineService: HeaderLineService,
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
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
        LegderName: '',
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: this.datePipe.transform(this.dataHeader?.accountingDate, appConstants.eventDate.format) || '',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: '',
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
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      const line: Array<LineaAsientoInsert> = model?.line || [];
      const lineSave: LineSave[] = (line || []).map((data) => ({
        id: 0,
        nroLinea: data?.nroLinea,
        company: data?.combinationAccount?.Company,
        segGlAccount: data?.combinationAccount?.SegGlAccount,
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
        usuario: '',
        informacionReferencial: (data?.columnasReferenciales || []).map((refere: ReferenciaComplementaria) => ({
          nroRefCom: refere?.index,
          referenciaComprobante: refere?.nombre,
          valor: refere?.valor,
        }))
      }));
      const request: InserHeaderLine = {
        id: 0,
        legderName: model?.header?.LegderName,
        sourceName: model?.header?.SourceName,
        trxNumber: model?.header?.TrxNumber,
        accountingDate: model?.header?.AccountingDate,
        description: model?.header?.Description,
        usuario: '',
        linea: lineSave || undefined,
      }
      this.headerLineService.saveHeaderLine(request).subscribe(
        (response: any) => {
          if(response?.status === appConstants.responseStatus.OK) {
            localStorage.removeItem(appConstants.modelSave.NEWSEAT);
            this.router.navigate(['carga-asientos-manual/carga-asientos-manual'] ,
              {
                queryParams: this.queryParams,
                skipLocationChange: false,
                queryParamsHandling: 'merge',
              }
            );
            alert(response?.message);
          }          
        }
      )
    }
  }
}
