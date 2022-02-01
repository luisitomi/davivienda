import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Filtro } from '../models/filtro.model';
import { ResultadoCargaFiltros } from '../models/resultado-carga-filtros.model';

let filtros: Filtro[] = [
  { id: 1, fuente: 'LINEA_IE', valores: '0099', tipo: 'I', campo: 'TIPO_TRANSACCION', },
  { id: 2, fuente: 'LINEA_IE', valores: '0136', tipo: 'I', campo: 'NUM_CONCEPTO_TRANSACCIONAL', },
  { id: 3, fuente: 'LINEA_IE', valores: '0229', tipo: 'E', campo: 'NUM_CONCEPTO_TRANSACCIONAL', },
  { id: 4, fuente: 'LINEA_IE', valores: '0258', tipo: 'I', campo: 'NUM_CONCEPTO_TRANSACCIONAL', },
  { id: 5, fuente: 'LINEA_IE', valores: '0260', tipo: 'I', campo: 'NUM_CONCEPTO_TRANSACCIONAL', },
  { id: 6, fuente: 'LINEA_IE', valores: '0225', tipo: 'E', campo: 'NUM_CONCEPTO_TRANSACCIONAL', },
];

@Injectable()
export class FiltrosServerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, params, body } = request;

    return of(null).pipe(
      mergeMap(handle),
      materialize(),
      delay(200),
      dematerialize(),
    )

    function handle() {
      switch (true) {
        case url.endsWith('/fuentes-filtro') && method === 'GET':
          return getFuentes();

        case url.endsWith('/tipos-filtro') && method === 'GET':
          return getTipos();

        case url.endsWith('/campos-filtro') && method === 'GET':
          return getCampos();

        case url.endsWith('/filtros-odi') && method === 'GET':
          return getFiltros();

        case url.includes('/filtros-odi/') && method === 'DELETE':
          return deleteFiltro();

        case url.endsWith('/filtros-odi') && method === 'POST':
          return postFiltro();

        case url.endsWith('/filtros-odi') && method === 'PUT':
          return putFiltros();

        case url.endsWith('carga-filtros-odi') && method === 'POST':
          return cargarArchivo();

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getFuentes() {
      let fuentes: string[] = ['LINEA_IE'];
      return ok(fuentes);
    }

    function getTipos() {
      let tipos: string[] = ['I', 'E'];
      return ok(tipos);
    }

    function getCampos() {
      let campos: string[] = ['TIPO_TRANSACCION', 'NUM_CONCEPTO_TRANSACCIONAL'];
      return ok(campos);
    }

    function getFiltros() {
      return ok(filtros);
    }

    function deleteFiltro() {
      const id: number = Number(url.split('/').pop());
      filtros = filtros.filter(f => f.id !== id);
      return ok({ message: 'eliminado' });
    }

    function postFiltro() {
      const filtro: Filtro = { ...(body as Filtro), id: filtros.length + 1 };
      filtros.push(filtro);
      return ok({ message: 'creado' });
    }

    function putFiltros() {
      const cambios: Filtro[] = body as Filtro[];
      const ids: number[] = cambios.map(f => f.id);
      filtros = filtros.filter(f => !ids.includes(f.id)).concat(cambios).sort((a, b) => a.id > b.id ? 1 : -1);
      return ok({ message: 'actulizados' });
    }

    function cargarArchivo() {
      console.log((body as FormData).get('archivo'));
      const resultado: ResultadoCargaFiltros = { estado: 'Éxito' };
      return ok(resultado);
    }
  }
}

export const filtroServerProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FiltrosServerInterceptor,
  multi: true,
}
