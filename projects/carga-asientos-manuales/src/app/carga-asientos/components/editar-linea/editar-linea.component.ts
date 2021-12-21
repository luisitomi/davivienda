import { ElementRef, ViewChild } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineaAsientoInsert } from '../../../shared/models/linea-asiento-insert.model';
import { TipoLinea } from '../../enums/tipo-linea.enum';
import { Linea } from '../../models/linea.model';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-editar-linea',
  templateUrl: './editar-linea.component.html',
  styleUrls: ['./editar-linea.component.scss']
})
export class EditarLineaComponent {

  @ViewChild('debitoControl') debitoElementRef?: ElementRef;
  @ViewChild('creditoControl') creditoElementRef?: ElementRef;

  editarLineaForm = new FormGroup({
    index: new FormControl(0),
    moneda: new FormControl('COP', Validators.required),
    tipo: new FormControl(),
    debito: new FormControl(0),
    credito: new FormControl(0),
  });

  monedaOptions: string[] = ['COP', 'USD'];

  tipoOptions = TipoLinea;

  constructor(
    public dialogRef: MatDialogRef<EditarLineaComponent>,
    @Inject(MAT_DIALOG_DATA) public linea: Linea,
    private asientoManualService: AsientoManualService,
  ) {
    if (this.linea !== null) {
      debugger;
      if (this.linea.credito == undefined){
        this.linea.credito = 0;
      }
      if (this.linea.debito == undefined){
        this.linea.debito = 0;
      }
      let { columnasReferenciales, combinacionContable, ...linea } = this.linea;
    
      this.editarLineaForm.setValue(linea);
    //  this.editarLineaForm.setValue({index: linea.index, moneda: linea.moneda, tipo: linea.tipoComprobante});
    }
  }
  ngOnInit(){
    console.log(this.editarLineaForm.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveLinea(linea: Linea): void {

    let lineaAsiento = new LineaAsientoInsert();
    lineaAsiento.Id = this.asientoManualService.getIdCabecera();
    lineaAsiento.nroLinea= linea.index;

  lineaAsiento.SegGlAccount= linea.cuentaContable;
  lineaAsiento.SegOficina= linea.oficina;
  lineaAsiento.SegSucursal= linea.proyecto;
  lineaAsiento.SegProyecto= linea.proyecto;
  lineaAsiento.SegSubProyecto= linea.subproyecto;
  lineaAsiento.SegTipoComprobante= linea.tipoComprobante;
  lineaAsiento.SegIntecompany= linea.intecompania;
  lineaAsiento.SegVinculado= linea.vinculado;
  lineaAsiento.SegF1= linea.futuro1;
  lineaAsiento.SegF2= linea.futuro2;
  lineaAsiento.SegCurrency= linea.moneda;
  lineaAsiento.EnteredDebit= (linea.debito == null ? "" : linea.debito.toString() );
  lineaAsiento.EnteredCredit= (linea.credito == null ? "" : linea.credito.toString() );
  lineaAsiento.Description= "";
  lineaAsiento.Usuario= "";

    this.asientoManualService.grabarAsientoLinea(lineaAsiento).subscribe(res => {
      console.log(res)
    });
  }
  onSave(): void {
    
    console.log(this.editarLineaForm.value);
    if (this.linea === null) {
      this.asientoManualService.addLinea({ ...this.editarLineaForm.value, columnasReferenciales: [], combinacionContable: undefined });
    } else {
      this.asientoManualService.editLinea({ ...this.editarLineaForm.value, columnasReferenciales: this.linea.columnasReferenciales, combinacionContable: this.linea.combinacionContable });
    }

    this.onSaveLinea(this.editarLineaForm.value);
    this.dialogRef.close();
  }

  cambiarTipo(tipo: string): void {
    let debito = this.editarLineaForm.controls.debito;
    let credito = this.editarLineaForm.controls.credito;

    setTimeout(() => {
      if (tipo === this.tipoOptions.Debito) {
        debito.enable();
        credito.disable();
        this.editarLineaForm.patchValue({ credito: null });
        this.debitoElementRef?.nativeElement.focus();
      }

      if (tipo === this.tipoOptions.Credito) {
        debito.disable();
        credito.enable();
        this.editarLineaForm.patchValue({ debito: null });
        this.creditoElementRef?.nativeElement.focus();
      }
    });

  }

}
