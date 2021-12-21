import { OnDestroy, ViewChild } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Buscar } from '../../models/buscar.model';
import { FiltrosOdiService } from '../../services/filtros-odi.service';

@Component({
  selector: 'app-buscar-filtros',
  templateUrl: './buscar-filtros.component.html',
  styleUrls: ['./buscar-filtros.component.scss']
})
export class BuscarFiltrosComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  @Output() buscar = new EventEmitter<Buscar>();

  buscarForm = new FormGroup({
    fuente: new FormControl(''),
    valores: new FormControl(),
    tipo: new FormControl(''),
    campo: new FormControl(''),
  });

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

  onBuscar(): void {
    this.panel?.close();
    this.buscar.emit(this.buscarForm.value);
  }

}
