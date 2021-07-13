import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-control',
  templateUrl: './tabla-control.component.html',
  styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

  cargas: String[] = [];

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
