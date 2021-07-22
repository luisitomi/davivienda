import { Component, Input, OnInit } from '@angular/core';
import { Asiento } from 'src/app/shared';

@Component({
  selector: 'app-tabla-asientos',
  templateUrl: './tabla-asientos.component.html',
  styleUrls: ['./tabla-asientos.component.scss']
})
export class TablaAsientosComponent implements OnInit {

  @Input() asientos: Asiento[] = [];

  @Input() loading: boolean = false;

  displayedColumns: string[] = ['numeracion', 'fechaCarga', 'usuario', 'comprobante', 'fechaContable', 'descripcion', 'cargos', 'abonos', 'acciones'];

  constructor() { }

  ngOnInit(): void {
  }

}
