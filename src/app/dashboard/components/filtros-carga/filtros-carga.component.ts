import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Estados, Filtros, Origen, TipoCarga } from 'src/app/shared';

@Component({
  selector: 'app-filtros-carga',
  templateUrl: './filtros-carga.component.html',
  styleUrls: ['./filtros-carga.component.scss']
})
export class FiltrosCargaComponent implements OnInit {

  @Output() filtrarCargas = new EventEmitter<Filtros>();

  filterForm = new FormGroup({
    origen: new FormControl(''),
    estado: new FormControl(''),
    fechaCarga: new FormControl(new Date()),
    jobId: new FormControl(''),
    nombreArchivo: new FormControl(''),
    tipoCarga: new FormControl(''),
  });

  origenOptions = Origen;

  estadoOptions = Estados;

  tipoOptions = TipoCarga;

  constructor() { }

  ngOnInit(): void {
  }

  filter(): void {
    this.filtrarCargas.emit(this.filterForm.value);
  }

}
