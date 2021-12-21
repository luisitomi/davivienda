import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Linea } from '../../models/linea.model';
import { AsientoManualService } from '../../services/asiento-manual.service';
import { CombinacionContableComponent } from '../combinacion-contable/combinacion-contable.component';
import { EditarLineaComponent } from '../editar-linea/editar-linea.component';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.scss']
})
export class LineasComponent implements OnInit, OnDestroy {

  lineas: MatTableDataSource<Linea> = new MatTableDataSource();

  getLineasSub?: Subscription;

  displayedColumns: string[] = ['index', 'combinacion', 'moneda', 'debito', 'credito', 'referenciales', 'acciones'];

  constructor(
    private asientoManualService: AsientoManualService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getLineasSub = this.asientoManualService.getLineas().subscribe(
      lineas => {
        this.lineas.data = lineas;
        lineas.forEach(l => console.log(l));
        lineas.forEach(l => console.log(l.combinacionContable));
      },
    );
  }

  ngOnDestroy(): void {
    this.getLineasSub?.unsubscribe();
  }

  nuevaLinea(): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
    });
  }

  editarLinea(linea: Linea): void {
    const dialogRef = this.dialog.open(EditarLineaComponent, {
      width: '80%',
      maxWidth: '400px',
      data: linea,
    });
  }

  quitarLinea(linea: Linea): void {
    this.asientoManualService.removeLinea(linea);
  }

  goReferencias(index: number): void {
    this.router.navigate(['carga-asientos/referencias-complementarias', index]);
  }

  goCombinacion(index: number): void {
    this.dialog.open(CombinacionContableComponent, {
      width: '80%',
      maxWidth: '600px',
      data: index,
    });
  }

}
