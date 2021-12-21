import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CargasService } from 'src/app/core/services/cargas.service';
import { Carga, Features, Permissions, Reversado } from 'src/app/shared';
import { Elemento } from 'src/app/shared';

@Component({
  selector: 'app-detalle-archivo',
  templateUrl: './detalle-archivo.component.html',
  styleUrls: ['./detalle-archivo.component.scss']
})
export class DetalleArchivoComponent implements OnDestroy {

  elemento = Elemento;

  private reprocesarSub?: Subscription;
  private reversarSub?: Subscription;

  reverso: Features = Features.Reversar;
  canReversar: Permissions = Permissions.Admin;
  reproceso: Features = Features.Reprocesar;
  canReprocesar: Permissions = Permissions.Admin;

  reversado = Reversado.Si;

  constructor(
    private cargasService: CargasService,
    public dialogRef: MatDialogRef<DetalleArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public carga: Carga,
    private snackBar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.reprocesarSub?.unsubscribe();
    this.reversarSub?.unsubscribe();
  }

  reversar():void {
    this.reversarSub = this.cargasService.reversar(this.carga).subscribe(
      ok => this.snackBar.open('Registro reversado satisfactoriamente'),
    );
  }

  reprocesar(): void {
    this.reprocesarSub = this.cargasService.reprocesar(this.carga).subscribe(
      ok => this.snackBar.open('Registro reprocesado satisfactoriamente'),
    );
  }

}
