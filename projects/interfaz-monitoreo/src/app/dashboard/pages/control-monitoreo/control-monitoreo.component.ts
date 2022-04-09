import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargasService } from '../../../core/services/cargas.service';
import { Carga, Filtros } from '../../../shared';
import { DetalleArchivoComponent } from '../../components/detalle-archivo/detalle-archivo.component';
import { UtilServices } from '../../components/general/util.service';


@Component({
  selector: 'app-control-monitoreo',
  templateUrl: './control-monitoreo.component.html',
  styleUrls: ['./control-monitoreo.component.scss']
})
export class ControlMonitoreoComponent implements OnInit, OnDestroy, AfterViewChecked {
  inputFiltro: boolean = false;
  origen?: string;

  carga?: number;

  cargas: Carga[] = [];

  loadingCargas: boolean = false;

  getCargasSub?: Subscription;
  getCargaByIdSub?: Subscription;
  statusInitial = false;

  constructor(
    private cargasService: CargasService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private utilServices: UtilServices,
    private cdRef: ChangeDetectorRef,
  ) {
    this.utilServices.setTextValue('Monitoreo de Cargas');
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.origen = this.route.snapshot.queryParams.origen;
    this.carga = Number(this.route.snapshot.queryParams.carga);

    if (this.carga) {
      this.mostrarDetalle(this.carga);
    }
  }

  ngOnDestroy(): void {
    this.getCargasSub?.unsubscribe();
    this.getCargaByIdSub?.unsubscribe();
    this.dialog.closeAll();
  }

  filtrarCargas(filtros: Filtros): void {
    this.statusInitial = false;
    let fechaInicio = "";
    let fechaFin = "";
    if (filtros.despuesDe != null) {
      let day = filtros.despuesDe.getDate();
      let month = filtros.despuesDe.getMonth() + 1;
      let year = filtros.despuesDe.getFullYear();

      if (month < 10) {
        fechaInicio = `${day}/0${month}/${year}`;
      } else {
        fechaInicio = `${day}/${month}/${year}`;
      }
    } else {
      fechaInicio = "01/01/2020";
    }

    if (filtros.antesDe != null) {
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

    const prmBean = {

      Origen: (filtros.origen == undefined ? '' : filtros.origen),
      FechaCargaInicio: fechaInicio,
      FechaCargaFin: fechaFin,
      Estado: filtros.estado,
      NombreArchivo: filtros.nombreArchivo,
      JobCarga: filtros.jobId,
      TipoCarga: filtros.tipoCarga

    };
    this.loadingCargas = true;
    this.getCargasSub = this.cargasService.postCargas(
      prmBean
    ).subscribe(
      data => {
        this.cargas = data;
        this.statusInitial = true;
        this.inputFiltro = false;
      },
      () => {
        this.inputFiltro = false;
      },
      () => {
        this.loadingCargas = false;
        this.inputFiltro = false;
      },
    );
  }

  mostrarDetalle(cargaId: number): void {
    this.loadingCargas = true;
    this.getCargaByIdSub = this.cargasService.getCargaById(cargaId).subscribe(
      carga => {
        this.loadingCargas = false;
        this.dialog.open(DetalleArchivoComponent, {
          width: '80%',
          data: carga,
          disableClose: true,
        });
      }
    )
  }

  filtrarDatos(val: boolean) {
    this.inputFiltro = val;
  }

}
