import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Input() loading: boolean = false;
  queryParams: any;
  @Output() aprobar = new EventEmitter<Asiento[]>();
  @Output() rechazar = new EventEmitter<Asiento[]>();
  spinner = false;
  displayedColumns: string[] = ['seleccion', 'fechaCarga', 'usuario', 'comprobante', 'fechaContable', 'descripcion', 'Debito', 'Credito', 'Origen', 'TipoComprobante', 'CantidadLineas','NombrePreparador','HorayFechaPreparador','NombreAprobadorN2','FechayHoraAprobadorN2','NombreAprobadorN3','FechayHoraAprobadorN3','NombreAprobadorN4','FechayHoraAprobadorN4','NombreAprobadorN5','FechayHoraAprobadorN5','MensajeInformativo','Estado','JustificacionRechazo','LimitePolitica', 'acciones'];
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
    this.dataSource.connect().next(this.dataSource.data = this.asientos || [])
    
    this.dataSource.paginator = this.paginator;
  }

  numerTranfors(number: any): string {
    var num = Number(number)?.toFixed(2)
    var numArr = num.split('.')
    // eslint-disable-next-line no-redeclare
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for (var i = 0; i < len; i++) {
        result.push(operateNum[i])
        if (((i + 1) % 3 === 0) && (i !== len - 1)) {
            result.push(',')
        }
    }

    if (dotNum) {
        result.reverse().push('.', ...dotNum)
        return result.join('')
    } else {
        return result.reverse().join('')
    }
  }

  ChangeFormateDate2(oldDate: any): any{
    return new Date(oldDate).getTime() ? new Date(oldDate).toLocaleDateString('en-GB') : oldDate;
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
