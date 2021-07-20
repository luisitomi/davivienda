import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ResultadoCarga } from 'src/app/shared';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-carga-asientos-manual',
  templateUrl: './carga-asientos-manual.component.html',
  styleUrls: ['./carga-asientos-manual.component.scss']
})
export class CargaAsientosManualComponent implements OnInit, OnDestroy {

  cargaForm = new FormGroup({
    archivo: new FormControl(),
  });

  accept: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';

  postArchivoSub?: Subscription;

  resultado?: ResultadoCarga;

  constructor(
    private asientoManualService: AsientoManualService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.postArchivoSub?.unsubscribe();
  }

  cargar(): void {
    this.postArchivoSub = this.asientoManualService.cargarAsientos(this.cargaForm.value.archivo)
      .subscribe(
        res => this.resultado = res,
      )
  }

}
