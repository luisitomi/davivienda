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
import { Carga, Estados, Origen, Reversado } from 'src/app/shared';

@Injectable()
export class DevBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body } = request;

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

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getCargas() {
      let cargas: Carga[] = [
        { id: 1, fechaCarga: new Date(), origen: Origen.Cobis, nombreArchivo: 'prueba.XML', estado: Estados.ErrorFuncional, reversado: Reversado.Error, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 2, fechaCarga: new Date(), origen: Origen.Siglease, nombreArchivo: 'prueba1.XML', estado: Estados.ErrorTecnico, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 3, fechaCarga: new Date(), origen: Origen.Siglease, nombreArchivo: 'prueba2.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 4, fechaCarga: new Date(), origen: Origen.Cobis, nombreArchivo: 'prueba3.XML', estado: Estados.Procesado, reversado: Reversado.No, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
        { id: 5, fechaCarga: new Date(), origen: Origen.Siglease, nombreArchivo: 'prueba4.XML', estado: Estados.Procesado, reversado: Reversado.Si, jobImportAccounting: 876549, jobCreateAccounting: 254879, cantidadH: 100, cantidadL: 200, ultimoProceso: 145763, debitoStage: 50000, creditoStage: 50000, debitoXLA: 50000, creditoXLA: 50000, debitoGL: 50000, creditoGL: 50000, },
      ]

      return ok(cargas);
    }
  }

}


export const devBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: DevBackendInterceptor,
  multi: true,
}
