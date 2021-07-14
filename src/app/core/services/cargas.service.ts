import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carga } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class CargasService {

  url: string = 'http://rutadelservicio.com/api/v1.0/cargas';

  constructor(
    private http: HttpClient,
  ) { }

  getCargas(
    origen: string = '',
    fechaCarga: Date | null = null,
    jobId: string = '',
    estado: string = '',
    nombreArchivo: string = '',
    tipoCarga: string = '',
  ): Observable<Carga[]> {
    return this.http.get<Carga[]>(this.url).pipe(
      map(cargas => cargas.filter(c =>
        c.origen.includes(origen) &&
        c.estado.includes(estado) &&
        c.nombreArchivo.includes(nombreArchivo)
      )),
    );
  }

  getCargaById(id: number): Observable<Carga | undefined> {
    return this.http.get<Carga[]>(this.url).pipe(
      map(cargas => cargas.find(carga => carga.id === id)),
    );
  }

}
