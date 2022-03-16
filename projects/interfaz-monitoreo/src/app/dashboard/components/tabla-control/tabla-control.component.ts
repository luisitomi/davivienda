import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../core/services/auth.service';
import { CargasService } from '../../../core/services/cargas.service';
import { Carga } from '../../../shared';


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
 // dataSource= new MatTableDataSource<Carga>(this.cargas);
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(
    private cargasService: CargasService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    
  //  this.dataSource = new MatTableDataSource<Carga>(this.cargas);
  //  this.dataSource.paginator = this.paginator;
  }

  clickVer(cargaId: number): void {
    this.mostrarDetalle.emit(cargaId);
  }

  refrescar() {
    this.cargasService.postTsFahActualizarEstadosJobMonitoreoCargasWS(this.authService.getUsuarioV2()).subscribe( rest=>{
      this.snackBar.open('Se comenzó a validar los estados de los procesos de trabajo.')
      this.filtrarDatos.emit(true);
    } );
    


  }

}
