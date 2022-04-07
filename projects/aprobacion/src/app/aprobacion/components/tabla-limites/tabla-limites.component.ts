import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { Limite } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
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
  displayedColumns: string[] = ['descripcion', 'empiezaCon', 'importeMaximo', 'nuevoValorFinish', 'estado'];
  spinner = false;
  sinCambios: boolean = true;

  constructor(
    private dialog: MatDialog,
    private limitService: LimitService,
    private toastr: ToastrService,
  ) {
    super();
  }

  grabar(): void {
    let total = 0;
    const countModifi = this.limites.filter(l =>
      l.codigo !== l.codigoNew ||
      Number(l.nuevoValorNew) !== Number(l.nuevoValor) ||
      Number(l.importeMaximo) !== Number(l.importeMaximoNew)).length;
    if (!this.sinCambios) {
      this.spinner = true;
      this.limites.forEach((element: any, index: number) => {
        if (Number(element.importeMaximoNew) !== Number(element.importeMaximo)) {
          if (this.limites[index - 1]?.nuevoValor === element.nuevoValor) {
            if (Number(this.limites[index - 1]?.importeMaximoNew) >= Number(element.importeMaximoNew)) {
              this.spinner = false;
              this.toastr.warning('No puede agregar un importe menor al registro anterior', 'Adevertencia');
              return;
            }
          }
          if (this.limites[index + 1]?.nuevoValor === element.nuevoValor) {
            if (Number(this.limites[index + 1]?.importeMaximoNew) <= Number(element.importeMaximoNew)) {
              this.spinner = false;
              this.toastr.warning('No puede agregar un importe mayor al registro posterior', 'Adevertencia');
              return;
            }
          }
          const request = {
            Id: element?.id,
            Descripcion: element?.codigoNew,
            Valor: element?.nuevoValorNew,
            ValorFinal: element?.importeMaximoNew,
            Usuario: '',
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

  onCambio(): void {
    this.sinCambios = this.limites.filter(l =>
      l.codigo !== l.codigoNew ||
      Number(l.nuevoValorNew) !== Number(l.nuevoValor) ||
      Number(l.importeMaximo) !== Number(l.importeMaximoNew)).length === 0;
  }

  onChange(id: number): void {
    this.spinner = true;
    const $status = this.limitService
      .ChangeStatus(id)
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

  addNewRegister(event: any): void {
    if (event?.srcElement.tagName == "MAT-ICON") {
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
}
