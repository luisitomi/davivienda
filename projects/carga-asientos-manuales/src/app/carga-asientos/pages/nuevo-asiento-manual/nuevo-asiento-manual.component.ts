import { Component, OnInit } from '@angular/core';
import { CabeceraAsiento } from '../../../shared';
import { CabeceraAsientoInsert } from '../../../shared/models/cabecera-asiento-insert.model';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-nuevo-asiento-manual',
  templateUrl: './nuevo-asiento-manual.component.html',
  styleUrls: ['./nuevo-asiento-manual.component.scss']
})
export class NuevoAsientoManualComponent implements OnInit {

  constructor(private asientoManualService: AsientoManualService,) { }

  ngOnInit(): void {
  }


  SaveCabeceraAsiento(cabeceraAsiento : CabeceraAsiento){
    let header = new CabeceraAsientoInsert();
    header.LegderName="";
    header.SourceName=cabeceraAsiento.origen;
    header.TrxNumber=cabeceraAsiento.numero;
    header.AccountingDate="";
    header.Description=cabeceraAsiento.descripcion;
    header.Usuario="";

    if (cabeceraAsiento.fechaContable != null) {
      let day = cabeceraAsiento.fechaContable.getDate();
      let month = cabeceraAsiento.fechaContable.getMonth() + 1;
      let year = cabeceraAsiento.fechaContable.getFullYear();

      if (month < 10) {
        header.AccountingDate = `${day}/0${month}/${year}`;
      } else {
        header.AccountingDate = `${day}/${month}/${year}`;
      }
    } else {
      header.AccountingDate = "";
    }

    console.log('cabeceraAsiento')
    this.asientoManualService.grabarAsientoCabecera(header).subscribe(res => {
      if (res.status == 'OK') {
        this.asientoManualService.setIdCabecera(res.Id);
        
      } else {

      }
  });
 console.log(cabeceraAsiento)
  }

}
