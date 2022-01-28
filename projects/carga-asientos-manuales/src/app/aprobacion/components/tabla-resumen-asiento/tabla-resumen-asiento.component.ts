import { Component, Input } from '@angular/core';
import { Cuenta } from 'src/app/shared';

@Component({
  selector: 'app-tabla-resumen-asiento',
  templateUrl: './tabla-resumen-asiento.component.html',
  styleUrls: ['./tabla-resumen-asiento.component.scss']
})
export class TablaResumenAsientoComponent {
  @Input() cuentas: Cuenta[] = [];
  displayedColumns: string[] = ['numeracion', 'primerDigito', 'cuenta', 'nombre', 'moneda', 'debito', 'credito', 'neto'];
}
