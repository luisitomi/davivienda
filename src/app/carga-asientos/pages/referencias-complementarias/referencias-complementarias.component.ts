import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReferenciaComplementaria } from 'src/app/shared';
import { EditarReferenciaComponent } from '../../components/editar-referencia/editar-referencia.component';
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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.linea = Number(routeParams.get('linea'));

    this.getReferancias = this.asientoManualService.getReferencias(this.linea).subscribe(
      referencias => this.referencias.data = referencias || [],
    );
  }

  ngOnDestroy(): void {
    this.getReferancias?.unsubscribe();
  }

  nuevaReferencia(): void {
    const dialogRef = this.dialog.open(EditarReferenciaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { linea: this.linea },
    });
  }

  editarReferencia(referencia: ReferenciaComplementaria): void {
    const dialogRef = this.dialog.open(EditarReferenciaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { linea: this.linea, referencia },
    });
  }

  quitarReferencia(referencia: ReferenciaComplementaria): void {
    this.asientoManualService.removeReferencia(this.linea, referencia);
  }

}
