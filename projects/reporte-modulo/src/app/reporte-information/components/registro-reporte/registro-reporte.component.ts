import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ReporteService } from '../../../core/services/reporte.service';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { Reporte } from '../../../shared/models/reporte.model';

@Component({
  selector: 'app-registro-reporte',
  templateUrl: './registro-reporte.component.html',
  styleUrls: ['./registro-reporte.component.scss'],
})
export class RegistroReporteComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() reporteRegistrado = new EventEmitter<Reporte>();

  spinner: boolean;
  reporte: any;

  columns:string[] = ['IdParam', 'Acciones'];
  labels:any = {
    IdParam: 'Id',
    Acciones: 'Acciones'
  };

  constructor(
    private route: ActivatedRoute,
    private reporteService: ReporteService,
  ) {
    super();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id')) || 0;
    //this.postTsFAHBuscarParametrosModuloReportePorIdWS(id);
  }

  postTsFAHBuscarParametrosModuloReportePorIdWS(IdReporte: number) {
    this.spinner = true;
    this.reporteService
      .postTsFAHBuscarParametrosModuloReportePorIdWS({ Id: IdReporte })
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (rest: any) => {
        this.reporte = rest;
        this.spinner = false;
        let number = 1;
        this.reporte.forEach((element: any) => {
          if (element.Estado != 2) {
            element.Index = number;
            number++;
          }
        })
      })
  }
}
