import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent implements OnInit, OnDestroy {

  cabeceraForm = new FormGroup({
    origen: new FormControl('', Validators.required),
    periodoContable: new FormControl(null, Validators.required),
    numero: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaContable: new FormControl(null, Validators.required),
  });

  getCabeceraSub?: Subscription;

  hayLineas: boolean = false;

  getHayLineasSub?: Subscription;

  constructor(
    private asientoManualService: AsientoManualService,
  ) { }

  ngOnInit(): void {
    this.getCabeceraSub = this.asientoManualService.getCabecera().pipe(
      take(1),
    ).subscribe(
      cabecera => {
        if (cabecera !== undefined) {
          this.cabeceraForm.setValue(cabecera);
        }
      }
    );

    this.cabeceraForm.valueChanges.subscribe(
      cabecera => this.asientoManualService.setCabecera(cabecera),
    );

    this.getHayLineasSub = this.asientoManualService.hayLineas().subscribe(
      v => this.hayLineas = v,
    );
  }

  ngOnDestroy(): void {
    this.getHayLineasSub?.unsubscribe();
  }

  save(): void {
    this.asientoManualService.grabarAsiento().subscribe(
      res => console.log(res),
    );
  }

}
