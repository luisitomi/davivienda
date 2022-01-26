import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { Limite } from '../../models/limite.model';
import { LimitService } from '../../services/limit.service';

@Component({
  selector: 'app-tabla-limites',
  templateUrl: './tabla-limites.component.html',
  styleUrls: ['./tabla-limites.component.scss']
})
export class TablaLimitesComponent extends UnsubcribeOnDestroy {
  @Output() updateLis = new EventEmitter<boolean>();
  @Input() limites: Limite[];
  @Input() loading: boolean = false;
  displayedColumns: string[] = ['descripcion', 'empiezaCon', 'importeMaximo', 'nuevoValor', 'estado'];
  spinner  = false;

  constructor(
    private limitService: LimitService,
    private toastr: ToastrService,
  ) {
    super();
  }

  grabar(): void {

  }

  onCambio(): void {
    
  }

  onChange(id: number): void {
    this.spinner = true;
    const $status = this.limitService
      .ChangeStatus(id)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          if(response?.status === appConstants.responseStatus.OK) {
            this.toastr.success('Actualizado', response?.message);
            this.updateLis.emit(true);
          }
        }
      )
    this.arrayToDestroy.push($status);
  }
}
