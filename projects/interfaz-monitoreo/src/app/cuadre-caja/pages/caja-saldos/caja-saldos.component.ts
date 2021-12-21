import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltrosSaldos } from '../../models/filtros-saldos.model';
import { RegistroCuadre } from '../../models/registro-cuadre.model';
import { CuadreCajaService } from '../../services/cuadre-caja.service';

@Component({
  selector: 'app-caja-saldos',
  templateUrl: './caja-saldos.component.html',
  styleUrls: ['./caja-saldos.component.scss']
})
export class CajaSaldosComponent implements OnInit, OnDestroy {

  registros: RegistroCuadre[] = [];
  getRegistrosSub?: Subscription;
  loadingRegistros: boolean = false;

  filtros: FiltrosSaldos = {
    fechaCorte: null,
    sucursal: null,
    oficina: null,
    cuenta: null,
  }

  constructor(
    private cuadreCajaService: CuadreCajaService,
  ) { }

  ngOnInit(): void {
    this.buscar(this.filtros);
  }

  ngOnDestroy(): void {
    this.getRegistrosSub?.unsubscribe();
  }

  buscar(filtros: FiltrosSaldos): void {
    this.filtros = filtros;
    this.loadingRegistros = true;
    this.getRegistrosSub = this.cuadreCajaService.getRegistrosCuadre(this.filtros).subscribe(
      registros => this.registros = registros,
      error => console.log(error),
      () => this.loadingRegistros = false,
    );
  }

}
