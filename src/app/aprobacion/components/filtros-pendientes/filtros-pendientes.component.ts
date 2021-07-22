import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { OrigenService } from 'src/app/core/services/origen.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { FiltroAsiento } from '../../models/filtro-asiento.model';
import { CuentasService } from '../../services/cuentas.service';
import { EstadoAsientoService } from '../../services/estado-asiento.service';

@Component({
  selector: 'app-filtros-pendientes',
  templateUrl: './filtros-pendientes.component.html',
  styleUrls: ['./filtros-pendientes.component.scss']
})
export class FiltrosPendientesComponent implements OnInit, OnDestroy {

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  @Output() filtros = new EventEmitter<FiltroAsiento>();

  filtrosForm = new FormGroup({
    inicio: new FormControl(),
    fin: new FormControl(),
    origen: new FormControl(''),
    usuario: new FormControl(''),
    estado: new FormControl(''),
    cuenta: new FormControl(''),
  });

  origenOptions: string[] = [];
  usuarioOptions: string[] = [];
  estadoOptions: string[] = [];
  cuentaOptions: string[] = [];

  getOrigenesSub?: Subscription;
  getUsuariosSub?: Subscription;
  getCuentasSub?: Subscription;
  getEstadosSub?: Subscription;

  constructor(
    private origenService: OrigenService,
    private usuarioService: UsuarioService,
    private cuentasService: CuentasService,
    private estadoAsientoService: EstadoAsientoService,
  ) { }

  ngOnInit(): void {
    this.getOrigenesSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    );

    this.getUsuariosSub = this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarioOptions = usuarios,
    );

    this.getCuentasSub = this.cuentasService.getCuentas().subscribe(
      cuentas => this.cuentaOptions = cuentas,
    );

    this.getEstadosSub = this.estadoAsientoService.getEstados().subscribe(
      estados => this.estadoOptions = estados,
    );
  }

  ngOnDestroy(): void {
    this.getOrigenesSub?.unsubscribe();
    this.getUsuariosSub?.unsubscribe();
    this.getCuentasSub?.unsubscribe();
    this.getEstadosSub?.unsubscribe();
  }

  filtrar(): void {
    this.filtros.emit(this.filtrosForm.value);
    this.panel?.close();
  }

}
