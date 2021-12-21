import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CorreccionColumnasService } from 'src/app/core/services/correccion-columnas.service';
import { CorreccionFiltrosService } from 'src/app/core/services/correccion-filtros.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { ReprocesoService } from 'src/app/core/services/reproceso.service';
import { CorreccionColumna, CorreccionFiltro } from 'src/app/shared';
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

  filtrosDisplayedColumns: string[] = ['numeracion', 'columna', 'criterio', 'valor', 'acciones'];
  columnasDisplayedColumns: string [] = ['numeracion', 'columna', 'tipo', 'valor', 'acciones'];

  filtros = new MatTableDataSource<CorreccionFiltro>();
  columnas = new MatTableDataSource<CorreccionColumna>();

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
  ) { }

  ngOnInit(): void {
    this.getCantidadRegSub = this.reprocesoService.getCantidadRegistros().subscribe(
      cantidad => this.cantidadRegistros = cantidad,
    );

    this.getFiltrosSub = this.correccionFiltrosService.getFiltros().subscribe(
      filtros => this.filtros.data = filtros,
    );

    this.getColumnasSub = this.correccionColumnasService.getColumnas().subscribe(
      columnas => this.columnas.data = columnas,
    );
  }

  ngOnDestroy(): void {
    this.getFiltrosSub?.unsubscribe();
    this.getColumnasSub?.unsubscribe();
    this.actualizarSub?.unsubscribe();
    this.dialog.closeAll();
  }

  crearFiltro(): void {
    const dialogRef = this.dialog.open(EditarFiltroComponent, {
      width: '300px',
    });
  }

  editarFiltro(filtro: CorreccionFiltro): void {
    const dialogRef = this.dialog.open(EditarFiltroComponent, {
      width: '300px',
      data: filtro,
    });
  }

  eliminarFiltro(filtro: CorreccionFiltro) {
    this.correccionFiltrosService.removeFiltro(filtro);
  }

  crearColumna(): void {
    const dialogRef = this.dialog.open(EditarColumnaComponent, {
      width: '300px',
    });
  }

  editarColumna(columna: CorreccionColumna): void {
    const dialogRef = this.dialog.open(EditarColumnaComponent, {
      width: '300px',
      data: columna,
    });
  }

  eliminarColumna(columna: CorreccionColumna): void {
    this.correccionColumnasService.removeColumna(columna);
  }

  calcularCantidadRegistros(): void {
    this.reprocesoService.calcularCantidadRegistros(this.filtros.data);
  }

  actualizar(): void {
    const dialogRef = this.dialog.open(CorregirConfirmacionComponent);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res === 'ok') {
          this.actualizarSub = this.reprocesoService.actualizarRegistros(this.filtros.data, this.columnas.data).pipe(
            tap(ok => this.snackBar.open(ok)),
            switchMap(ok => this.navigationService.getPreviousUrl())
          ).subscribe(
            url => {
              if (url) {
                const carga = `${url.includes('?') ? '&' : '?'}carga=${this.cargaId}`;
                this.router.navigateByUrl(url + carga);
                console.log(url);
              }
            }
          );
        }
      }
    );
  }

}
