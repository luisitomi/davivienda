import { Component, Input, OnInit } from '@angular/core';
import { Carga } from 'src/app/shared';

@Component({
  selector: 'app-tabla-control',
  templateUrl: './tabla-control.component.html',
  styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

  @Input() cargas: Carga[] = [];

  displayedColumns: String[] = [
    'numeracion',
    'fecha',
    'origen',
    'nombreArchivo',
    'estado',
    'reversado',
    'jobImportAccounting',
    'jobCreateAccounting',
    'cantidadH',
    'cantidadL',
    'ultimoProceso',
    'debitoStage',
    'creditoStage',
    'debitoXLA',
    'creditoXLA',
    'debitoGL',
    'creditoGL',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
