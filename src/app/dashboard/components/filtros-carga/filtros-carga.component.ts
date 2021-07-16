import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Estados, Filtros, Origen, TipoCarga } from 'src/app/shared';

@Component({
  selector: 'app-filtros-carga',
  templateUrl: './filtros-carga.component.html',
  styleUrls: ['./filtros-carga.component.scss']
})
export class FiltrosCargaComponent implements OnInit {

  @Input() origen?: string;

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
    this.filterForm.setValue({
      origen: this.origen,
      estado: '',
      fechaCarga: new Date(),
      jobId: '',
      nombreArchivo: '',
      tipoCarga: ''
    });
  }

  filter(): void {
    this.filtrarCargas.emit(this.filterForm.value);
  }

}
