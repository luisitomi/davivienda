import { Component, Input } from '@angular/core';
import { AccountLine } from '../../models/limite.model';

@Component({
  selector: 'app-tabla-resumen-asiento',
  templateUrl: './tabla-resumen-asiento.component.html',
  styleUrls: ['./tabla-resumen-asiento.component.scss']
})
export class TablaResumenAsientoComponent {
  @Input() cuentas: AccountLine[] = [];
  displayedColumns: string[] = ['numeracion', 'primerDigito', 'cuenta', 'nombre', 'moneda', 'debito', 'credito', 'neto'];
}
