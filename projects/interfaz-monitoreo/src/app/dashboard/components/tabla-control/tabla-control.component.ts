import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../core/services/auth.service';
import { CargasService } from '../../../core/services/cargas.service';
import { Carga } from '../../../shared';
import { FiltroPerfilComponent } from '../filtro-perfil/filtro-perfil.component';


@Component({
  selector: 'app-tabla-control',
  templateUrl: './tabla-control.component.html',
  styleUrls: ['./tabla-control.component.scss']
})
export class TablaControlComponent implements OnInit {

  @Input() cargas: Carga[] = [];

  @Input() loading: boolean = false;

  @Output() mostrarDetalle = new EventEmitter<number>();

  @Output() filtrarDatos = new EventEmitter<boolean>();
  displayedColumns: String[] = [
    'numeracion',
    'fecha',
    'origen',
    'nombreArchivo',
    'estado',
    'reversado',

    'jobImportAccounting',

    'estadoImportingAcc',

    'jobCreateAccounting',

    'estadoAccountingDataset',

    'cantidadH',
    'cantidadL',
    'ultimoProceso',
    'debitoStage',
    'creditoStage',
    'debitoXLA',
    'creditoXLA',
    'debitoGL',
    'creditoGL',
    'acciones',
  ];

  @Input() statusInitial: boolean;

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Carga>([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private cargasService: CargasService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewChecked(): void {
    if (this.cargas.length && this.statusInitial) {
      this.dataSource.data = this.cargas;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.statusInitial = !this.statusInitial;
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    //console.log(this.dataSource.paginator)
  }

  clickVer(cargaId: number): void {
    this.mostrarDetalle.emit(cargaId);
  }

  refrescar() {
    this.cargasService.postTsFahActualizarEstadosJobMonitoreoCargasWS(this.authService.getUsuarioV2()).subscribe(rest => {
      this.snackBar.open('Se comenzó a validar los estados de los procesos de trabajo.')
      this.filtrarDatos.emit(true);
    });
  }

  executeFunctionModal() {
    this.dialog.open(FiltroPerfilComponent, {
      width: '80%',
      maxWidth: '400px',
      data: null,
      panelClass: 'my-dialog',
    });
  }

}
