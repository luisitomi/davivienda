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

  numerTranfors(number: any): string {
    var num = Number(number)?.toFixed(2)
    var numArr = num.split('.')
    // eslint-disable-next-line no-redeclare
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for (var i = 0; i < len; i++) {
      result.push(operateNum[i])
      if (((i + 1) % 3 === 0) && (i !== len - 1)) {
        result.push(',')
      }
    }

    if (dotNum) {
      result.reverse().push('.', ...dotNum)
      return result.join('')
    } else {
      return result.reverse().join('')
    }
  }
}
