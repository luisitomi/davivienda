import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReferenciaComplementaria } from 'src/app/shared';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-referencias-complementarias',
  templateUrl: './referencias-complementarias.component.html',
  styleUrls: ['./referencias-complementarias.component.scss']
})
export class ReferenciasComplementariasComponent implements OnInit, OnDestroy {

  linea: number = 0;

  referencias: MatTableDataSource<ReferenciaComplementaria> = new MatTableDataSource();

  displayedColumns: string[] = ['nombre', 'valor', 'acciones'];

  getReferancias?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private asientoManualService: AsientoManualService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const linea = Number(routeParams.get('linea'));

    this.getReferancias = this.asientoManualService.getReferencias(linea).subscribe(
      referencias => this.referencias.data = referencias || [],
    );
  }

  ngOnDestroy(): void {
    this.getReferancias?.unsubscribe();
  }

}
