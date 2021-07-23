import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargasService } from 'src/app/core/services/cargas.service';
import { Carga } from 'src/app/shared';

@Component({
  selector: 'app-reproceso',
  templateUrl: './reproceso.component.html',
  styleUrls: ['./reproceso.component.scss']
})
export class ReprocesoComponent implements OnInit, OnDestroy {
  elemento: string | undefined;
  carga: Carga | undefined;

  getCargaByIdSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private cargasService: CargasService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const cargaId = Number(routeParams.get('id'));
    this.elemento = routeParams.get('elemento') || undefined;

    this.getCargaByIdSub = this.cargasService.getCargaById(cargaId).subscribe(
      carga => this.carga = carga,
    );
  }

  ngOnDestroy(): void {
    this.getCargaByIdSub?.unsubscribe();
  }

}
