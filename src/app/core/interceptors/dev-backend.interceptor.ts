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
import { Carga, Estados, Origen, Reversado, Roles } from 'src/app/shared';
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
      let fecha = params.get('fecha');
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
        fecha !== null && fecha !== '' ? moment(c.fechaCarga).isSame(moment(fecha), 'day') : true &&
        jobId !== null && jobId !== '' ? c.jobCreateAccounting === +jobId : 1 === 1 &&
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
  }

}


export const devBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DevBackendInterceptor,
  multi: true,
}
