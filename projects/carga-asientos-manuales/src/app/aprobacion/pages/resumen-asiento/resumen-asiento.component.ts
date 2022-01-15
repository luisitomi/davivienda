import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Asiento } from 'src/app/shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-resumen-asiento',
  templateUrl: './resumen-asiento.component.html',
  styleUrls: ['./resumen-asiento.component.scss']
})
export class ResumenAsientoComponent extends UnsubcribeOnDestroy implements OnInit {
  id: number = 0;
  asiento?: Asiento;
  spinner: boolean;
  queryParams: any;

  constructor(
    private asientosService: AsientosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getAsiento(false);
  }

  getAsiento(agrupado: boolean): void {
    this.spinner = true;
    const $subas = this.asientosService
      .getAsientoPorId(this.id, agrupado)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        asiento => this.asiento = asiento,
      );
    this.arrayToDestroy.push($subas);
  }

  aprobar(): void {
    this.spinner = true;
    const $subas = this.asientosService
      .aprobar([this.id])
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        ok => this.router.navigate(['/aprobacion/asientos-pendientes']),
      );
    this.arrayToDestroy.push($subas);
  }

  rechazar(): void {
    this.spinner = true;
    const $subas = this.asientosService
      .rechazar([this.id])
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        ok => this.router.navigate(['/aprobacion/asientos-pendientes']),
      );
    this.arrayToDestroy.push($subas);
  }

  volver(): void {
    this.router.navigate(['/aprobacion/asientos-pendientes'],
    {
      queryParams: this.queryParams,
      skipLocationChange: false,
      queryParamsHandling: 'merge',
    })
  }

}
