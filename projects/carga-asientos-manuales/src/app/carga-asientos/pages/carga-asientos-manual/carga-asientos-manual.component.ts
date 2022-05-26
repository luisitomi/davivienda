import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { UtilServices } from '../../../shared/component/general/util.sevice';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { HeaderLineService } from '../../services/header-line.service';

@Component({
  selector: 'app-carga-asientos-manual',
  templateUrl: './carga-asientos-manual.component.html',
  styleUrls: ['./carga-asientos-manual.component.scss']
})
export class CargaAsientosManualComponent extends UnsubcribeOnDestroy implements OnInit {
  spinner: boolean;
  cargaForm = new FormGroup({
    archivo: new FormControl(null ,[Validators.required]),
  });
  accept: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
  resultado?: any;
  message: string;
  urlBlob: string;
  nombreUsuario: string;
  messageLink: string;

  constructor(
    private asientoManualService: HeaderLineService,
    private authService: AuthService,
    private dialog: MatDialog,
    private utilServices: UtilServices,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.utilServices.setTextValue('Carga Masivo');
  }

  downloadFile(): void {
    window.location.href = `/carga-asientos-manuales/assets/files/assets/files/${this.getFileNameDownload()}`;
  }

  getFileNameDownload(): string {
    return 'plantilla_carga_asiento.csv';
  }

  cargar(): void {
    this.spinner = true;
    const postArchivoSub = this.asientoManualService
      //descomentar cuando se agregue funcion de eliminar adjunto
      //.cargarAsientos(this.cargaForm.value.archivo._files, this.nombreUsuario)
      .cargarAsientos(this.cargaForm.value.archivo, this.nombreUsuario)//esto se descomenta
      .pipe(finalize(() => this.spinner= false))
      .subscribe(
        (res) => {
          this.resultado = res?.data;
          this.message = res?.estado;
          const message = res?.log.map(function(elem: any){
            return elem.mensaje;
          }).join("\n");
          const archivo = new Blob([message], { type: 'text/plain' });
          const url = URL.createObjectURL(archivo);
          this.urlBlob = url;
          this.messageLink = `log_ejecucion_${new Date().toLocaleDateString()?.replace('/','_')?.replace('/','_')
        }_${new Date().toLocaleTimeString()?.replace(':','_')?.replace(':','_')}`
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
          }).join("\n");
          const archivo = new Blob([message], { type: 'text/plain' });
          const url = URL.createObjectURL(archivo);
          this.messageLink = `log_ejecucion_${new Date().toLocaleDateString()?.replace('/','_')?.replace('/','_')
        }_${new Date().toLocaleTimeString()?.replace(':','_')?.replace(':','_')}`
          this.urlBlob = url;
        }
      )
    this.arrayToDestroy.push(postArchivoSub);
  }

}
