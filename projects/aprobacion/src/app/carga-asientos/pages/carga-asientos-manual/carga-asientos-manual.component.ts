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
  urlBlob: string;

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
        },
        (error: any) => {
          this.message = error?.error?.estado;
          const message = error?.error?.logError.map(function(elem: any){
            return elem.mensaje;
          }).join(",");
          const archivo = new Blob([message], { type: 'text/plain' });
          const url = URL.createObjectURL(archivo);
          this.urlBlob = url;
        }
      )
    this.arrayToDestroy.push(postArchivoSub);
  }

}
