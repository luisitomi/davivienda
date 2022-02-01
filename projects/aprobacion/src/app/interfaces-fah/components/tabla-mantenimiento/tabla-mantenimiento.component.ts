import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Valor } from '../../models/valor.model';

@Component({
  selector: 'app-tabla-mantenimiento',
  templateUrl: './tabla-mantenimiento.component.html',
  styleUrls: ['./tabla-mantenimiento.component.scss']
})
export class TablaMantenimientoComponent implements OnInit, OnChanges {

  @Input() valores: MatTableDataSource<Valor> = new MatTableDataSource();
  @Output() nuevo = new EventEmitter<boolean>();
  @Output() eliminar = new EventEmitter<Valor>();
  @Output() guardar = new EventEmitter<Valor[]>();

  selected: Valor | null = null;

  noHayCambios: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selected = null;
  }

  onNuevo(): void {
    this.nuevo.emit(true);
  }

  onEliminar(): void {
    this.eliminar.emit(this.selected!!);
  }

  onGuardar(): void {
    this.guardar.emit(this.valores.data.filter(v => v.nombre !== v.oldNombre));
  }

  cambioValor(): void {
    this.noHayCambios = this.valores.data.filter(v => v.nombre !== v.oldNombre).length === 0;
  }

}
