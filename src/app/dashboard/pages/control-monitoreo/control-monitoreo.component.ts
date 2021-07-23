import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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

  origen?: string;

  cargas: Carga[] = [];

  loadingCargas: boolean = false;

  getCargasSub?: Subscription;
  getCargaByIdSub?: Subscription;

  constructor(
    private cargasService: CargasService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadingCargas = true;

    this.origen = this.route.snapshot.queryParams.origen;

    this.getCargasSub = this.cargasService.getCargas(this.origen).subscribe(
      data => this.cargas = data,
      error => console.log(error),
      () => this.loadingCargas = false,
    );
  }

  ngOnDestroy(): void {
    this.getCargasSub?.unsubscribe();
    this.getCargaByIdSub?.unsubscribe();
    this.dialog.closeAll();
  }

  filtrarCargas(filtros: Filtros): void {
    this.loadingCargas = true;
    this.getCargasSub = this.cargasService.getCargas(
      filtros.origen,
      filtros.despuesDe,
      filtros.antesDe,
      filtros.jobId,
      filtros.estado
    ).subscribe(
      data => this.cargas = data,
      error => console.log(error),
      () => this.loadingCargas = false,
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
