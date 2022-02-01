import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asiento } from '../../../shared';

@Component({
  selector: 'app-tabla-asientos',
  templateUrl: './tabla-asientos.component.html',
  styleUrls: ['./tabla-asientos.component.scss']
})
export class TablaAsientosComponent implements OnInit, OnChanges {

  @Input() asientos: Asiento[] = [];
  @Input() loading: boolean = false;
  queryParams: any;
  @Output() aprobar = new EventEmitter<Asiento[]>();
  @Output() rechazar = new EventEmitter<Asiento[]>();

  displayedColumns: string[] = ['seleccion', 'fechaCarga', 'usuario', 'comprobante', 'fechaContable', 'descripcion', 'cargos', 'abonos', 'acciones'];

  selection = new SelectionModel<Asiento>(true, []);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.selection.clear();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.asientos.length;

    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.asientos);
  }

  checkboxLabel(asiento?: Asiento): string {
    if (!asiento) {
      return `${this.isAllSelected() ? 'deseleccionar' : 'seleccionar'} todo`;
    }

    return `${this.selection.isSelected(asiento) ? 'deseleccionar' : 'seleccionar'} asiento`;
  }

  onAprobar(): void {
    this.aprobar.emit(this.selection.selected);
  }

  onRechazar(): void {
    this.rechazar.emit(this.selection.selected);

  }

  ver(id: number): void {
    this.router.navigate(['/aprobacion/resumen-asiento', id],
    {
      queryParams: this.queryParams,
      skipLocationChange: false,
      queryParamsHandling: 'merge',
    })
  }

}
