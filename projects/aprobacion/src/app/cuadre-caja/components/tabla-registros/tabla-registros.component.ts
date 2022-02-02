import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegistroCuadre } from '../../models/registro-cuadre.model';
import { CuadreCajaService } from '../../services/cuadre-caja.service';

@Component({
  selector: 'app-tabla-registros',
  templateUrl: './tabla-registros.component.html',
  styleUrls: ['./tabla-registros.component.scss']
})
export class TablaRegistrosComponent implements OnInit, OnDestroy {

  @Input() registros: RegistroCuadre[] = [];
  @Input() loading: boolean = false;

  formatoOptions: string[] = [];
  getFormatosSub?: Subscription;

  displayedColumns: string[] = ['fecha', 'sucursal', 'oficina', 'saldoIDONormal', 'saldoIDOAdicional', 'saldoFAH', 'diferencia'];

  constructor(
    private cuadreCajaService: CuadreCajaService,
  ) { }

  ngOnInit(): void {
    this.getFormatosSub = this.cuadreCajaService.getFormatos().subscribe(
      formatos => this.formatoOptions = formatos,
    );
  }

  ngOnDestroy(): void {
    this.getFormatosSub?.unsubscribe();
  }

  descargar(formato: string): void {

  }

}
