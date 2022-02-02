import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Interfaz } from '../../models/interfaz.model';

@Component({
  selector: 'app-tabla-interfaces',
  templateUrl: './tabla-interfaces.component.html',
  styleUrls: ['./tabla-interfaces.component.scss']
})
export class TablaInterfacesComponent implements OnInit {

  @Input() interfaces: Interfaz[] = [];
  @Input() loading: boolean = false;
  @Output() actualizar = new EventEmitter<Interfaz[]>();
  @Output() nuevo = new EventEmitter<boolean>();
  @Output() eliminar = new EventEmitter<Interfaz>();

  @Input() estados: string[] = [];
  @Input() tiempos: string[] = [];

  noHayCambios: boolean = true;

  displayedColumns: string[] = ['numeracion', 'nombre', 'descripcion', 'estado', 'periodicidad'];

  selected: Interfaz | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onGuardar(): void {
    this.actualizar.emit(this.interfaces.filter(i => i.estado !== i.oldEstado || i.periodicidad !== i.oldPeriodo));
  }

  onChange(): void {
    this.noHayCambios = this.interfaces.filter(i => i.estado !== i.oldEstado || i.periodicidad !== i.oldPeriodo).length === 0;
  }

  onNuevo(): void {
    this.nuevo.emit(true);
  }

  onEliminar(): void {
    this.eliminar.emit(this.selected!!);
  }

}
