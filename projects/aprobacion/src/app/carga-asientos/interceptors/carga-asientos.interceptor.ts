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

@Injectable()
export class CargaAsientosInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, params, body } = request;

    return of(null).pipe(
      mergeMap(handle),
      materialize(),
      delay(200),
      dematerialize(),
    );

    function handle() {
      switch (true) {
        case url.endsWith('/parte1') && method === 'GET':
          return getParte1();

        case url.endsWith('/parte2') && method === 'GET':
          return getParte2();

        case url.endsWith('/parte3') && method === 'GET':
          return getParte3();

        case url.endsWith('/parte4') && method === 'GET':
          return getParte4();

        case url.endsWith('/parte5') && method === 'GET':
          return getParte5();

        case url.endsWith('/parte6') && method === 'GET':
          return getParte6();

        case url.endsWith('/parte7') && method === 'GET':
          return getParte7();

        case url.endsWith('/parte8') && method === 'GET':
          return getParte8();

        case url.endsWith('/parte9') && method === 'GET':
          return getParte9();

        case url.endsWith('/parte10') && method === 'GET':
          return getParte10();

        case url.endsWith('/parte11') && method === 'GET':
          return getParte11();

        case url.endsWith('/periodos-contables') && method === 'GET':
          return getPeriodos();

        default:
          return next.handle(request);
      }
    }

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function getParte1() {
      const parte1: string[] = ['000', '001', '002', '003', '004', '005', '006'];
      return ok(parte1);
    }

    function getParte2() {
      const parte2: string[] = ['1', '2', '3', '4', '5'];
      return ok(parte2);
    }

    function getParte3() {
      const parte3: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
      return ok(parte3);
    }

    function getParte4() {
      const parte4: string[] = ['010', '011', '012', '013'];
      return ok(parte4);
    }

    function getParte5() {
      const parte5: string[] = ['100', '101', '102', '103'];
      return ok(parte5);
    }

    function getParte6() {
      const parte6: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
      return ok(parte6);
    }

    function getParte7() {
      const parte7: string[] = ['2030', '2031', '2032', '2033', '2034'];
      return ok(parte7);
    }

    function getParte8() {
      const parte8: string[] = ['11', '12', '13', '14', '15'];
      return ok(parte8);
    }

    function getParte9() {
      const parte9: string[] = ['0012', '0013', '0014', '0015'];
      return ok(parte9);
    }

    function getParte10() {
      const parte10: string[] = ['02021', '02022', '02023', '2024'];
      return ok(parte10);
    }

    function getParte11() {
      const parte11: string[] = ['15', '16', '17', '18', '19'];
      return ok(parte11);
    }

    function getPeriodos() {
      const periodos: string[] = ['01/2020', '02/2020', '03/2020', '04/2020', '05/2020',
        '06/2020', '07/2020', '08/2020', '09/2020', '10/2020', '11/2020', '12/2020', '01/2021',
        '02/2021', '03/2021', '04/2021', '05/2021', '06/2021', '07/2021', '08/2021'];
      return ok(periodos);
    }
  }
}

export const cargaAsientosInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CargaAsientosInterceptor,
  multi: true,
}
