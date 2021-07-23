import { EventEmitter, OnChanges, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Limite } from '../../models/limite.model';

@Component({
  selector: 'app-tabla-limites',
  templateUrl: './tabla-limites.component.html',
  styleUrls: ['./tabla-limites.component.scss']
})
export class TablaLimitesComponent implements OnInit, OnChanges {

  @Input() limites: Limite[] = [];
  @Input() loading: boolean = false;
  @Output() actualizar = new EventEmitter<Limite[]>();

  displayedColumns: string[] = ['empiezaCon', 'importeMaximo', 'nuevoValor'];

  sinCambios: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.limites = this.limites.map(limite => ({ ...limite, nuevoValor: limite.importeMaximo }));
  }

  grabar(): void {
    this.actualizar.emit(this.limites.filter(l => l.importeMaximo !== l.nuevoValor));
  }

  onCambio(): void {
    this.sinCambios = this.limites.filter(l => l.importeMaximo !== l.nuevoValor).length === 0;
  }

}
