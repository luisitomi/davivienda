import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { Asiento } from '../../../shared';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { LimitService } from '../../services/limit.service';

@Component({
  selector: 'app-tabla-asientos',
  templateUrl: './tabla-asientos.component.html',
  styleUrls: ['./tabla-asientos.component.scss']
})
export class TablaAsientosComponent extends UnsubcribeOnDestroy implements OnChanges {

  @Input() asientos: Asiento[] = [];
  @Input() loading: boolean = false;
  queryParams: any;
  @Output() aprobar = new EventEmitter<Asiento[]>();
  @Output() rechazar = new EventEmitter<Asiento[]>();
  spinner = false;
  displayedColumns: string[] = ['seleccion', 'fechaCarga', 'usuario', 'comprobante', 'fechaContable', 'descripcion', 'cargos', 'abonos', 'estado', 'acciones'];
  nombreUsuario: string;
  selection = new SelectionModel<Asiento>(true, []);
  aprobador = false;
  preparador = false;
  trabajo = false;

  constructor(
    private router: Router,
    private limitService: LimitService,
    private authService: AuthService,
  ) {
    super();
    this.authService.getUsuarioV2().subscribe(rpta => this.nombreUsuario = rpta || '');
  }

  ngOnChanges(): void {
    this.selection.clear();
    this.getByRolUser();
  }

  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                  .pipe(finalize(() => this.spinner = false))
                  .subscribe(
                    (response: any) => {
                      this.aprobador = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR');
                      this.preparador = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_PREPARADOR');
                      this.trabajo = response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_TRABAJO');
                    }
                  )
    this.arrayToDestroy.push($rol);
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
