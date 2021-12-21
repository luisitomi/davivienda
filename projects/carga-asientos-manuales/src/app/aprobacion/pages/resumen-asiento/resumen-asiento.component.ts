import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Asiento } from 'src/app/shared';
import { AsientosService } from '../../services/asientos.service';

@Component({
  selector: 'app-resumen-asiento',
  templateUrl: './resumen-asiento.component.html',
  styleUrls: ['./resumen-asiento.component.scss']
})
export class ResumenAsientoComponent implements OnInit, OnDestroy {

  id: number = 0;

  asiento?: Asiento;

  getAsientoSub?: Subscription;
  aprobarSub?: Subscription;
  rechazarSub?: Subscription;

  constructor(
    private asientosService: AsientosService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.getAsiento(false);
  }

  ngOnDestroy(): void {
    this.getAsientoSub?.unsubscribe();
  }

  getAsiento(agrupado: boolean): void {
    this.getAsientoSub = this.asientosService.getAsientoPorId(this.id, agrupado).subscribe(
      asiento => this.asiento = asiento,
    );
  }

  aprobar(): void {
    this.aprobarSub = this.asientosService.aprobar([this.id]).subscribe(
      ok => this.router.navigate(['/aprobacion/asientos-pendientes']),
    );
  }

  rechazar(): void {
    this.rechazarSub = this.asientosService.rechazar([this.id]).subscribe(
      ok => this.router.navigate(['/aprobacion/asientos-pendientes']),
    );
  }

  volver(): void {
    this.location.back();
  }

}
