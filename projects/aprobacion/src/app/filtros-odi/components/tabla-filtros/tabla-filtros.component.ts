import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Filtro } from '../../models/filtro.model';
import { FiltrosOdiService } from '../../services/filtros-odi.service';

@Component({
  selector: 'app-tabla-filtros',
  templateUrl: './tabla-filtros.component.html',
  styleUrls: ['./tabla-filtros.component.scss']
})
export class TablaFiltrosComponent implements OnInit, OnDestroy, OnChanges {

  @Input() filtros = new MatTableDataSource<Filtro>();
  @Input() loading: boolean = false;
  @Output() guardar = new EventEmitter<Filtro[]>();
  @Output() nuevo = new EventEmitter<null>();
  @Output() eliminar = new EventEmitter<Filtro>();

  displayedColumns: string[] = ['numeracion', 'fuente', 'valores', 'tipo', 'campo'];

  selected: Filtro | null = null;

  noHayCambios: boolean = true;

  fuenteOptions: string[] = [];
  tipoOptions: string[] = [];
  campoOptions: string[] = [];
  getFuentesSub?: Subscription;
  getTiposSub?: Subscription;
  getCamposSub?: Subscription;

  constructor(
    private filtrosOdiService: FiltrosOdiService,
  ) { }

  ngOnInit(): void {
    this.getFuentesSub = this.filtrosOdiService.getFuentes().subscribe(
      fuentes => this.fuenteOptions = fuentes,
    );

    this.getTiposSub = this.filtrosOdiService.getTipos().subscribe(
      tipos => this.tipoOptions = tipos,
    );

    this.getCamposSub = this.filtrosOdiService.getCampos().subscribe(
      campos => this.campoOptions = campos,
    );
  }

  ngOnDestroy(): void {
    this.getFuentesSub?.unsubscribe();
    this.getTiposSub?.unsubscribe();
    this.getCamposSub?.unsubscribe();
  }

  ngOnChanges(): void {
    this.selected = null;
    this.noHayCambios = true;
  }

  onGuardar():void {
    this.guardar.emit(this.filtros.data.filter(f => f.fuente !== f.oldFuente || f.valores !== f.oldValores || f.tipo !== f.oldTipo || f.campo !== f.oldCampo));
  }

  onChange(): void {
    this.noHayCambios = this.filtros.data.filter(f => f.fuente !== f.oldFuente || f.valores !== f.oldValores || f.tipo !== f.oldTipo || f.campo !== f.oldCampo).length === 0;
  }

  nuevoFiltro(): void {
    this.nuevo.emit();
  }

  onEliminar(): void {
    this.eliminar.emit(this.selected!!);
  }

}
