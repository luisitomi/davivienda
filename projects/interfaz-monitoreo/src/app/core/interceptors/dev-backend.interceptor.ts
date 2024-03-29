
import { ApiService } from "../services/api.service";
export const EnvironmentServiceFactory = (): any => {
  // Create env
  const env: any = new ApiService();
  const envt: any = '__env';

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow[envt] || {};
  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
          env[key] = window[envt][key];
      }
  }
  
  return env;
};

export const EnvironmentServiceProvider = {
  provide: ApiService,
  useFactory: EnvironmentServiceFactory,
  deps: [],
};
/*import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Asiento, Carga, EstadoDia, Estados, Features, Infolet, Origen, Permissions, ResultadoCarga, Reversado, Salida, Sincronizacion, Usuario } from 'src/app/shared';
import * as moment from 'moment';
import { ResultadoCierre } from 'src/app/shared/models/resultado-cierre.response';

let estados: EstadoDia[] = [
  { id: 1, fecha: moment().toDate(), estado: 'Abierto', fechaCierre: moment().toDate(), ejecutor: 'LMORAN' },
  { id: 2, fecha: moment().subtract(1, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(1, 'day').toDate(), ejecutor: 'LMORAN' },
  { id: 3, fecha: moment().subtract(2, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(2, 'day').toDate(), ejecutor: 'JGUILLEN' },
  { id: 4, fecha: moment().subtract(3, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(3, 'day').toDate(), ejecutor: 'MROSAS' },
  { id: 5, fecha: moment().subtract(4, 'day').toDate(), estado: 'Cerrado', fechaCierre: moment().subtract(4, 'day').toDate(), ejecutor: 'SCHAGUA' },
];

@Injectable()
export class DevBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, params, headers, body } = request;

    return of(null).pipe(
      mergeMap(handle),
      materialize(),
      delay(200),
      dematerialize(),
    );

    function handle() {
      switch (true) {
        case url.endsWith('/cargas') && method === 'GET':
          return getCargas();

        case url.endsWith('/calcular-registros') && method === 'GET':
          return getCantidadRegistros();

        case url.endsWith('/actualizar-registros') && method === 'POST':
          return actualizarRegistros();

        case url.endsWith('/usuario') && method === 'GET':
          return getUsuario();

        case url.endsWith('/salidas') && method === 'GET':
          return getSalidas();

        case url.endsWith('/sincronizaciones') && method === 'GET':
          return getSyncs();

        case url.endsWith('/nuevo-asiento-manual') && method === 'POST':
          return postAsiento();

        case url.endsWith('/carga-asientos-manual') && method === 'POST':
          return postArchivo();

        // case url.endsWith('/origenes') && method === 'GET':
        //   return getOrigenes();

        case url.endsWith('/estados-carga') && method === 'GET':
          return getEstadosCarga();

        case url.endsWith('/estados-dia') && method === 'GET':
          return getEstadosDia();

        case url.endsWith('/estados-dia') && method === 'POST':
          return cerrar();

        case url.endsWith('/infolets') && method === 'GET':
          return getInfolets();

        case url.endsWith('/usuarios') && method === 'GET':
          return getUsuarios();

        case url.endsWith('/cuentas') && method === 'GET':
          return getCuentas();

        case url.endsWith('/estados-asiento') && method === 'GET':
          return getEstadosAsiento();

        case url.endsWith('/asientos') && method === 'GET':
          return getAsientos();

        case url.endsWith('/asientos') && method === 'POST':
          return postAsientos();

        case url.split('/').slice(-2)[0] === 'asientos' && /^[0-9]*$/.test(url.split('/').slice(-1)[0]) && method === 'GET':
          return getAsientoPorId();

        case url.endsWith('/niveles') && method === 'GET':
          return getNiveles();

        case url.endsWith('/limites') && method === 'GET':
          return getLimites();

        case url.endsWith('/limites') && method === 'POST':
          return postLimites();

        case url.endsWith('interfaces') && method === 'GET':
          return getInterfaces();

        case url.endsWith('estados-salida') && method === 'GET':
          return getEstadosSalida();

        case url.endsWith('estados-sincronizacion') && method === 'GET':
          return getEstadosSync();

        case url.includes('/cargas/') && method === 'PUT':
          return cambiarCarga();

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getInfolets() {
      let infolets: Infolet[] = [
        {
          origenId: 1,
          origen: 'COBIS',
          estado: 'En proceso',
          archivosProcesados: 4,
          transaccionesCargadas: 13000,
          asientosAccountingHub: 12000,
          asientosGeneralAccounting: 1000,
          movimientoNetoHoy: 12000000,
          movimientoNetoAyer: 14000000,
          variacion: 12.54,
        },
        {
          archivosProcesados: 6,
          transaccionesCargadas: 50000,
          asientosAccountingHub: 50000,
          asientosGeneralAccounting: 5000,
          movimientoNetoHoy: 34546908,
          movimientoNetoAyer: 43567450,
          variacion: -21.45,
        },
      ];

      return ok(infolets);
    }

    function getCargas() {
      let origen = Number(params.get('origen'));
      let estado = params.get('estado');
      let despuesDe = params.get('despues-de');
      let antesDe = params.get('antes-de');
      let jobId = params.get('job-id');
      let nombreArchivo = params.get('nombre-archivo');
      let tipo = params.get('tipo');

      let cargas: Carga[] = [
      //  { id: 1, fechaCarga: moment().toDate(),fechaCargaStr:'', origenId: 1, origen: 'COBIS', nombreArchivo: 'prueba.XML', estado: Estados.ErrorFuncional, reversado: Reversado.Error, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      //  { id: 2, fechaCarga: moment().toDate(),fechaCargaStr:'', origenId: 2, origen: 'SIGLEASE', nombreArchivo: 'prueba1.XML', estado: Estados.ErrorTecnico, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      //  { id: 3, fechaCarga: moment().toDate(),fechaCargaStr:'', origenId: 2, origen: 'SIGLEASE', nombreArchivo: 'prueba2.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      //  { id: 4, fechaCarga: moment().toDate(),fechaCargaStr:'', origenId: 1, origen: 'COBIS', nombreArchivo: 'prueba3.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
       // { id: 5, fechaCarga: moment().toDate(),fechaCargaStr:'', origenId: 2, origen: 'SIGLEASE', nombreArchivo: 'prueba4.XML', estado: Estados.Procesado, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      ];

      return ok(cargas.filter(c =>
        (origen === 0 ? true : c.origenId === origen) &&
        c.estado.includes(estado || '') &&
        (despuesDe !== null && despuesDe !== '' && antesDe !== null && antesDe !== '' ? moment(c.fechaCarga).isBetween(moment(despuesDe), moment(antesDe), 'day', '[]') : true) &&
        (jobId !== null && jobId !== '' ? c.jobCreateAccounting === +jobId : true) &&
        c.nombreArchivo.includes(nombreArchivo || '')
      ));
    }

    function getCantidadRegistros() {
      let f = params.get('filtros');
      let filtros = f !== null ? JSON.parse(f) : null;

      switch (filtros.length) {
        case 0:
          return ok({ cantidad: 1273 });
        case 1:
          return ok({ cantidad: 402 });
        case 2:
          return ok({ cantidad: 56 });
        case 3:
          return ok({ cantidad: 1 });
        default:
          return ok({ cantidad: 0 });
      }
    }

    function actualizarRegistros() {
      return ok({ message: 'Registros actualizados' });
    }

    function getUsuario() {
      let usuario: Usuario = {
        id: 416,
        nombre: 'Angel Neyra',
        email: 'angel.neyra@davivienda.co',
        permisosACaracteristicas: [
          { feature: Features.ConsultarInfolet, permission: Permissions.View },
          { feature: Features.ConsultarEstadoCargas, permission: Permissions.View },
          { feature: Features.Reversar, permission: Permissions.Admin },
          { feature: Features.Reprocesar, permission: Permissions.Admin },
          { feature: Features.NuevoAsientoManual, permission: Permissions.Admin },
          { feature: Features.CargaAsientoManual, permission: Permissions.Admin },
          { feature: Features.MantenimientoFiltrosODI, permission: Permissions.Admin },
          { feature: Features.MantenimientoFiltrosODIMasivo, permission: Permissions.Admin },
          { feature: Features.MantenimientoCuenta, permission: Permissions.Admin },
          { feature: Features.ConsultarCuadreCaja, permission: Permissions.View },
        ],
      }
      return ok(usuario);
    }

    function getSalidas() {
      let salidas: Salida[] = [
        { id: 1, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123134_001.zip', estado: 'Leído', cantidadLineas: 200, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 2, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123133_002.zip', estado: 'Leído', cantidadLineas: 300, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 3, fecha: moment().toDate(), interfaz: 'BODEGA DE DATOS', nombreArchivo: 'BODEGADATOS_2123134_001.zip', estado: 'Leído', cantidadLineas: 250, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 4, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123134_003.zip', estado: 'Leído', cantidadLineas: 210, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 5, fecha: moment().toDate(), interfaz: 'BODEGA DE DATOS', nombreArchivo: 'BODEGADATOS_2123134_002.zip', estado: 'Leído', cantidadLineas: 340, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 6, fecha: moment().toDate(), interfaz: 'BODEGA DE DATOS', nombreArchivo: 'BODEGADATOS_2123134_003.zip', estado: 'Leído', cantidadLineas: 240, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 7, fecha: moment().toDate(), interfaz: 'BODEGA DE DATOS', nombreArchivo: 'BODEGADATOS_2123134_004.zip', estado: 'Leído', cantidadLineas: 160, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 8, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123134_004.zip', estado: 'Leído', cantidadLineas: 270, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 9, fecha: moment().toDate(), interfaz: 'BODEGA DE DATOS', nombreArchivo: 'BODEGADATOS_2123134_005.zip', estado: 'Leído', cantidadLineas: 540, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 10, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123134_005.zip', estado: 'Leído', cantidadLineas: 130, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
        { id: 11, fecha: moment().toDate(), interfaz: 'GLCAI', nombreArchivo: 'GLCAI_2123134_006.zip', estado: 'Leído', cantidadLineas: 420, fechaGeneracion: moment().toDate(), fechaLectura: moment().toDate() },
      ];

      return ok(salidas);
    }

    function getSyncs() {
      console.log(params);
      let syncs: Sincronizacion[] = [
        { id: 1, fecha: moment().toDate(), proceso: 'GLCAI', estado: 'Error de Lectura' },
        { id: 2, fecha: moment().toDate(), proceso: 'BODEGA DE DATOS', estado: 'Leído' },
        { id: 3, fecha: moment().toDate(), proceso: 'BODEGA DE DATOS', estado: 'Leído' },
        { id: 4, fecha: moment().toDate(), proceso: 'BODEGA DE DATOS', estado: 'Leído' },
        { id: 5, fecha: moment().toDate(), proceso: 'GLCAI', estado: 'Error de Lectura' },
        { id: 6, fecha: moment().toDate(), proceso: 'GLCAI', estado: 'Leído' },
      ];

      return ok(syncs);
    }

    function postAsiento() {
      console.log(body);
      return ok({ id: 546, message: 'asiento creado satisfactoriamente' });
    }

    function postArchivo() {
      console.log((body as FormData).get('archivo'));
      let response: ResultadoCarga = { estadoArchivo: 'OK', asientosCargados: 1000, asientosRechazados: 100, asientosAprobados: 400, asientosPendientes: 500, log: '23432533_23423.log' };
      return ok(response);
    }

    function getOrigenes() {
      let origenes: Origen[] = [
        // { id: 1, nombre: 'COBIS' },
        // { id: 2, nombre: 'SIGLEASE' },
      ];

      return ok(origenes);
    }

    function getEstadosCarga() {
      let estados = ['Procesado', 'Error Técnico', 'Error Funcional'];

      return ok(estados);
    }

    function getEstadosDia() {
      let inicio = moment(params.get('inicio'));
      let fin = moment(params.get('fin'));

      return ok(estados.filter(e => moment(e.fecha).isBetween(inicio, fin, 'day', '[]')));
    }

    function cerrar() {
      let id = (body as any).id;
      estados = estados.map(e => e.id === id ? { ...e, estado: 'Cerrado' } : e);
      let res: ResultadoCierre = {};
      return ok(res);
    }

    function getUsuarios() {
      let users: string[] = ['SLUJAN', 'AMURILLO', 'JGINEZ', 'ZRIVERA'];

      return ok(users);
    }

    function getCuentas() {
      let cuentas: string[] = ['WER1234-12', 'ETER-0878-34', 'TREW-345-123-45'];

      return ok(cuentas);
    }

    function getEstadosAsiento() {
      let estados: string[] = ['Pendiente de aprobación'];

      return ok(estados);
    }

    function getAsientos() {
      let asientos: Asiento[] = [
        { id: 1, origen: 'COBIS', fechaCarga: moment().subtract(5, 'day').toDate(), usuario: 'SLUJAN', comprobante: 'FMG093453234', fechaContable: moment().subtract(3, 'day').toDate(), descripcion: 'Asientos de compe.', cargos: 1300, abonos: 3400, },
        { id: 2, origen: 'COBIS', fechaCarga: moment().subtract(5, 'day').toDate(), usuario: 'SLUJAN', comprobante: 'FMG3436543564', fechaContable: moment().subtract(3, 'day').toDate(), descripcion: 'Asientos de compe.', cargos: 200, abonos: 300, },
        { id: 3, origen: 'SIGLEASE', fechaCarga: moment().subtract(4, 'day').toDate(), usuario: 'AMURILLO', comprobante: 'FMG043456575', fechaContable: moment().subtract(2, 'day').toDate(), descripcion: 'Asientos de ajuste', cargos: 1100, abonos: 400, },
        { id: 4, origen: 'SIGLEASE', fechaCarga: moment().subtract(4, 'day').toDate(), usuario: 'JGINEZ', comprobante: 'FMG09343478456', fechaContable: moment().subtract(2, 'day').toDate(), descripcion: 'Asientos de ajuste', cargos: 1600, abonos: 900, },
        { id: 5, origen: 'COBIS', fechaCarga: moment().subtract(2, 'day').toDate(), usuario: 'JGINEZ', comprobante: 'FMG0934578645', fechaContable: moment().subtract(1, 'day').toDate(), descripcion: 'Asientos genericos', cargos: 2300, abonos: 1780, },
      ];

      return ok(asientos);
    }

    function postAsientos() {
      let res = { message: 'Asientos modificados con exito' };

      return ok(res);
    }

    function getAsientoPorId() {
      let asiento: Asiento = {
        id: Number(url.split('/').slice(-1)[0]),
        usuario: 'JLUJAN',
        origen: 'COBIS',
        comprobante: 'FMG2354564',
        fechaCarga: moment().toDate(),
        fechaContable: moment().toDate(),
        descripcion: 'Asiento regular',
        cargos: 5460,
        abonos: 10090,
        cuentas: [
          { primerDigito: 1, VALUE_NAME: '10100', DESCRIPTION_NAME: 'Primera cuenta', moneda: 'COP', debito: 10600, credito: 45640, neto: 9080 },
          { primerDigito: 2, VALUE_NAME: '20100', DESCRIPTION_NAME: 'Segunda cuenta', moneda: 'COP', debito: 6700, credito: 4650, neto: 4536 },
          { primerDigito: 3, VALUE_NAME: '30100', DESCRIPTION_NAME: 'Tercera cuenta', moneda: 'COP', debito: 54090, credito: 1290, neto: 98070 },
          { primerDigito: 6, VALUE_NAME: '60100', DESCRIPTION_NAME: 'Cuarta cuenta', moneda: 'USD', debito: 4730, credito: 560, neto: 1250 },
          { primerDigito: 8, VALUE_NAME: '80100', DESCRIPTION_NAME: 'Quinta cuenta', moneda: 'COP', debito: 12000, credito: 3240, neto: 6570 },
        ],
      };

      return ok(asiento);
    }

    function getInterfaces() {
      let interfaces: string[] = ['GLCAI', 'BODEGA DE DATOS'];

      return ok(interfaces);
    }

    function getEstadosSalida() {
      let estados: string[] = ['Error de Generación', 'Error de Lectura', 'Generado', 'Leído'];

      return ok(estados);
    }

    function getNiveles() {
      let niveles: string[] = ['Automático'].concat(Array.from({ length: 10 }, (x, i) => (i + 1).toString()));

      return ok(niveles);
    }

    function getLimites() {
      let limites: any[] = [
        { empiezaCon: '1', importeMaximo: 10000, codigo: 'COP' },
        { empiezaCon: '2', importeMaximo: 1000000, codigo: 'COP' },
        { empiezaCon: '1010', importeMaximo: 250000, codigo: 'USD' },
        { empiezaCon: '3', importeMaximo: 30000, codigo: 'USD' },
        { empiezaCon: '1100', importeMaximo: 1500000, codigo: 'COP' },
        { empiezaCon: '1110', importeMaximo: 1000000, codigo: 'COP' },
      ];

      return ok(limites);
    }

    function postLimites() {
      return ok('ok');
    }

    function getEstadosSync() {
      let estados: string[] = ['Error de Lectura', 'Leído'];

      return ok(estados);
    }

    function cambiarCarga() {
      return ok('hecho');
    }

  }

}


export const devBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DevBackendInterceptor,
  multi: true,
}
*/