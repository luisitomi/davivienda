import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent implements OnInit {

  cabeceraForm = new FormGroup({
    origen: new FormControl(''),
    periodoContable: new FormControl(),
    numero: new FormControl(''),
    descripcion: new FormControl(''),
    fechaContable: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
