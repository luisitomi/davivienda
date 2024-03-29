import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;
  listFilter: any[];
  @Output() filtros = new EventEmitter<any>();
  filtrosForm: FormGroup;
  origenOptions: Array<DropdownItem>;
  usuarioOptions: Array<DropdownItem>;
  spinner: boolean;
  filtrosData: {};
  listEstado: Array<DropdownItem>;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.getExtension();  
  }

  getExtension(): void {
    this.listEstado = new Array<DropdownItem>();
    this.listEstado.push({ label: "Procesando", value: "Procesando" })
    this.listEstado.push({ label: "Finalizado", value: "Finalizado" })
    this.listEstado.push({ label: "Error", value: "Error" })
    this.listEstado.push({ label: "Advertencia", value: "Advertencia" })
  }
  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      NombreReporte: [null, []],
      CodigoReporte: [null, []],
      Estado: ["Procesando", []],
      FechaInicio: [null, []],
      FechaFin: [null, []],
      Id: [0, []],
      CreadoPor: [null, []],
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });
  }

  filtrar(): void {
    this.filtros.emit(this.filtrosForm.value);
    this.panel?.close();
  }

  onFocusOutEvent(control: string) {
    this.filtrosForm.get(`${control}`)?.clearValidators();
    if (!this.filtrosForm.get(`${control}`)?.value) {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    } else {
      this.filtrosForm.get(`${control}`)?.setValidators([
      ]);
    }
    this.filtrosForm.get(`${control}`)?.updateValueAndValidity();
  }

  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }
}
