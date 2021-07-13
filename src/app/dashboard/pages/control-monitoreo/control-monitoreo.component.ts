import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CargasService } from 'src/app/core/services/cargas.service';
import { Carga, Filtros } from 'src/app/shared';
import { DetalleArchivoComponent } from '../../components/detalle-archivo/detalle-archivo.component';

@Component({
  selector: 'app-control-monitoreo',
  templateUrl: './control-monitoreo.component.html',
  styleUrls: ['./control-monitoreo.component.scss']
})
export class ControlMonitoreoComponent implements OnInit, OnDestroy {

  cargas: Carga[] = [];

  getCargasSub?: Subscription;
  getCargaByIdSub?: Subscription;

  constructor(
    private cargasService: CargasService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCargasSub = this.cargasService.getCargas().subscribe(
      data => this.cargas = data,
    );
  }

  ngOnDestroy(): void {
    this.getCargasSub?.unsubscribe();
    this.getCargaByIdSub?.unsubscribe();
  }

  filtrarCargas(filtros: Filtros): void {
    this.getCargasSub = this.cargasService.getCargas(filtros.origen, null, '', filtros.estado).subscribe(
      data => this.cargas = data,
    );
  }

  mostrarDetalle(cargaId: number): void {
    this.getCargaByIdSub = this.cargasService.getCargaById(cargaId).subscribe(
      carga => {
        const dialogRef = this.dialog.open(DetalleArchivoComponent, {
          width: '80%',
          data: carga
        });
      }
    )
  }

}
