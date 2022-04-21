import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
export class TablaAsientosComponent extends UnsubcribeOnDestroy implements OnChanges, OnInit {

  @Input() asientos: Asiento[] = [];
  @Input() loading: boolean = false;
  queryParams: any;
  @Output() aprobar = new EventEmitter<Asiento[]>();
  @Output() rechazar = new EventEmitter<Asiento[]>();
  spinner = false;
  displayedColumns: string[] = ['seleccion', 'fechaCarga', 'usuario', 'comprobante', 'fechaContable', 'descripcion', 'cargos', 'abonos', 'cargosTotal', 'abonosTotal', 'estado', 'acciones'];
  nombreUsuario: string;
  selection = new SelectionModel<any>(true, []);
  aprobador = false;
  preparador = false;
  trabajo = false;

  constructor(
    private router: Router,
    private limitService: LimitService,
    private authService: AuthService,
  ) {
    super();
  }
  
  ngOnInit(): void {    
    this.authService.getUsuarioV2().subscribe(
      (nombre) => 
      {
        this.nombreUsuario = nombre || ''
      }
    );
    this.getByRolUser();
  }

  ngOnChanges(): void {
    this.selection.clear();
  } 

  ChangeFormateDate2(oldDate: any): any{
    var p = oldDate.split(/\D/g)
    return [p[2],p[1],p[0] ].join("/")
  }

  getByRolUser(): void {
    this.spinner = true;
    const $rol = this.limitService
                  .getByIdRol(this.nombreUsuario)
                  .pipe(finalize(() => this.spinner = false))
                  .subscribe(
                    (response: any) => {
                      this.aprobador = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_APROBADOR'));
                      this.preparador = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_PREPARADOR'));
                      this.trabajo = Boolean(response?.find((p: any) => p.nombre_comun_rol === 'DAV_FAH_ROL_DE_TRABAJO'));
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

  ver(id: number, cuenta: string): void {
    this.router.navigate(['/aprobacion/resumen-asiento', id, cuenta],
    {
      queryParams: this.queryParams,
      skipLocationChange: false,
      queryParamsHandling: 'merge',
    })
  }

}
