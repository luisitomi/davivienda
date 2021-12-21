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
import { Interfaz } from '../models/interfaz.model';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Lista } from '../models/lista.model';
import { Valor } from '../models/valor.model';
import { SlicePipe } from '@angular/common';
import { ReceptorNotificacion } from '../models/receptor-notificacion.model';

let interfaces: Interfaz[] = [
  { id: 1, nombre: 'NOMBRE_TECNICO_1', descripcion: 'Descripcion Interfaz 1', estado: 'Activo', periodicidad: 'Diario' },
  { id: 2, nombre: 'NOMBRE_TECNICO_2', descripcion: 'Descripcion Interfaz 2', estado: 'Activo', periodicidad: 'Semanal' },
  { id: 3, nombre: 'NOMBRE_TECNICO_3', descripcion: 'Descripcion Interfaz 3', estado: 'Inactivo', periodicidad: 'Quincenal' },
  { id: 4, nombre: 'NOMBRE_TECNICO_4', descripcion: 'Descripcion Interfaz 4', estado: 'Activo', periodicidad: 'Mensual' },
  { id: 5, nombre: 'NOMBRE_TECNICO_5', descripcion: 'Descripcion Interfaz 5', estado: 'Activo', periodicidad: 'Bimestral' },
  { id: 6, nombre: 'NOMBRE_TECNICO_6', descripcion: 'Descripcion Interfaz 6', estado: 'Inactivo', periodicidad: 'Trimestral' },
  { id: 7, nombre: 'NOMBRE_TECNICO_7', descripcion: 'Descripcion Interfaz 7', estado: 'Activo', periodicidad: 'Cuatrimestral' },
  { id: 8, nombre: 'NOMBRE_TECNICO_8', descripcion: 'Descripcion Interfaz 8', estado: 'Activo', periodicidad: 'Semestral' },
  { id: 9, nombre: 'NOMBRE_TECNICO_9', descripcion: 'Descripcion Interfaz 9', estado: 'Inactivo', periodicidad: 'Anual' },
];

let listas: Valor[][] = [
  [
    { id: 1, nombre: 'Diario' },
    { id: 2, nombre: 'Semanal' },
    { id: 3, nombre: 'Quincenal' },
    { id: 4, nombre: 'Mensual' },
    { id: 5, nombre: 'Bimestral' },
    { id: 6, nombre: 'Trimestral' },
    { id: 7, nombre: 'Cuatrimestral' },
    { id: 8, nombre: 'Semestral' },
    { id: 9, nombre: 'Anual' },
  ],
  [
    { id: 20, nombre: 'Activo' },
    { id: 21, nombre: 'Inactivo' },
  ],
];

let receptores: ReceptorNotificacion[] = [
  { id: 1, email: 'test@example.com' },
  { id: 2, email: 'test1@example.com' },
  { id: 3, email: 'test2@example.com' },
  { id: 4, email: 'test3@example.com' },
  { id: 5, email: 'test4@example.com' },
  { id: 6, email: 'test5@example.com' },
  { id: 7, email: 'test6@example.com' },
  { id: 8, email: 'test7@example.com' },
];

@Injectable()
export class InterfacesFahInterceptor implements HttpInterceptor {

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
        case url.endsWith('/interfaces-fah') && method === 'GET':
          return getInterfaces();

        case url.endsWith('/estados-interfaz') && method === 'GET':
          return getEstados();

        case url.endsWith('/tiempos-interfaz') && method === 'GET':
          return getTiempos();

        case url.endsWith('/interfaces-fah') && method === 'PUT':
          return putInterfaces();

        case url.endsWith('/interfaces-fah') && method === 'POST':
          return postInterfaz();

        case url.includes('/interfaces-fah') && method === 'DELETE':
          return deleteInterfaz();

        case url.endsWith('/listas') && method === 'GET':
          return getListas();

        case url.includes('/listas/') && method === 'GET':
          return getLista();

        case url.endsWith('/valores') && method === 'POST':
          return postValor();

        case url.includes('/valores/') && method === 'DELETE':
          return deleteValor();

        case url.split('/').slice(-2)[0] === 'listas' && method === 'POST':
          return postLista();

        case url.endsWith('/receptores') && method === 'GET':
          return getReceptores();

        case url.includes('/receptores/') && method === 'DELETE':
          return deleteReceptor();

        case url.endsWith('/receptores') && method === 'DELETE':
          return deleteReceptores();

        case url.endsWith('/receptores') && method === 'POST':
          return crearReceptor();

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getInterfaces() {
      return ok(interfaces);
    }

    function getEstados() {
      let estados: string[] = ['Activo', 'Inactivo'];
      return ok(estados);
    }

    function getTiempos() {
      let tiempos: string[] = ['Diario', 'Semanal', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral', 'Semestral', 'Anual'];
      return ok(tiempos);
    }

    function putInterfaces() {
      let news: Interfaz[] = body as Interfaz[];
      let ids: number[] = news.map(n => n.id);
      interfaces = interfaces.filter(i => !ids.includes(i.id)).concat(news).sort((a, b) => a.id > b.id ? 1 : -1);

      return ok({ message: 'ok' });
    }

    function postInterfaz() {
      let nuevo: Interfaz = { ...(body as Interfaz), id: interfaces.length };
      interfaces.push(nuevo);
      return ok({ message: 'ok' });
    }

    function deleteInterfaz() {
      let id: number = Number(url.split('/').pop());
      interfaces = interfaces.filter(i => i.id !== id);

      return ok({ message: 'eliminado' });
    }

    function getListas() {
      let listas: Lista[] = [
        { id: 1, nombre: 'Periodicidad de carga' },
        { id: 2, nombre: 'Estados' }
      ];
      return ok(listas);
    }

    function getLista() {
      let id: number = Number(url.split('/').pop());

      return ok(listas[id - 1]);
    }

    function postValor(){
      let listaId: number = Number(url.split('/').slice(-2)[0]);
      let valor: Valor = body as Valor;
      listas[listaId - 1].push({ ...valor, id: listas[listaId - 1].length + 1 });
      return ok({ message: 'ok' });
    }

    function deleteValor() {
      let listaId: number = Number(url.split('/').slice(-3)[0]);
      let valorId: number = Number(url.split('/').pop());
      listas[listaId - 1] = listas[listaId - 1].filter(v => v.id !== valorId);
      return ok({ message: 'ok' });
    }

    function postLista() {
      let listaId: number = Number(url.split('/').pop());
      let valores: Valor[] = body as Valor[];
      let news: number[] = valores.map(v => v.id);

      listas[listaId - 1] = listas[listaId - 1].filter(v => !news.includes(v.id)).concat(valores).sort((a, b) => a.id > b.id ? 1 : -1);
      return ok({ message: 'ok' });
    }

    function getReceptores() {
      const email: string = params.get('email') || '';
      return ok(receptores.filter(r => r.email.includes(email)));
    }

    function deleteReceptor() {
      const id: number = Number(url.split('/').pop());
      receptores = receptores.filter(r => r.id !== id);
      return ok({ message: 'Correo de notificación eliminado'});
    }

    function deleteReceptores() {
      const ids: number[] = body as number[];
      receptores = receptores.filter(r => !ids.includes(r.id!!));
      return ok({ message: 'Correos de notificación eliminados'});
    }

    function crearReceptor() {
      const receptor: ReceptorNotificacion = { ...(body as ReceptorNotificacion), id: receptores[-1]?.id || 0 + 1 };
      receptores.push(receptor);
      console.log(receptores);
      return ok({ message: 'Correo de notificación agregado' });
    }

  }

}

export const interfacesBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterfacesFahInterceptor,
  multi: true,
};
