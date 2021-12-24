import { Component } from '@angular/core';
import { HeadboardSeat } from '../../../shared';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss']
})
export class NuevoAsientoManualComponent {
  disabledForm = false;
  validateForm = false;
  visibleForm = true;
  validateTable = false;
  visibleTable = false;
  dataHeader: HeadboardSeat;

  proceesAutomaty(validate: boolean){
    if(validate){
      this.saveHeadboard();
    }
  }

  dataValidate(data: HeadboardSeat){
    if (this.validateForm) {
      this.dataHeader = data;
    }
  }

  processValidate(validate: boolean){
    this.validateForm = validate;
  }

  saveHeadboard(): void {
    if (this.validateForm) {
      const header: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: '',
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: '12/12/2021',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: '',
        Period: this.dataHeader?.period,
      }
      const request: ManualLading = {
        header: header,
      }
      localStorage.removeItem('model');
      localStorage.setItem('model',JSON.stringify(request));
      this.visibleForm = false;
      this.visibleTable = true;
      this.validateForm = false;
      this.disabledForm = true;
    }
  }
}
