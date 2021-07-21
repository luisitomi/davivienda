import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EstadosDiaService } from 'src/app/core/services/estados-dia.service';
import { EstadoDia } from 'src/app/shared';

@Component({
  selector: 'app-cierre-diario',
  templateUrl: './cierre-diario.component.html',
  styleUrls: ['./cierre-diario.component.scss']
})
export class CierreDiarioComponent implements OnInit, OnDestroy {

  cierreForm = new FormGroup({
    inicio: new FormControl(moment().subtract(15, 'day').toDate()),
    fin: new FormControl(moment().toDate()),
  });

  estados = new MatTableDataSource<EstadoDia>();

  displayedColumns: string[] = ['numeracion', 'fecha', 'estado', 'acciones', 'fechaCierre', 'ejecutor'];

  getEstadosSub?: Subscription;

  loadingEstados: boolean = false;

  constructor(
    private estadosDiaService: EstadosDiaService,
  ) { }

  ngOnInit(): void {
    this.filtrar();
  }

  ngOnDestroy(): void {
    this.getEstadosSub?.unsubscribe();
  }

  filtrar(): void {
    this.loadingEstados = true;
    let { inicio, fin } = this.cierreForm.value;
    this.getEstadosSub = this.estadosDiaService.getEstados(inicio, fin).subscribe(
      estados => {
        this.estados.data = estados;
        this.loadingEstados = false;
      },
    );
  }

  cerrarDia(id: number) {
    this.estadosDiaService.cerrarDia(id).subscribe(
      res => this.estados.data = this.estados.data.map(e => e.id === id ? { ...e, estado: 'Cerrado' } : e),
    );
  }

}
