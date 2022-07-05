import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CargasService } from '../../../core/services/cargas.service';
import { Carga, Elemento, Features, Permissions, Reversado } from '../../../shared';
import { ConfirmacionReprocesoComponent } from '../confirmacion-reproceso/confirmacion-reproceso.component';
import { ConfirmacionReversaComponent } from '../confirmacion-reversa/confirmacion-reversa.component';




@Component({
  selector: 'app-detalle-archivo',
  templateUrl: './detalle-archivo.component.html',
  styleUrls: ['./detalle-archivo.component.scss']
})
export class DetalleArchivoComponent implements OnDestroy {
  arrayToDestroy: Array<any> = [];
  elemento = Elemento;
  spinner = false;
  private reprocesarSub?: Subscription;
  private reversarSub?: Subscription;
  nombreUsuario: string;
  reverso: Features = Features.Reversar;
  canReversar: Permissions = Permissions.Admin;
  reproceso: Features = Features.Reprocesar;
  canReprocesar: Permissions = Permissions.Admin;

  admistrador : boolean = false;

  reversado = Reversado.Si;
  bloqueo = false;
  loadingCargas = false;
  constructor(
    private cargasService: CargasService,
    public dialogRef: MatDialogRef<DetalleArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public carga: Carga,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
  ) {
    dialogRef.disableClose = true
  }

  ngOnInit(): void {
    this.getByRolUser();
   
  }

  numerTranfors(number: any): string {
    var num = Number(number)?.toFixed(2)
    var numArr = num.split('.')
    // eslint-disable-next-line no-redeclare
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for (var i = 0; i < len; i++) {
        result.push(operateNum[i])
        if (((i + 1) % 3 === 0) && (i !== len - 1)) {
            result.push(',')
        }
    }

    if (dotNum) {
        result.reverse().push('.', ...dotNum)
        return result.join('')
    } else {
        return result.reverse().join('')
    }
  }

  ngOnDestroy(): void {
    this.reprocesarSub?.unsubscribe();
    this.reversarSub?.unsubscribe();
  }

  validarReversa(archivo : String) {
    let boo = archivo.includes('REV');
    return boo;
  }
  validarManual(archivo : String) {
    let boo = archivo.includes('_M_');
    return boo;
  }
  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.authService
                  .getByIdRol(this.authService.getUsuarioV2())
                  .pipe(finalize(() => this.spinner = false))
                  .subscribe(
                    (response: any) => {
                   
                      this.admistrador = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_MONITOREO_CARGAS_ADMINISTRADOR');
               
                    }
                  )
    this.arrayToDestroy.push($rol);
  }

  reversar():void {
  
    const dialogRef = this.dialog.open(ConfirmacionReversaComponent,{
      width: '300px',
      data: "¿Esta seguro que quiere reversar el proceso?",
    });
    dialogRef.afterClosed().subscribe( res => {

        //---------------- INICIO VALIDACION ----------------//
       if (res!= null) {
         this.bloqueo = true;
           
            this.loadingCargas = true;
            let fechaContable= "";
            if (res.fecha != null) {
              let day = res.fecha.getDate();
              let month = res.fecha.getMonth() + 1;
              let year = res.fecha.getFullYear();
        
              if (month < 10) {
                fechaContable =  `${year}-0${month}-${day}`;
              } else {
                fechaContable = `${year}-${month}-${day}`;
              }
            } else {
            // fechaContable = "01/01/2050";
            }
        

          //let fechaContable = "";
          let id = this.carga.id;
          let origen = this.carga.origen;
          let usuario = this.authService.getUsuarioV2();
          this.reversarSub = this.cargasService.reversarProceso(fechaContable,  id, origen, usuario).subscribe(
            res => {
              this.bloqueo = false;
              if (res!= null && res.Estado == 'OK') {
                this.snackBar.open(res.Mensaje) 
                this.carga.reversado = 'Y'
              } else {
                this.snackBar.open(res.Mensaje) 
              }
              this.loadingCargas = false 
            // this.snackBar.open('Registro reversado satisfactoriamente') 
            // console.log(res)
          
            },
            error => { 
              this.bloqueo = false;
           
            this.snackBar.open(error.error.Mensaje) 
            this.loadingCargas = false 
            },
            () => {
              this.bloqueo = false;
              this.loadingCargas = false 
              this.obtenerCarga()
                },
          );
       }
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

    const dialogRef = this.dialog.open(ConfirmacionReprocesoComponent,{
      width: '300px',
      data: "¿Esta seguro que quiere reprocesar el proceso?",
    });
    dialogRef.afterClosed().subscribe( res => {
      //---------------- INICIO VALIDACION ----------------//
        if (res!= null) {
          this.bloqueo = true;
          this.loadingCargas = true;
          
          let fechaContable= "";
          if (res.fecha != null) {
            let day = res.fecha.getDate();
            let month = res.fecha.getMonth() + 1;
            let year = res.fecha.getFullYear();
      
            if (month < 10) {
              fechaContable =  `${year}-${month}-${day}`;
            } else {
              fechaContable = `${year}-${month}-${day}`;
            }
          } else {
          // fechaContable = "01/01/2050";
          }
          
          this.reprocesarSub = this.cargasService.reprocesarV2(this.carga,fechaContable,this.authService.getUsuarioV2()).subscribe(
            ok => {
            this.obtenerCarga();
          
              this.snackBar.open('Registro reprocesado satisfactoriamente')
              this.loadingCargas = false 
              this.bloqueo = false;
            } ,
            error => {
              
              this.snackBar.open(error.error.Mensaje)
              this.loadingCargas = false 
              this.bloqueo = false;
            },
            () => {
                this.loadingCargas = false
                this.bloqueo = false;
                
                this.obtenerCarga();
            }
          );

      }
      //---------------- FIN VALIDACION ----------------//


    }
      
    );

   
  }

  obtenerCarga() {
    this.loadingCargas = true;
    this.cargasService.getCargaById(this.carga.id).subscribe(
      carga => {
        this.loadingCargas = false;
        
        this.carga = carga;
 
        
      }
    )
  }
  

}
