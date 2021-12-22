import { Component, OnInit } from '@angular/core';
import { HeadboardSeat } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss']
})
export class NuevoAsientoManualComponent extends UnsubcribeOnDestroy implements OnInit {
  disabledForm = false;
  validateForm = false;
  visibleForm = true;
  validateTable = false;
  visibleTable = false;
  dataHeader: HeadboardSeat;
  constructor(private asientoManualService: AsientoManualService) {
    super();
  }

  ngOnInit(): void {
  }

  dataValidate(data: HeadboardSeat){
    if (this.validateForm) {
      this.dataHeader = data;
    }
  }

  processValidate(validate: any){
    this.validateForm = validate;
  }

  saveHeadboard(): void {
    if (this.validateForm) {
      const request: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: '',
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: '12/12/2021',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: '',
      }
      const $Header = this.asientoManualService.grabarAsientoCabecera(request).subscribe(res => {
        if (res.status == appConstants.responseStatus.OK) {
          this.asientoManualService.setIdCabecera(res.Id);
          this.visibleForm = false;
          this.visibleTable = true;
          this.validateForm = false;
          this.disabledForm = true;
        }
      });
      this.arrayToDestroy.push($Header);
    }
  }
}
