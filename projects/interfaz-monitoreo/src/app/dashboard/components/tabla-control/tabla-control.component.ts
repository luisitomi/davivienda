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
    'fechaCreacionStr',
    'origen',
    'nombreArchivo',
    'estado',
    'reversado',

    'jobImportAccounting',
    'fechaImporAccJob',
    'estadoImportingAcc',

    'jobCreateAccounting',
    'fechaImporJob',
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

    if (this.cargas?.length && this.statusInitial) {
      this.dataSource.data = this.cargas || [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.statusInitial = !this.statusInitial;
    } 
    if (this.cargas == null && this.statusInitial) {

      this.dataSource.data = this.cargas || [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.statusInitial = !this.statusInitial;       
    } 
    /*else {
      this.dataSource.data = [];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.statusInitial = !this.statusInitial;
    }*/
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    //console.log(this.dataSource.paginator)
  }

  transform(number: any):any {
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

  clickVer(cargaId: number): void {
    this.mostrarDetalle.emit(cargaId);
  }

  clickVerLog(Id: number): void {
    this.cargasService.verLogInformation(Id).subscribe(
      (response: any) => {
          const message = response.map(function(elem: any){
            return elem.mensaje;
          }).join("\n");
          const archivo = new Blob([message], { type: 'text/plain' });
          const url = window.URL.createObjectURL(archivo)
          const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement
          a.href = url
          a.download = "log_process_"+Id+".txt"
          window.document.body.appendChild(a)
          a.click()
          window.document.body.removeChild(a)
          URL.revokeObjectURL(url)
      }
    )
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
      disableClose: true,
    });
  }

  mostrarEstadosEspaniol(estado: string) {
    var estadoEsp = '';
    if(estado == 'SUCCEEDED') {
      estadoEsp = 'Correcto'
    } else if (estado == 'ERROR') {
      estadoEsp = 'Error'
    }else if (estado == 'WARNING') {
      estadoEsp = 'Advertencia'
    } else {
      estadoEsp = ''
    }
    return estadoEsp;
  }

}
