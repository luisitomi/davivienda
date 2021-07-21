import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-filtros-pendientes',
  templateUrl: './filtros-pendientes.component.html',
  styleUrls: ['./filtros-pendientes.component.scss']
})
export class FiltrosPendientesComponent implements OnInit {

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  filtrosForm = new FormGroup({
    inicio: new FormControl(),
    fin: new FormControl(),
    origen: new FormControl(''),
    usuario: new FormControl(''),
    estado: new FormControl(''),
    cuenta: new FormControl(''),
  });

  origenOptions: string[] = [];

  usuarioOptions: string[] = [];

  estadoOptions: string[] = [];

  cuentaOptions: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  filtrar(): void {
    this.panel?.close();
  }

}
