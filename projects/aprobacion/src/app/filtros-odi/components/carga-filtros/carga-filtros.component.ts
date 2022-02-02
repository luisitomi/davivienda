import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FiltrosOdiService } from '../../services/filtros-odi.service';

@Component({
  selector: 'app-carga-filtros',
  templateUrl: './carga-filtros.component.html',
  styleUrls: ['./carga-filtros.component.scss']
})
export class CargaFiltrosComponent implements OnInit, OnDestroy {

  cargaForm = new FormGroup({
    archivo: new FormControl(null, [Validators.required]),
  });

  cargarArchivoSub?: Subscription;

  resultado?: string;

  constructor(
    private filtrosOdiService: FiltrosOdiService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.cargarArchivoSub?.unsubscribe();
  }

  cargar(): void {
    this.filtrosOdiService.cargarFiltros(this.cargaForm.value.archivo).subscribe(
      res => this.resultado = res.estado,
    );
  }

}
