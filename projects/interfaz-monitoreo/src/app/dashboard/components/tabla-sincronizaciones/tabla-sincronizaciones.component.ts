import { Component, Input, OnInit } from '@angular/core';
import { Sincronizacion } from '../../../shared';


@Component({
  selector: 'app-tabla-sincronizaciones',
  templateUrl: './tabla-sincronizaciones.component.html',
  styleUrls: ['./tabla-sincronizaciones.component.scss']
})
export class TablaSincronizacionesComponent implements OnInit {

  @Input() sincronizaciones: Sincronizacion[] = [];

  @Input() loading: boolean = false;

  displayedColumns: string[] = ['numeracion', 'fecha', 'proceso', 'estado'];

  constructor() { }

  ngOnInit(): void {
  }

}
