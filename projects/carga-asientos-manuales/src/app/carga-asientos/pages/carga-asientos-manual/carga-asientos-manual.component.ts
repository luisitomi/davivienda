import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ResultadoCarga } from 'src/app/shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-carga-asientos-manual',
  templateUrl: './carga-asientos-manual.component.html',
  styleUrls: ['./carga-asientos-manual.component.scss']
})
export class CargaAsientosManualComponent extends UnsubcribeOnDestroy {
  spinner: boolean;
  cargaForm = new FormGroup({
    archivo: new FormControl(null ,[Validators.required]),
  });
  accept: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  resultado?: any;
  message: string;

  constructor(
    private asientoManualService: HeaderLineService,
  ) {
    super();
  }

  cargar(): void {
    this.spinner = true;
    const postArchivoSub = this.asientoManualService
      .cargarAsientos(this.cargaForm.value.archivo)
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        res => {
          this.resultado = res?.data;
          this.message = res?.estado;
        }
      )
    this.arrayToDestroy.push(postArchivoSub);
  }

}
