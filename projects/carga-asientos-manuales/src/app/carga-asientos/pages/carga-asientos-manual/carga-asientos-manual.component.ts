import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  autorizacion: string;
  constructor(
    private asientoManualService: HeaderLineService,
    private authService: AuthService,
    private dialog: MatDialog,
    private utilServices: UtilServices,
    private toastr: ToastrService,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnInit(): void {
    this.utilServices.setTextValue('Carga Masivo');
    this.authService.getToken().subscribe(
      (token) => {
        this.autorizacion = 'Bearer ' + token;
      }
    );
  }

  downloadFile(): void {
    window.location.href = `/carga-asientos-manuales/assets/files/assets/files/${this.getFileNameDownload()}`;
  }

  getFileNameDownload(): string {
    return 'plantilla_carga_asiento.csv';
  }

  cargar(): void {

    if (this.nombreUsuario == undefined || this.nombreUsuario == null || this.nombreUsuario== '' ) {
      this.toastr.warning("El usuario no se ha cargado, intentelo mas tarde.", 'Advertencia');
      return;
    }

    this.spinner = true;
   if (!this.cargaForm.value?.archivo?.name?.toString()?.endsWith(".csv")) {
      this.toastr.warning(`Documento debe ser formato .csv`, 'Advertencia');
      this.spinner = false;
      return;
    }
   // console.log(this.cargaForm.value.archivo)
   /* if (this.cargaForm.value.archivo.type == 'application/vnd.ms-excel'){
      this.toastr.warning('Documento debe ser formato .csv, el formato enviado es application/vnd.ms-excel', 'Advertencia');
      this.spinner = false;
      return;
    }*/
 
    const postArchivoSub = this.asientoManualService
      //descomentar cuando se agregue funcion de eliminar adjunto
      //.cargarAsientos(this.cargaForm.value.archivo._files, this.nombreUsuario)
      .cargarAsientos(this.cargaForm.value.archivo, this.nombreUsuario,this.autorizacion)//esto se descomenta
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

  cleanInput(): void {
    this.cargaForm.patchValue({
      archivo: null,
    })
  }
}
