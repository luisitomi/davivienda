import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MessageErrorInterceptor implements HttpInterceptor {
  constructor(
    public _router: Router,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse && event.ok) {
            if (event.body.message !== 'OK') {
            }
          }
        },
        (error: HttpErrorResponse) => {
          alert(error?.error?.error?.message);
        }
      )
    );
  }
}
