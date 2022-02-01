import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NuevoValorComponent } from '../../components/nuevo-valor/nuevo-valor.component';
import { Lista } from '../../models/lista.model';
import { Valor } from '../../models/valor.model';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-interfaces',
  templateUrl: './mantenimiento-interfaces.component.html',
  styleUrls: ['./mantenimiento-interfaces.component.scss']
})
export class MantenimientoInterfacesComponent implements OnInit, OnDestroy {

  listaForm = new FormGroup({
    lista: new FormControl(),
  });

  listaActual: Lista | null = null;

  listaOptions: Lista[] = [];
  getListasSub?: Subscription;

  valores = new MatTableDataSource<Valor>();
  getValoresSub?: Subscription;
  guardarValoresSub?: Subscription;
  eliminarValorSub?: Subscription;

  constructor(
    private mantenimientoService: MantenimientoService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getListasSub = this.mantenimientoService.getListas().subscribe(
      listas => this.listaOptions = listas,
    );
  }

  ngOnDestroy(): void {
    this.getListasSub?.unsubscribe();
    this.getValoresSub?.unsubscribe();
    this.guardarValoresSub?.unsubscribe();
    this.eliminarValorSub?.unsubscribe();
  }

  buscar(): void {
    this.getValoresSub = this.mantenimientoService.getValores(this.listaForm.value.lista).subscribe(
      valores => {
        this.listaActual = this.listaForm.value.lista;
        this.valores.data = valores;
      },
    );
  }

  guardar(valores: Valor[]): void {
    this.guardarValoresSub = this.mantenimientoService.guardarValores(this.listaActual!!.id, valores).subscribe(
      ok => {
        this.snackBar.open('Valores guardados');
        this.buscar();
      }
    );
  }

  nuevoValor(): void {
    const dialogRef = this.matDialog.open(NuevoValorComponent, {
      width: '80%',
      maxWidth: '600px',
      data: this.listaActual!!
    });

    dialogRef.afterClosed().subscribe(
      result => result === 'creado' ? this.buscar() : null,
    );
  }

  eliminarValor(valor: Valor): void {
    this.eliminarValorSub = this.mantenimientoService.eliminarValor(this.listaActual!!.id, valor).subscribe(
      ok => {
        this.snackBar.open('Valor eliminado');
        this.buscar();
      }
    )
  }

}
