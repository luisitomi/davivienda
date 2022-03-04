import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ResultadoCarga } from 'src/app/shared';
import { AuthService } from '../../../core/services/auth.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
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
  nombreUsuario: string;

  constructor(
    private asientoManualService: HeaderLineService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  cargar(): void {
    this.spinner = true;
    const postArchivoSub = this.asientoManualService
      .cargarAsientos(this.cargaForm.value.archivo, this.nombreUsuario)
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        (res) => {
          this.resultado = res?.data;
          this.message = res?.estado;
          const message = res?.log.map(function(elem: any){
            return elem.mensaje;
          }).join(",");
          const archivo = new Blob([message], { type: 'text/plain' });
          const url = URL.createObjectURL(archivo);
          this.urlBlob = url;
          this.dialog.open(ConfirmationComponent, {
            width: '80%',
            maxWidth: '400px',
            data: { name: 'Se completó con éxito la subida del archivo'},
            panelClass: 'my-dialog',
          });
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
