import { Component, Input, OnInit } from '@angular/core';
import { Sincronizacion } from 'src/app/shared';

@Component({
  selector: 'app-tabla-sincronizaciones',
  templateUrl: './tabla-sincronizaciones.component.html',
  styleUrls: ['./tabla-sincronizaciones.component.scss']
})
export class TablaSincronizacionesComponent implements OnInit {

  @Input() sincronizaciones: Sincronizacion[] = [];

  displayedColumns: string[] = ['numeracion', 'fecha', 'proceso', 'estado'];

  constructor() { }

  ngOnInit(): void {
  }

}
