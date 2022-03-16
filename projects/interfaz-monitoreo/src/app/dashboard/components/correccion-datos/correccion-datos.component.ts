import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { CargasService } from '../../../core/services/cargas.service';
import { CorreccionColumnasService } from '../../../core/services/correccion-columnas.service';
import { CorreccionFiltrosService } from '../../../core/services/correccion-filtros.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { ReprocesoService } from '../../../core/services/reproceso.service';
import { Carga, CorreccionColumna, CorreccionFiltro } from '../../../shared';
import { Maestra } from '../../../shared/models/maestra.model';
import { CorregirConfirmacionComponent } from '../corregir-confirmacion/corregir-confirmacion.component';
import { EditarColumnaComponent } from '../editar-columna/editar-columna.component';
import { EditarFiltroComponent } from '../editar-filtro/editar-filtro.component';


@Component({
  selector: 'app-correccion-datos',
  templateUrl: './correccion-datos.component.html',
  styleUrls: ['./correccion-datos.component.scss']
})
export class CorreccionDatosComponent implements OnInit, OnDestroy {

  @Input() cargaId?: number = 0;
  @Input() tipoArchivo?: string = "";
  @Input() origen?: string;
  filtrosDisplayedColumns: string[] = ['numeracion', 'columna', 'criterio', 'valor', 'acciones'];
  columnasDisplayedColumns: string [] = ['numeracion', 'columna', 'tipo', 'valor', 'acciones'];

  filtros = new MatTableDataSource<CorreccionFiltro>();
  columnas = new MatTableDataSource<CorreccionColumna>();



  columnasModal: Maestra[] = [ ];
  loadingCargas: boolean = false;

  getFiltrosSub?: Subscription;
  getColumnasSub?: Subscription;
  getCantidadRegSub?: Subscription;
  actualizarSub?: Subscription;

  cantidadRegistros: number = 0;

  registroMapping: { [k: string]: string } = {
    '=0': '0 registros',
    '=1': '1 registro',
    'other': '# registros',
  };

  constructor(
    private correccionFiltrosService: CorreccionFiltrosService,
    private correccionColumnasService: CorreccionColumnasService,
    private reprocesoService: ReprocesoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
    private cargasService: CargasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  //  const origen = "COBIS";
   /* if (this.tipoArchivo == 'HEADER'){
      this.GetColumnas(origen,1);
    } else if (this.tipoArchivo == 'LINE') {
      this.GetColumnas(origen,1);
    } */
    this.getCantidadRegSub = this.reprocesoService.getCantidadRegistros().subscribe(
      cantidad => this.cantidadRegistros = cantidad,
    );
   this.obtenerFiltros();
   this.obtenerColumnas();
/*
    this.getFiltrosSub = this.correccionFiltrosService.getFiltros().subscribe(
      filtros => this.filtros.data = filtros,
    );*/
/*
    this.getColumnasSub = this.correccionColumnasService.getColumnas().subscribe(
      columnas => this.columnas.data = columnas,
    ); */
  }
  obtenerFiltros(){

    this.loadingCargas = true;
  let tipoColumna = 0;
    if (this.tipoArchivo == 'HEADER'){
      tipoColumna = 1;
    } else if (this.tipoArchivo == 'LINE') {
      tipoColumna = 2;
    }

    this.getFiltrosSub = this.correccionFiltrosService.getFiltrosTsListarColumnasCorreccionXProcesoWS(this.cargaId,'FILTRO',tipoColumna,this.origen).subscribe(
     // filtros => this.filtros.data = filtros,
     filtros => { 
       if (filtros == undefined || filtros == null) {
        
       } else {
        this.poblarFiltros(filtros)
       }
       this.loadingCargas = false;
     },
    );
  }
  poblarFiltros( object :CorreccionFiltro[]) {
    this.filtros.data = object;
    this.correccionFiltrosService.filtros = object;
  }

  obtenerColumnas(){
    this.loadingCargas = true;
    let tipoColumna = 0;
      if (this.tipoArchivo == 'HEADER'){
        tipoColumna = 1;
      } else if (this.tipoArchivo == 'LINE') {
        tipoColumna = 2;
      }
  
      this.getFiltrosSub = this.correccionColumnasService.getFiltrosTsListarColumnasCorreccionXProcesoWS(this.cargaId,'COLUMNA',tipoColumna,this.origen).subscribe(
        columnas => {
          if (columnas == undefined || columnas == null) {
        
          } else {
            this.columnas.data = columnas
          }
          this.loadingCargas = false;
         },
      );
    }
  ngOnDestroy(): void {
    this.getFiltrosSub?.unsubscribe();
    this.getColumnasSub?.unsubscribe();
    this.actualizarSub?.unsubscribe();
    this.dialog.closeAll();
  }
  obtenerProceso(id: any) {
    this.cargasService.getCargaById(id).subscribe(
      carga => {
        this.loadingCargas = false;
       // this.carga = carga;
    
        
      }
    )
  }

  crearFiltro(): void {
    this.correccionFiltrosService.addValoresCorreccion(this.tipoArchivo,this.cargaId,this.origen) ;
    const dialogRef = this.dialog.open(EditarFiltroComponent, {
      width: '300px',
    }).afterClosed().subscribe(result => {
      
        this.obtenerFiltros();
    });


  }

  editarFiltro(filtro: CorreccionFiltro): void {
    this.correccionFiltrosService.addValoresCorreccion(this.tipoArchivo,this.cargaId,this.origen) ;
    const dialogRef = this.dialog.open(EditarFiltroComponent, {
      width: '300px',
      data: filtro,
    }).afterClosed().subscribe(result => {
      this.obtenerFiltros();
    });
  }

  eliminarFiltro(filtro: CorreccionFiltro) {
    this.loadingCargas = true;
    const prmBean = {
      IdArchivoZip: this.cargaId,
      TipoArchivo: this.tipoArchivo,
      TipoFiltro: 'FILTRO',
      Columna: filtro.columna,
      Usuario: this.authService.getUsuarioV2()
    }
    this.correccionFiltrosService.postTsEliminarCorreccionAHCWS(prmBean).subscribe(
      res => {
 
        
        this.snackBar.open('Se eliminó correctamente')
        this.obtenerColumnas();
      },
      () => {
        this.loadingCargas = false;
      }
    );
  //  this.correccionFiltrosService.removeFiltro(filtro);
  }

  crearColumna(): void {

    this.correccionColumnasService.addValoresCorreccion(this.tipoArchivo,this.cargaId,this.origen) ;
    const dialogRef = this.dialog.open(EditarColumnaComponent, {
      width: '300px',
    }).afterClosed().subscribe(result => {
      this.obtenerColumnas();
    });
  }

  editarColumna(columna: CorreccionColumna): void {
    this.correccionColumnasService.addValoresCorreccion(this.tipoArchivo,this.cargaId,this.origen) ;
    const dialogRef = this.dialog.open(EditarColumnaComponent, {
      width: '300px',
      data: columna,
    }).afterClosed().subscribe(result => {
      this.obtenerColumnas();
    });
  }

  eliminarColumna(columna: CorreccionColumna): void {
    this.loadingCargas = true;
    const prmBean = {
      IdArchivoZip: this.cargaId,
      TipoArchivo: this.tipoArchivo,
      TipoFiltro: 'COLUMNA',
      Columna: columna.columna,
      Usuario: this.authService.getUsuarioV2()
    }
    this.correccionFiltrosService.postTsEliminarCorreccionAHCWS(prmBean).subscribe(
      res => {
        
        this.obtenerColumnas();
      },
      () => {
        this.loadingCargas = false;
      }
    );
   // this.correccionColumnasService.removeColumna(columna);
  }

  calcularCantidadRegistros(): void {
    const obj = {
      IdArchivoZip:  this.cargaId,
      TipoArchivo: this.tipoArchivo,
      TipoFiltro: "FILTRO",
      Usuario: this.authService.getUsuarioV2(),
      FiltrosSeleccionados: this.filtros.data
    }
    this.loadingCargas = true;
   
    /*
    let sw = this.reprocesoService.calcularCantidadRegistroMetodo(obj);
    
   */ /*
    this.reprocesoService.calcularCantidadRegistrosService(obj).subscribe(
      res =>  this.reprocesoService.agregarCantidadRegistro(res.CantidadRegistros),
      () => this.loadingCargas = false,
      );*/

      this.reprocesoService.calcularCantidadRegistrosService(obj).subscribe(
         res => {
           
          if (res!= null && res.CantidadRegistros!= null) {
            this.reprocesoService.agregarCantidadRegistro(res.CantidadRegistros);
          }
          if (res != null && res.status != 'OK') {
            map(res.mensaje)
          }
          
          this.loadingCargas = false;
         
         }
        );
  }

  actualizar(): void {

    const obj = {
      IdArchivoZip:  this.cargaId,
      TipoArchivo: this.tipoArchivo,
      TipoFiltro: "COLUMNA",
      Usuario: this.authService.getUsuarioV2(),
      FiltrosSeleccionados: this.columnas.data
    }
    this.loadingCargas = true;
    
    const dialogRef = this.dialog.open(CorregirConfirmacionComponent);
    dialogRef.afterClosed().subscribe(
      res => {
      
        if (res === 'ok') {
          this.actualizarSub = this.reprocesoService.actualizarRegistrosV2(obj).pipe(
            tap(ok => this.snackBar.open(ok)),
            switchMap(ok => this.navigationService.getPreviousUrl())
          ).subscribe(
            url => {
              this.loadingCargas = false;
              if (url) {
                const carga = `${url.includes('?') ? '&' : '?'}carga=${this.cargaId}`;
              
                this.router.navigateByUrl(url + carga);
                
              }
            }
          );
        } else {
          this.loadingCargas = false;
        }
      }
    );
  }



  ///


}
