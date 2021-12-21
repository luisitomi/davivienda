import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CargasService } from '../../../core/services/cargas.service';
import { Carga, Elemento, Features, Permissions, Reversado } from '../../../shared';
import { ConfirmacionReversaComponent } from '../confirmacion-reversa/confirmacion-reversa.component';




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
  bloqueo = false;
  loadingCargas = false;
  constructor(
    private cargasService: CargasService,
    public dialogRef: MatDialogRef<DetalleArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public carga: Carga,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.carga);
  }
  ngOnDestroy(): void {
    this.reprocesarSub?.unsubscribe();
    this.reversarSub?.unsubscribe();
  }

  reversar():void {
  
    const dialogRef = this.dialog.open(ConfirmacionReversaComponent,{
      width: '300px',
      data: "¿Esta seguro que quiere reversar el proceso?",
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('res' +res) 
      this.loadingCargas = true;
      let fechaContable= "";
      if (res != null) {
        let day = res.getDate();
        let month = res.getMonth() + 1;
        let year = res.getFullYear();
  
        if (month < 10) {
          fechaContable =  `${year}-${month}-${day}`;
        } else {
          fechaContable = `${year}-${month}-${day}`;
        }
      } else {
       // fechaContable = "01/01/2050";
      }
      console.log('fechaContable'+fechaContable)

    //let fechaContable = "";
    let id = this.carga.id;
    let origen = this.carga.origen;
    let usuario = "prueba";
    this.reversarSub = this.cargasService.reversarProceso(fechaContable,  id, origen, usuario).subscribe(
      res => {
      
        debugger
        this.snackBar.open('Registro reversado satisfactoriamente') 
        console.log(res)
    
    },
    error => { 
      console.log('error 2:')
      console.log(error)
      this.loadingCargas = false 
    },
      () => {
        this.loadingCargas = false 
        this.obtenerCarga()
          },
    
    );
     
    });

  }

  /*   if (filtros.antesDe != null) {
      let day = filtros.antesDe.getDate();
      let month = filtros.antesDe.getMonth() + 1;
      let year = filtros.antesDe.getFullYear();

      if (month < 10) {
        fechaFin = `${day}/0${month}/${year}`;
      } else {
        fechaFin = `${day}/${month}/${year}`;
      }
    } else {
      fechaFin = "01/01/2050";
    }
    */

  reprocesar(): void {

    const dialogRef = this.dialog.open(ConfirmacionReversaComponent,{
      width: '300px',
      data: "¿Esta seguro que quiere reprocesar el proceso?",
    });
    dialogRef.afterClosed().subscribe( res => {
      this.loadingCargas = true;
      console.log('res' +res) 
      let fechaContable= "";
      if (res != null) {
        let day = res.getDate();
        let month = res.getMonth() + 1;
        let year = res.getFullYear();
  
        if (month < 10) {
          fechaContable =  `${year}-${month}-${day}`;
        } else {
          fechaContable = `${year}-${month}-${day}`;
        }
      } else {
       // fechaContable = "01/01/2050";
      }
      console.log('fechaContable'+fechaContable)
      this.reprocesarSub = this.cargasService.reprocesarV2(this.carga,fechaContable).subscribe(
        ok => {
         this.obtenerCarga();
          this.snackBar.open('Registro reprocesado satisfactoriamente')
         
        } ,
        () => {
            this.loadingCargas = false
            this.obtenerCarga();
        }
      );
        

    }
      
    );

   
  }

  obtenerCarga() {
    this.loadingCargas = true;
    this.cargasService.getCargaById(this.carga.id).subscribe(
      carga => {
        this.loadingCargas = false;
        
        this.carga = carga;
        console.log(carga);
        
      }
    )
  }
  

}
