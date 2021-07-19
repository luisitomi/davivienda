import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Linea } from 'src/app/shared';
import { AsientoManualService } from '../../services/asiento-manual.service';
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
  ) { }

  ngOnInit(): void {
    this.getLineasSub = this.asientoManualService.getLineas().subscribe(
      lineas => this.lineas.data = lineas,
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

}
