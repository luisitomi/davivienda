import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { Limite } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { NewLimitComponent } from '../new-limit/new-limit.component';

@Component({
  selector: 'app-tabla-limites',
  templateUrl: './tabla-limites.component.html',
  styleUrls: ['./tabla-limites.component.scss']
})
export class TablaLimitesComponent extends UnsubcribeOnDestroy {
  @Output() updateLis = new EventEmitter<boolean>();
  @Input() limites: Limite[];
  @Input() loading: boolean = false;
  displayedColumns: string[] = ['descripcion', 'empiezaCon', 'importeMaximo', 'nuevoValorFinish', 'Informativo','estado'];
  spinner = false;
  sinCambios: boolean = true;
  flInformativoAll: boolean = false;
  

  constructor(
    private dialog: MatDialog,
    private limitService: LimitService,
    private toastr: ToastrService,
  ) {
    super();
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

  tranformerTwoDecimal(value: number): string {
    return Number(value * 1.00)?.toFixed(2);
  }

  grabar(): void {
    let total = 0;
    console.log(this.limites)
    const countModifi = this.limites.filter(l =>
      l.estado === 0 && (
        l.codigo !== l.codigoNew ||
        Number(l.nuevoValorNew) !== Number(l.nuevoValor) ||
        Number(l.importeMaximo) !== Number(l.importeMaximoNew))).length;
    if (!this.sinCambios) {
      this.spinner = true;
      this.limites.forEach((element: any, index: number) => {

        if (Number(element.importeMaximoNew) !== Number(element.importeMaximo) || element.flMensajeInformativo != element.flMensajeInformativoOld) {
          if (Number(this.limites[index - 1]?.importeMaximoNew) >= Number(element.importeMaximoNew) &&
            element?.nuevoValor === this.limites[index - 1]?.nuevoValor) {
            this.spinner = false;
            this.toastr.warning('No puede agregar un importe menor al registro anterior', 'Adevertencia');
            return;
          }
          if (Number(this.limites[index + 1]?.importeMaximoNew) <= Number(element.importeMaximoNew) &&
            element?.nuevoValor === this.limites[index + 1]?.nuevoValor) {
            this.spinner = false;
            this.toastr.warning('No puede agregar un importe mayor al registro posterior', 'Adevertencia');
            return;
          }

          const request = {
            Id: element?.id,
            Descripcion: element?.codigoNew,
            Valor: element?.nuevoValorNew,
            ValorFinal: element?.importeMaximoNew,
            Usuario: '',
            FlInformativo:element.flMensajeInformativo
          }
          const $edit = this.limitService
            .EditLimit(request)
            .pipe(finalize(() => this.spinner = false))
            .subscribe(
              (response) => {
                if (response?.status === appConstants.responseStatus.OK && (Number(total) + 1 === Number(countModifi))) {
                  this.dialog.open(ConfirmationComponent, {
                    width: '80%',
                    maxWidth: '400px',
                    data: { name: 'Se procesaron los cambios correctamente' },
                    panelClass: 'my-dialog',
                  });
                  this.updateLis.emit(true);
                  this.sinCambios = true;
                }
                total += total + 1;
              }
            )
          this.arrayToDestroy.push($edit);
        }
      });
    }
  }

  onCambio(event: any, index: number): void {
    this.limites[index].importeMaximoNew = Number(event?.target?.value?.replace(/,/g, ""))
    this.sinCambios = this.limites.filter(l =>
      l.estado === 0 && (
        l.codigo !== l.codigoNew ||
        (l.nuevoValorNew) !== (l.nuevoValor) ||
        (l.importeMaximo) !== (l.importeMaximoNew))).length === 0;
  }

  onChange(data: any, index: number): void {
    /*if(data?.estado === 1){
      if ((this.limites[index - 1]?.estado || 0) === 0){
        if (this.limites[index - 1]?.nuevoValor === data?.nuevoValor) {
          if (Number(this.limites[index - 1]?.importeMaximoNew) >= Number(data?.importeMaximoNew)) {
            this.spinner = false;
            this.toastr.warning('No puede agregar un importe menor al registro anterior', 'Adevertencia');
            return;
          }
        }
        if (this.limites[index + 1]?.nuevoValor === data?.nuevoValor) {
          if (Number(this.limites[index + 1]?.importeMaximoNew) <= Number(data?.importeMaximoNew)) {
            this.spinner = false;
            this.toastr.warning('No puede agregar un importe mayor al registro posterior', 'Adevertencia');
            return;
          }
        }
      }
    }*/
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '80%',
      maxWidth: '400px',
      data: { name: `¿Esta seguro que desea eliminar el registro` },
      panelClass: 'my-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.spinner = true;
        const $status = this.limitService
          .ChangeStatus(data?.id)
          .pipe(finalize(() => this.spinner = false))
          .subscribe(
            (response: any) => {
              if (response?.status === appConstants.responseStatus.OK) {
                this.toastr.success(response?.mensaje, 'Actualizado');
                this.updateLis.emit(true);
              }
            }
          )
        this.arrayToDestroy.push($status);
      }
    });
  }

  addNewRegister(event: any): void {
    if (event?.srcElement?.tagName == "MAT-ICON") {
      const dialogRef = this.dialog.open(NewLimitComponent, {
        width: '80%',
        maxWidth: '400px',
        data: null,
        panelClass: 'my-dialog',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result?.Descripcion) {
          this.updateLis.emit(true);
        }
      });
    }
  }

  
  /* JJGP 2022 09 07 */ 
  seleccionarTodosMI() {
    this.sinCambios = false;
    if (this.flInformativoAll) {
      this.limites.forEach((element: any, index: number) => {
        this.limites[index].flMensajeInformativo ='N';
        this.flInformativoAll = false;
      });
    } else{
      this.limites.forEach((element: any, index: number) => {
        this.limites[index].flMensajeInformativo ='Y';
        this.flInformativoAll = true;
      });
    }
    
    
  }
  validarCheckedMI(object : Limite) {
    if (object?.flMensajeInformativo != null && object?.flMensajeInformativo == 'Y') {
      return true;
    }
    return false;
  }
  selectEnviarInformativo(object : Limite) {
    this.sinCambios = false;
    this.limites.forEach((element: any, index: number) => {
      if (element.id == object.id) {
        this.limites[index].flMensajeInformativo = ( (this.limites[index].flMensajeInformativo != null && this.limites[index].flMensajeInformativo == 'Y' )? 'N': 'Y');
      }
    });
  }
}

