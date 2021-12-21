import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Features, Permissions } from 'src/app/shared';
import { NuevoFiltroComponent } from '../../components/nuevo-filtro/nuevo-filtro.component';
import { Buscar } from '../../models/buscar.model';
import { Filtro } from '../../models/filtro.model';
import { FiltrosOdiService } from '../../services/filtros-odi.service';

@Component({
  selector: 'app-mantenimiento-filtros',
  templateUrl: './mantenimiento-filtros.component.html',
  styleUrls: ['./mantenimiento-filtros.component.scss']
})
export class MantenimientoFiltrosComponent implements OnInit, OnDestroy {

  filtros = new MatTableDataSource<Filtro>();
  loadingFiltros: boolean = false;
  getFiltrosSub?: Subscription;
  guardarFiltrosSub?: Subscription;
  eliminarFiltroSub?: Subscription;

  criterios: Buscar = { fuente: '', valores: '', tipo: '', campo: '' };

  mantenimientoFeat = Features.MantenimientoFiltrosODI;
  mantenimientoMasivoFeat = Features.MantenimientoFiltrosODIMasivo;
  adminPermission = Permissions.Admin;

  constructor(
    private filtrosOdiService: FiltrosOdiService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.buscar(this.criterios);
  }

  ngOnDestroy(): void {
    this.getFiltrosSub?.unsubscribe();
    this.eliminarFiltroSub?.unsubscribe();
    this.guardarFiltrosSub?.unsubscribe();
  }

  buscar(criterios: Buscar) {
    this.criterios = criterios;
    this.loadingFiltros = true;
    this.getFiltrosSub = this.filtrosOdiService.getFiltros(criterios).subscribe(
      filtros => this.filtros.data = filtros,
      error => console.log(error),
      () => this.loadingFiltros = false,
    );
  }

  guardar(filtros: Filtro[]) {
    this.guardarFiltrosSub = this.filtrosOdiService.guardarFiltros(filtros).subscribe(
      ok => {
        this.snackBar.open('Filtros Guardados');
        this.buscar(this.criterios);
      }
    )
  }

  nuevoFiltro(): void {
    const dialogRef = this.matDialog.open(NuevoFiltroComponent, {
      width: '80%',
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe(
      result => result === 'creado' ? this.buscar(this.criterios) : null,
    );
  }

  eliminar(filtro: Filtro) {
    this.eliminarFiltroSub = this.filtrosOdiService.eliminarFiltro(filtro).subscribe(
      ok => {
        this.snackBar.open('Filtro eliminado');
        this.buscar(this.criterios);
      }
    )
  }

}
