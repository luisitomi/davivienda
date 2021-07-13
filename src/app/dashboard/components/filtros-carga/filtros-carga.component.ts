import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtros-carga',
  templateUrl: './filtros-carga.component.html',
  styleUrls: ['./filtros-carga.component.scss']
})
export class FiltrosCargaComponent implements OnInit {

  filterForm = new FormGroup({
    origen: new FormControl(''),
    estado: new FormControl(''),
    fechaCarga: new FormControl(''),
    jobId: new FormControl(''),
    nombreArchivo: new FormControl(''),
    tipoCarga: new FormControl(''),
  });

  estadoOptions = ['Error técnico', 'Error funcional', 'Procesado'];

  tipoOptions = ['Automático', 'Manual', 'Reverso'];

  constructor() { }

  ngOnInit(): void {
  }

  filter(): void {
    //TODO: implement this
    console.log(this.filterForm.value);
  }

}
