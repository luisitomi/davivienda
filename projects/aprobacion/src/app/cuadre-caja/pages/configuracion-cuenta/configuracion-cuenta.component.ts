import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { CuadreCajaService } from '../../services/cuadre-caja.service';

@Component({
  selector: 'app-configuracion-cuenta',
  templateUrl: './configuracion-cuenta.component.html',
  styleUrls: ['./configuracion-cuenta.component.scss']
})
export class ConfiguracionCuentaComponent implements OnInit, AfterViewInit {

  @ViewChild('cuentaInput') cuentaInput?: ElementRef;

  cuentaOptions: string[] = [];

  cuentaElegida: string | null = null;

  cuentaPorDefecto: string | null = null;
  getDefaultCuentaSub?: Subscription;
  setDefaultCuentaSub?: Subscription;

  constructor(
    private cuadreCajaService: CuadreCajaService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getDefaultCuentaSub = this.cuadreCajaService.obtenerCuentaPorDefecto().subscribe(
      cuenta => this.cuentaPorDefecto = cuenta,
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.cuentaInput?.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      filter(Boolean),
      switchMap((texto: any) => this.limpiarSeleccion(texto as string)),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((texto: any) => this.cuadreCajaService.getCuentas(texto as string)),
    ).subscribe(
      cuentas => this.cuentaOptions = cuentas,
    );
  }

  limpiarSeleccion(texto: string): Observable<string> {
    this.cuentaElegida = null;
    return of(texto);
  }

  elegirCuenta(cuenta: string): void {
    this.cuentaElegida = cuenta;
  }

  guardar(): void {
    this.getDefaultCuentaSub = this.cuadreCajaService.guardarCuentaPorDefecto(this.cuentaElegida!!).pipe(
      tap(ok => {
        this.snackBar.open('Cuenta por defecto actualizada');
      }),
      switchMap(ok => this.cuadreCajaService.obtenerCuentaPorDefecto()),
    ).subscribe(
      cuenta => this.cuentaPorDefecto = cuenta,
    );
  }

}
