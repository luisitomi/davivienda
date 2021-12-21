import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Oficina, Sucursal, CuentaContable } from 'src/app/shared';
import { FiltrosSaldos } from '../../models/filtros-saldos.model';
import { CuadreCajaService } from '../../services/cuadre-caja.service';

@Component({
  selector: 'app-buscar-registros',
  templateUrl: './buscar-registros.component.html',
  styleUrls: ['./buscar-registros.component.scss']
})
export class BuscarRegistrosComponent implements OnInit, OnDestroy{

  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;

  @Output() buscar = new EventEmitter<FiltrosSaldos>();

  criteriosForm = new FormGroup({
    fechaCorte: new FormControl(),
    sucursal: new FormControl(),
    oficina: new FormControl(),
    cuenta: new FormControl(),
    cuentaContable: new FormControl(),

  });

  sucursalOptions: Sucursal[] = [];
  oficinaOptions: Oficina[] = [];
  cuentaOptions: string[] = [];
  cuentaContableOptions: CuentaContable[] = [];

  getSucursalesub?: Subscription;
  getOficinasSub?: Subscription;
  getCuentasSub?: Subscription;
  getCuentaContableSub?: Subscription;


  constructor(
    private cuadreCajaService: CuadreCajaService,
  ) { }

  ngOnInit(): void {
    this.getSucursalesub = this.cuadreCajaService.getSucursales().subscribe(
      sucursales => this.sucursalOptions = sucursales,
    );

    this.getOficinasSub = this.cuadreCajaService.getOficinas().subscribe(
      oficinas => this.oficinaOptions = oficinas,
    );

    this.getCuentasSub = this.cuadreCajaService.getCuentas().subscribe(
      cuentas => this.cuentaOptions = cuentas,
    );

    this.getCuentaContableSub = this.cuadreCajaService.getCuentaContables().subscribe(
      cuentaContable => this.cuentaContableOptions = cuentaContable,
    );
  }

  ngOnDestroy(): void {
    this.getSucursalesub?.unsubscribe();
    this.getOficinasSub?.unsubscribe();
    this.getCuentasSub?.unsubscribe();
    this.getCuentaContableSub?.unsubscribe();

  }

  onBuscar(): void {
    this.panel?.close();
    this.buscar.emit(this.criteriosForm.value);
  }

}
