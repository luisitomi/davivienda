import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { FiltroAsientoLimit } from '../../models/filtro-asiento.model';
import { AccountLine, AccountLineDownload, AccountLineDownloadProcess, LimitHeader, LimitHeaderDetailResumen } from '../../models/limite.model';
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
        (asiento: LimitHeaderDetailResumen[]) => {
          this.listFilter = (asiento || []).map((item) => ({
            id: /*item?.Id */ this.id,
            origen: item?.Origen,
            fechaCarga: /*this.ChangeFormateDate(item?.Carga)*/'',
            usuario: item?.Usuario,
            comprobante: item?.Comprobante,
            fechaContable: item?.Contable,
            descripcion: item?.Descripcion,
            cargos: Number(item?.Cargo),
            abonos: Number(item?.Abono),
            cuentas: /*item.Cuenta*/ '',
            nivel: /*item.NivelLimit*/0,
            estado: /*item?.Estado*/'',
            abonoTotal: /*Number(item?.AbonoTodo)*/0,
            cargoTotal: /*Number(item?.CargoTodo)*/0,
            nivelActual: /*item?.NivelActual*/'',
            aprobador: item?.Aprobador,
            enviado: item?.Enviado,
            tipoComprobante: '',
            cantidadLineas: '',
            nombrePreparadorN1: '',
            fechayHoraGrabacionPreN1: '',
            nombreAprobadorN2: '',
            fechayHoraGrabacionPreN2: '',
            nombreAprobadorN3: '',
            fechayHoraGrabacionPreN3: '',
            nombreAprobadorN4: '',
            fechayHoraGrabacionPreN4: '',
            nombreAprobadorN5: '',
            fechayHoraGrabacionPreN5: '',
            mensajeInformativo: '',
            justificacionRechazo: '',
            limitePoliticaContable: '',
            nivelLimit: 0
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
    var trxNumber = this.asiento?.comprobante + ".csv";
    LimitHeaderService.exportToCsv(trxNumber, this.dataProceesCsv);
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
            "LIBRO;ORIGEN;FECHA CONTABLE;DESCRIPCION;COMPANIA;CUENTA CONTABLE;OFICINA;SUCURSAL;PROYECTO;SUBPROYECTO;TIPO COMPROBANTE;INTERCOMPANIA;VINCULADO;FUTURO1;FUTURO2;MONEDA;DEBITO;CREDITO;DESCRIPCION LINEA;REFERENCIA COMPLEMENTARIA 1;VALOR DE REFERENCIA COMPLEMENTARIA 1;REFERENCIA COMPLEMENTARIA 2;VALOR DE REFERENCIA COMPLEMENTARIA 2;REFERENCIA COMPLEMENTARIA 3;VALOR DE REFERENCIA COMPLEMENTARIA 3;REFERENCIA COMPLEMENTARIA 4;VALOR DE REFERENCIA COMPLEMENTARIA 4;REFERENCIA COMPLEMENTARIA 5;VALOR DE REFERENCIA COMPLEMENTARIA 5;REFERENCIA COMPLEMENTARIA 6;VALOR DE REFERENCIA COMPLEMENTARIA 6;REFERENCIA COMPLEMENTARIA 7;VALOR DE REFERENCIA COMPLEMENTARIA 7;REFERENCIA COMPLEMENTARIA 8;VALOR DE REFERENCIA COMPLEMENTARIA 8;REFERENCIA COMPLEMENTARIA 9;VALOR DE REFERENCIA COMPLEMENTARIA 9;REFERENCIA COMPLEMENTARIA 10;VALOR DE REFERENCIA COMPLEMENTARIA 10;REFERENCIA COMPLEMENTARIA 11;VALOR DE REFERENCIA COMPLEMENTARIA 11;REFERENCIA COMPLEMENTARIA 12;VALOR DE REFERENCIA COMPLEMENTARIA 12;REFERENCIA COMPLEMENTARIA 13;VALOR DE REFERENCIA COMPLEMENTARIA 13;REFERENCIA COMPLEMENTARIA 14;VALOR DE REFERENCIA COMPLEMENTARIA 14;REFERENCIA COMPLEMENTARIA 15;VALOR DE REFERENCIA COMPLEMENTARIA 15;REFERENCIA COMPLEMENTARIA 16;VALOR DE REFERENCIA COMPLEMENTARIA 16;REFERENCIA COMPLEMENTARIA 17;VALOR DE REFERENCIA COMPLEMENTARIA 17;REFERENCIA COMPLEMENTARIA 18;VALOR DE REFERENCIA COMPLEMENTARIA 18;VALOR DE AUXILIAR": item?.LINEA /*.replace('"','')*/
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
