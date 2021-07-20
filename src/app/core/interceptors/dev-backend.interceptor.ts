import { Injectable } from '@angular/core';
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
import { Carga, Estados, Origen, ResultadoCarga, Reversado, Roles, Salida, Sincronizacion } from 'src/app/shared';
import * as moment from 'moment';

@Injectable()
export class DevBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, params, headers, body } = request;

    return of(null).pipe(
      mergeMap(handle),
      materialize(),
      delay(2000),
      dematerialize(),
    );

    function handle() {
      switch (true) {
        case url.endsWith('/cargas') && method === 'GET':
          return getCargas();

        case url.endsWith('/calcular-registros') && method === 'GET':
          return getCantidadRegistros();

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

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getCargas() {
      let origen = params.get('origen');
      let estado = params.get('estado');
      let despuesDe = params.get('despues-de');
      let antesDe = params.get('antes-de');
      let jobId = params.get('job-id');
      let nombreArchivo = params.get('nombre-archivo');
      let tipo = params.get('tipo');

      let cargas: Carga[] = [
        { id: 1, fechaCarga: moment().toDate(), origen: Origen.Cobis, nombreArchivo: 'prueba.XML', estado: Estados.ErrorFuncional, reversado: Reversado.Error, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 2, fechaCarga: moment().toDate(), origen: Origen.Siglease, nombreArchivo: 'prueba1.XML', estado: Estados.ErrorTecnico, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 3, fechaCarga: moment().toDate(), origen: Origen.Siglease, nombreArchivo: 'prueba2.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 4, fechaCarga: moment().toDate(), origen: Origen.Cobis, nombreArchivo: 'prueba3.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 5, fechaCarga: moment().toDate(), origen: Origen.Siglease, nombreArchivo: 'prueba4.XML', estado: Estados.Procesado, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      ];

      return ok(cargas.filter(c =>
        c.origen.includes(origen || '') &&
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

    function getUsuario() {
      return ok({ id: 235, nombre: 'Ulises Valdivieso', email: 'ulises.valdivieso@davivienda.biz', rol: Roles.AdminCarga });
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
  }

}


export const devBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DevBackendInterceptor,
  multi: true,
}
