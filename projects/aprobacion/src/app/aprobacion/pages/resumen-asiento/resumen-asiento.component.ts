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
  autorizacion: string;
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
        this.nombreUsuario = nombre || ''
      }
    );
    this.authService.getToken().subscribe(
      (token) => {
        this.autorizacion = 'Bearer ' + token;
      }
    );
    this.getByRolUser();
  }

  getListData(filtros: any) {
    filtros.Id = this.id;
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
            nivelActual: item?.NivelActual,
            aprobador: item?.Aprobador,
            enviado: item?.Enviado
          }))
          this.asiento = this.listFilter.length ? this.listFilter[0] : undefined
        }
      );
    this.arrayToDestroy.push($subas);
  }

  ChangeFormateDate(oldDate: any): string {
    /*if (oldDate.split('-').length === 1) {
      return oldDate.toString().split("/").reverse().join("/").replace('/', '-').replace('/', '-');
    }*/
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
          this.preparador = Boolean(response?.find((p: any) => p.nombre_comun_rol.toUpperCase() === 'DAV_FAH_ROL_PREPARADOR'));
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
      Jwt: this.autorizacion
    }
   // console.log(request)
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
          Message: result?.description,
          Jwt: this.autorizacion
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


  download(): void {
    this.spinner = true;
    const $download = this.lineHeaderService
      .download(this.id || 0)
      .pipe(finalize(() => this.proccess()))
      .subscribe(
        (response: AccountLineDownload[]) => {
          const dataprocess = (response || []).map((item) => ({
            "LIBRO": item?.JH_LEDGER_NAME,
            "ORIGEN": item?.JH_JE_SOURCE_NAME,
            "FECHA CONTABLE": item?.JH_ACCOUNTING_DATE,
            "DESCRIPCION": item?.JH_DESCRIPTION,
            "COMPANIA": item?.JL_SEG_COMPANY,
            "CUENTA CONTABLE": item?.JL_SEG_GL_ACCOUNT,
            "OFICINA": item?.JL_SEG_OFICINA,
            "SUCURSAL": item?.JL_SEG_SUCURSAL,
            "PROYECTO": item?.JL_SEG_PROYECTO,
            "SUBPROYECTO": item?.JL_SEG_SUBPROYECTO,
            "TIPO COMPROBANTE": item?.JL_SEG_TIPO_COMPROBANTE,
            "INTERCOMPANIA": item?.JL_SEG_INTERCOMPANY,
            "VINCULADO": item?.JL_SEG_VINCULADO,
            "FUTURO1": item?.JL_SEG_F1,
            "FUTURO2": item?.JL_SEG_F2,
            "MONEDA": item?.JL_CURRENCY,
            "DEBITO": item?.JL_ENTERED_DEBIT,
            "CREDITO": item?.JL_ENTERED_CREDIT,
            "DESCRIPCION LINEA": item?.JL_DESCRIPTION,
            "REFERENCIA COMPLEMENTARIA 1": item?.JL_REF1 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 1": item?.JL_REF1_VAL || '',
            
            "REFERENCIA COMPLEMENTARIA 2": item?.JL_REF2 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 2": item?.JL_REF2_VAL || '',

            "REFERENCIA COMPLEMENTARIA 3": item?.JL_REF3 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 3": item?.JL_REF3_VAL || '',

            "REFERENCIA COMPLEMENTARIA 4": item?.JL_REF4 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 4": item?.JL_REF4_VAL || '',

            "REFERENCIA COMPLEMENTARIA 5": item?.JL_REF5 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 5": item?.JL_REF5_VAL || '',

            "REFERENCIA COMPLEMENTARIA 6": item?.JL_REF6 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 6": item?.JL_REF6_VAL || '',

            "REFERENCIA COMPLEMENTARIA 7": item?.JL_REF7 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 7": item?.JL_REF7_VAL || '',

            "REFERENCIA COMPLEMENTARIA 8": item?.JL_REF8 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 8": item?.JL_REF8_VAL || '',

            "REFERENCIA COMPLEMENTARIA 9": item?.JL_REF9 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 9": item?.JL_REF9_VAL || '',

            "REFERENCIA COMPLEMENTARIA 10": item?.JL_REF10 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 10": item?.JL_REF10_VAL || '',

            "REFERENCIA COMPLEMENTARIA 11": item?.JL_REF11 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 11": item?.JL_REF11_VAL || '',

            "REFERENCIA COMPLEMENTARIA 12": item?.JL_REF12 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 12": item?.JL_REF12_VAL || '',

            "REFERENCIA COMPLEMENTARIA 13": item?.JL_REF13 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 13": item?.JL_REF13_VAL || '',

            "REFERENCIA COMPLEMENTARIA 14": item?.JL_REF14 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 14": item?.JL_REF14_VAL || '',

            "REFERENCIA COMPLEMENTARIA 15": item?.JL_REF15 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 15": item?.JL_REF15_VAL || '',

            "REFERENCIA COMPLEMENTARIA 16": item?.JL_REF16 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 16": item?.JL_REF16_VAL || '',

            "REFERENCIA COMPLEMENTARIA 17": item?.JL_REF17 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 17": item?.JL_REF17_VAL || '',

            "REFERENCIA COMPLEMENTARIA 18": item?.JL_REF18 || '',
            "VALOR DE REFERENCIA COMPLEMENTARIA 18": item?.JL_REF18_VAL || '',
          }))
          this.dataProceesCsv = this.dataProceesCsv.concat(dataprocess)
        }
      );
    this.arrayToDestroy.push($download);
  }
  enviarAsiento() {
    const request = {
      Usuario: this.nombreUsuario,
      Id: this.id || 0,
      Jwt: this.autorizacion
    }
   // console.log(request)
    this.spinner = true;
    const $subas = this.lineHeaderService
      .postTsAprobacionUsuarioPreparadorWS(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          if (response?.status === appConstants.responseStatus.OK) {
            this.toastr.success(response?.message, 'Enviado');
            this.volver();
          }
        }
      );
    this.arrayToDestroy.push($subas);
  }
}
