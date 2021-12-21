import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Carga } from '../../../shared';


@Component({
  selector: 'app-tabla-control',
  templateUrl: './tabla-control.component.html',
  styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

  @Input() cargas: Carga[] = [];

  @Input() loading: boolean = false;

  @Output() mostrarDetalle = new EventEmitter<number>();

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
    'acciones',
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clickVer(cargaId: number): void {
    this.mostrarDetalle.emit(cargaId);
  }

}
