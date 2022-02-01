import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargasService } from 'src/app/core/services/cargas.service';
import { Carga, Reversado } from 'src/app/shared';

@Component({
  selector: 'app-reproceso',
  templateUrl: './reproceso.component.html',
  styleUrls: ['./reproceso.component.scss']
})
export class ReprocesoComponent implements OnInit, OnDestroy {
  cargaId: number = 0;

  elemento: string | undefined;
  carga: Carga | undefined;

  getCargaByIdSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cargasService: CargasService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.cargaId = Number(routeParams.get('id'));
    this.elemento = routeParams.get('elemento') || undefined;

    this.getCargaByIdSub = this.cargasService.getCargaById(this.cargaId).subscribe(
      carga => {
        this.carga = carga;
        if (this.carga?.reversado !== Reversado.Si) {
          this.snackBar.open('Archivo original no ha sido reversado', 'Aceptar', {
            duration: -1,
          });
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.getCargaByIdSub?.unsubscribe();
  }

  volver(): void {
    this.location.back();
  }

}
