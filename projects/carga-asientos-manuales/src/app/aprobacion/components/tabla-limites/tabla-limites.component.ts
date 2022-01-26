import { EventEmitter, OnChanges, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Limite } from '../../models/limite.model';

@Component({
  selector: 'app-tabla-limites',
  templateUrl: './tabla-limites.component.html',
  styleUrls: ['./tabla-limites.component.scss']
})
export class TablaLimitesComponent implements OnInit {

  @Input() limites: Limite[];
  @Input() loading: boolean = false;

  displayedColumns: string[] = ['descripcion', 'empiezaCon', 'importeMaximo', 'nuevoValor'];

  sinCambios: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(this.limites)
  }

  grabar(): void {

  }

  onCambio(): void {
    
  }

}
