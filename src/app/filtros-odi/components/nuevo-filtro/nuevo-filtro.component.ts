import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FiltrosOdiService } from '../../services/filtros-odi.service';

@Component({
  selector: 'app-nuevo-filtro',
  templateUrl: './nuevo-filtro.component.html',
  styleUrls: ['./nuevo-filtro.component.scss']
})
export class NuevoFiltroComponent implements OnInit, OnDestroy {

  nuevoForm = new FormGroup({
    fuente: new FormControl(null, [Validators.required]),
    valores: new FormControl(null, [Validators.required]),
    tipo: new FormControl(null, [Validators.required]),
    campo: new FormControl(null, [Validators.required]),
  });

  fuenteOptions: string[] = [];
  tipoOptions: string[] = [];
  campoOptions: string[] = [];

  crearFiltroSub?: Subscription;
  getFuentesSub?: Subscription;
  getTiposSub?: Subscription;
  getCamposSub?: Subscription;

  constructor(
    private filtrosOdiService: FiltrosOdiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NuevoFiltroComponent>,
  ) { }

  ngOnInit(): void {
    this.getFuentesSub = this.filtrosOdiService.getFuentes().subscribe(
      fuentes => this.fuenteOptions =fuentes,
    );

    this.getTiposSub = this.filtrosOdiService.getTipos().subscribe(
      tipos => this.tipoOptions = tipos,
    );

    this.getCamposSub = this.filtrosOdiService.getCampos().subscribe(
      campos => this.campoOptions = campos,
    );
  }

  ngOnDestroy(): void {
    this.crearFiltroSub?.unsubscribe();
    this.getFuentesSub?.unsubscribe();
    this.getTiposSub?.unsubscribe();
    this.getCamposSub?.unsubscribe();
  }

  guardar(): void {
    this.crearFiltroSub = this.filtrosOdiService.nuevoFiltro(this.nuevoForm.value).subscribe(
      ok => {
        this.snackBar.open('Filtro creado');
        this.dialogRef.close('creado');
      },
    );
  }

}
