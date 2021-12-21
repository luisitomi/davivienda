import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Oficina, Sucursal } from 'src/app/shared';
import { RegistroCuadre } from '../models/registro-cuadre.model';
import * as moment from 'moment';
import { CuentaContable } from 'src/app/shared/models/cuenta-contable.model';

let defaultCuenta = 'cuenta1';

@Injectable()
export class CuadreServerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, params, body } = request;

    return of(null).pipe(
      mergeMap(handle),
      materialize(),
      delay(200),
      dematerialize(),
    );

    function handle() {
      switch (true) {
        case url.endsWith('/sucursales') && method === 'GET':
          return getSucursales();

        case url.endsWith('/cuenta-contables') && method === 'GET':
          return getCuentasContables();

        case url.endsWith('/oficinas') && method === 'GET':
          return getOficinas();

        case url.endsWith('/cuentas-cuadre') && method === 'GET':
          return getCuentas();

        case url.endsWith('/formatos') && method === 'GET':
          return getFormatos();

        case url.endsWith('/registros-cuadre') && method === 'GET':
          return getRegistros();

        case url.endsWith('/cuentapordefault') && method === 'GET':
          return getDefaultCuenta();

        case url.endsWith('/cuentapordefault') && method === 'POST':
          return setDefaultCuenta();

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getSucursales() {
      const sucursales: Sucursal[] = [
        // { id: 1, nombre: 'Lima' },
        // { id: 2, nombre: 'Bogota' },
        // { id: 3, nombre: 'Cartagena' },
      ];
      return ok(sucursales);
    }

    function getOficinas() {
      const oficinas: Oficina[] = [
        // 'Administración', 'Contabilidad', 'RR.HH.', 'Finanzas'
      ];
      return ok(oficinas);
    }

    function getCuentas() {
      const texto = params.get('texto');
      const cuentas: string[] = [
        // 'cuenta1', 'cuenta2', 'cuenta3', 'cuenta4', 'cuenta5', 'cu001temp', 'cu002temp', 'cu003temp', 'cu004temp'
      ];
      return ok(cuentas.filter(c => (texto === null || texto === '') ? true : c.toLowerCase().includes(texto!!)));
    }

    function getCuentasContables() {
      const CuentaContables: CuentaContable[] = [
        // { id: 1, nombre: 'Lima' },
        // { id: 2, nombre: 'Bogota' },
        // { id: 3, nombre: 'Cartagena' },
      ];
      return ok(CuentaContables);
    }

    function getFormatos() {
      const formatos: string[] = ['Excel', 'CSV'];
      return ok(formatos);
    }

    function getRegistros() {
      const registros: RegistroCuadre[] = [
        { id: 1, fecha: moment().toDate(), sucursal: 0, oficina: 0, saldoIDONormal: 1000, saldoIDOAdicional: 1000, saldoFAH: 2000, diferencia: 0 },
        { id: 2, fecha: moment().toDate(), sucursal: 0, oficina: 0, saldoIDONormal: 1000, saldoIDOAdicional: 0, saldoFAH: 2000, diferencia: -1000 },
        { id: 3, fecha: moment().toDate(), sucursal: 0, oficina: 0, saldoIDONormal: 2000, saldoIDOAdicional: 1000, saldoFAH: 2000, diferencia: 1000 },
        { id: 4, fecha: moment().toDate(), sucursal: 1, oficina: 1, saldoIDONormal: 2500, saldoIDOAdicional: 200, saldoFAH: 3000, diferencia: -300 },
      ];
      return ok(registros);
    }

    function getDefaultCuenta() {
      return ok(defaultCuenta);
    }

    function setDefaultCuenta() {
      defaultCuenta = (body as any).cuenta;
      return ok({ message: 'Cuenta por defecto actualizada '});
    }

  }
}

export const CuadreServerProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CuadreServerInterceptor,
  multi: true,
}
