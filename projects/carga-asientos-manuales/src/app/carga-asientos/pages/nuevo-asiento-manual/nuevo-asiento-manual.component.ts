import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeadboardSeat } from '../../../shared';
import { appConstants } from '../../../shared/component/app-constants/app-constants';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { ManualLading } from '../../../shared/models/manualLoading.model';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss'],
  providers: [DatePipe],
})
export class NuevoAsientoManualComponent implements AfterViewChecked {
  disabledForm = false;
  validateForm = false;
  visibleForm = true;
  validateTable = false;
  visibleTable = false;
  dataHeader: HeadboardSeat;
  lineList: Array<LineaAsientoInsert>;

  constructor(
    private cdRef:ChangeDetectorRef,
    private datePipe: DatePipe,
    private router: Router,
  ) {
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  proceesAutomaty(validate: boolean){
    if(validate){
      this.saveHeadboard();
    }
  }

  dataValidate(data: HeadboardSeat): void {
    if (this.validateForm) {
      this.dataHeader = data;
    }
  }

  processValidate(validate: boolean): void {
    this.validateForm = validate;
  }

  proceesLine(validate: boolean): void {
    this.validateTable = validate;
  }

  saveHeadboard(): void {
    if (this.validateForm) {
      const model = JSON.parse(localStorage.getItem(appConstants.modelSave.NEWSEAT) || '{}');
      if (model?.line) {
        this.lineList = model?.line;
      }
      const header: CabeceraAsientoInsert = {
        Id: 0,
        LegderName: '',
        SourceName: this.dataHeader?.origen,
        TrxNumber: this.dataHeader?.number,
        AccountingDate: this.datePipe.transform(this.dataHeader?.accountingDate, appConstants.eventDate.format) || '',
        Description: this.dataHeader?.description,
        Company: '',
        Usuario: '',
        Period: this.dataHeader?.period,
      }
      const request: ManualLading = {
        header: header,
        line: this.lineList,
      }
      localStorage.removeItem(appConstants.modelSave.NEWSEAT);
      localStorage.setItem(appConstants.modelSave.NEWSEAT,JSON.stringify(request));
      this.visibleForm = false;
      this.visibleTable = true;
      this.validateForm = false;
      this.disabledForm = true;
    }
  }

  send(): void {
    localStorage.removeItem(appConstants.modelSave.NEWSEAT);
    this.router.navigate(['carga-asientos/nuevo-asiento-manual?token=prueb']);
  }
}
