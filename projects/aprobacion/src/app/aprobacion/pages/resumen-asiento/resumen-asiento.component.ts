import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsientoLimit } from '../../models/filtro-asiento.model';
import { AccountLine, AccountLineDownload, AccountLineDownloadProcess, LimitHeader } from '../../models/limite.model';
import { LimitHeaderService } from '../../services/limitHeader.service';
import { LimitService } from '../../services/limit.service';
import { Asiento } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { ReboteInformationComponent } from '../../components/rebote-information/rebote-information.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-resumen-asiento',
  templateUrl: './resumen-asiento.component.html',
  styleUrls: ['./resumen-asiento.component.scss']
})
export class ResumenAsientoComponent extends UnsubcribeOnDestroy implements OnInit {
  id: number = 0;
  cuentaid: string;
  asiento?: Asiento;
  spinner: boolean;
  queryParams: any;
  idNumber = 0;
  cuenta: string;
  listFilter: Asiento[];
  accountInfo: AccountLine[] = [];
  filtrosData: any = {
    cuenta: '',
    aprobador: 0,
    aprobadorName: '',
    id: 0,
  };
  nombreUsuario: string;
  eventSuccess = false;
  eventNumber = 11;
  aprobador = false;
  preparador = false;
  trabajo = false;
  dataProceesCsv: Array<AccountLineDownloadProcess> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lineHeaderService: LimitHeaderService,
    private limitService: LimitService,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {
    super();
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
    const btn: any = document.getElementById('export');
    btn?.addEventListener('click', () => {
      this.download();
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cuentaid = this.route.snapshot.paramMap.get('cuenta') || '';
  }

  ngOnInit(): void {
    this.authService.getUsuarioV2().subscribe(
      (nombre) => {
        this.nombreUsuario = 'empleado2' || ''
      }
    );
    this.getByRolUser();
  }

  getListData(filtros: any) {
    filtros.aprobador = Number(this.aprobador);
    filtros.aprobadorName = this.nombreUsuario;
    filtros.cuenta = this.cuentaid;
    filtros.id = this.id;
    this.spinner = true;
    const $subas = this.lineHeaderService
      .consultAsient(filtros)
      .pipe(finalize(() => this.getListAaccount()))
      .subscribe(
        (asiento: LimitHeader[]) => {
          this.listFilter = (asiento || []).map((item) => ({
            id: item?.Id,
            origen: item?.Origen,
            fechaCarga: this.ChangeFormateDate(item?.Carga),
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: item.Cuenta,
            nivel: item.NivelLimit,
            estado: item?.Estado,
            abonoTotal: Number(item?.AbonoTodo),
            cargoTotal: Number(item?.CargoTodo),
          }))
          this.asiento = this.listFilter.length ? this.listFilter[0] : undefined
        }
      );
    this.arrayToDestroy.push($subas);
  }

  ChangeFormateDate(oldDate: any): string {
    if (oldDate.split('-').length === 1) {
      return oldDate.toString().split("/").reverse().join("/").replace('/', '-').replace('/', '-');
    }
    return oldDate;
  }

  getListAaccount(): void {
    this.spinner = true;
    const $subas = this.limitService
      .getAccountLine(this.id, this.cuentaid, this.eventNumber)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (asiento: AccountLine[]) => {
          this.accountInfo = asiento;
        }
      );
    this.arrayToDestroy.push($subas);
  }

  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.limitService
      .getByIdRol(this.nombreUsuario)
      .pipe(finalize(() => this.getListData(this.filtrosData)))
      .subscribe(
        (response: any) => {
          this.aprobador = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR'));
          this.preparador = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_PREPARADOR'));
          this.trabajo = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_TRABAJO'));
        }
      )
    this.arrayToDestroy.push($rol);
  }

  aprobar(): void {
    const request: FiltroAsientoLimit = {
      Usuario: this.nombreUsuario,
      Status: 1,
      Id: this.id || 0,
      Message: '',
    }
    console.log(request)
    this.spinner = true;
    const $subas = this.lineHeaderService
      .saveStatusAsient(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          if (response?.status === appConstants.responseStatus.OK) {
            this.toastr.success(response?.message, 'Aprobado');
            this.volver();
          }
        }
      );
    this.arrayToDestroy.push($subas);
  }

  rechazar(): void {
    const dialogRef = this.dialog.open(ReboteInformationComponent, {
      width: '80%',
      maxWidth: '400px',
      data: null,
      panelClass: 'my-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.description) {
        const request: FiltroAsientoLimit = {
          Usuario: this.nombreUsuario,
          Status: 2,
          Id: this.id || 0,
          Message: '',
        }
        this.spinner = true;
        const $subas = this.lineHeaderService
          .saveStatusAsient(request)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if (response?.status === appConstants.responseStatus.OK) {
                this.toastr.success(response?.message, 'Rechazado');
                this.volver();
              }
            }
          );
        this.arrayToDestroy.push($subas);
      }
    })

  }

  volver(): void {
    this.router.navigate(['/aprobacion/asientos-pendientes'],
      {
        queryParams: this.queryParams,
        skipLocationChange: false,
        queryParamsHandling: 'merge',
      })
  }

  event(): void {
    this.eventSuccess = !this.eventSuccess;
    this.eventNumber = this.eventSuccess ? 7 : 11;
    this.getListAaccount();
  }

  proccess(): void {
    LimitHeaderService.exportToCsv('test.csv', this.dataProceesCsv);
    this.spinner = false
  }

  download(): void {
    this.spinner = true;
    const $download = this.lineHeaderService
      .download(this.id || 0)
      .pipe(finalize(() => this.proccess()))
      .subscribe(
        (response: AccountLineDownload[]) => {
          const dataprocess = (response || []).map((item) => ({
            JH_LEDGER_NAME: item?.JH_LEDGER_NAME,
            JH_JE_SOURCE_NAME: item?.JH_JE_SOURCE_NAME,
            JH_ACCOUNTING_DATE: item?.JH_ACCOUNTING_DATE,
            JH_DESCRIPTION: item?.JH_DESCRIPTION,
            JL_SEG_COMPANY: item?.JL_SEG_COMPANY,
            JL_SEG_GL_ACCOUNT: item?.JL_SEG_GL_ACCOUNT,
            JL_SEG_OFICINA: item?.JL_SEG_OFICINA,
            JL_SEG_SUCURSAL: item?.JL_SEG_SUCURSAL,
            JL_SEG_PROYECTO: item?.JL_SEG_PROYECTO,
            JL_SEG_SUBPROYECTO: item?.JL_SEG_SUBPROYECTO,
            JL_SEG_TIPO_COMPROBANTE: item?.JL_SEG_TIPO_COMPROBANTE,
            JL_SEG_INTERCOMPANY: item?.JL_SEG_INTERCOMPANY,
            JL_SEG_VINCULADO: item?.JL_SEG_VINCULADO,
            JL_SEG_F1: item?.JL_SEG_F1,
            JL_SEG_F2: item?.JL_SEG_F2,
            JL_CURRENCY: item?.JL_CURRENCY,
            JL_ENTERED_DEBIT: item?.JL_ENTERED_DEBIT,
            JL_ENTERED_CREDIT: item?.JL_ENTERED_CREDIT,
            JL_DESCRIPTION: item?.JL_DESCRIPTION,
            JL_REF1: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[0]?.JL_REFERENCIA_COM || '',
            JL_REF1_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[0]?.VALOR || '',
            JL_REF2: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[1]?.JL_REFERENCIA_COM || '',
            JL_REF2_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[1]?.VALOR || '',
            JL_REF3: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[2]?.JL_REFERENCIA_COM || '',
            JL_REF3_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[2]?.VALOR || '',
            JL_REF4: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[3]?.JL_REFERENCIA_COM || '',
            JL_REF4_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[3]?.VALOR || '',
            JL_REF5: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[4]?.JL_REFERENCIA_COM || '',
            JL_REF5_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[4]?.VALOR || '',
            JL_REF6: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[5]?.JL_REFERENCIA_COM || '',
            JL_REF6_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[5]?.VALOR || '',
            JL_REF7: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[6]?.JL_REFERENCIA_COM || '',
            JL_REF7_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[6]?.VALOR || '',
            JL_REF8: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[7]?.JL_REFERENCIA_COM || '',
            JL_REF8_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[7]?.VALOR || '',
            JL_REF9: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[8]?.JL_REFERENCIA_COM || '',
            JL_REF9_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[8]?.VALOR || '',
            JL_REF10: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[9]?.JL_REFERENCIA_COM || '',
            JL_REF10_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[9]?.VALOR || '',
            JL_REF11: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[10]?.JL_REFERENCIA_COM || '',
            JL_REF11_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[10]?.VALOR || '',
            JL_REF12: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[11]?.JL_REFERENCIA_COM || '',
            JL_REF12_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[11]?.VALOR || '',
            JL_REF13: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[12]?.JL_REFERENCIA_COM || '',
            JL_REF13_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[12]?.VALOR || '',
            JL_REF14: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[13]?.JL_REFERENCIA_COM || '',
            JL_REF14_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[13]?.VALOR || '',
            JL_REF15: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[14]?.JL_REFERENCIA_COM || '',
            JL_REF15_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[14]?.VALOR || '',
            JL_REF16: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[15]?.JL_REFERENCIA_COM || '',
            JL_REF16_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[15]?.VALOR || '',
            JL_REF17: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[16]?.JL_REFERENCIA_COM || '',
            JL_REF17_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[16]?.VALOR || '',
            JL_REF18: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[17]?.JL_REFERENCIA_COM || '',
            JL_REF18_VAL: response.filter(p => p.NRO_LINEA === item.NRO_LINEA && p.NRO_REF_COM === item.NRO_REF_COM && p.JH_LEDGER_NAME === item.JH_LEDGER_NAME)[17]?.VALOR || '',
          }))
          this.dataProceesCsv = this.dataProceesCsv.concat(dataprocess)
        }
      );
    this.arrayToDestroy.push($download);
  }
}
