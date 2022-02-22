import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { UnsubcribeOnDestroy } from '../../../shared/component/general/unsubscribe-on-destroy';
import { isEmpty } from '../../../shared/component/helpers/general.helper';
import { DropdownItem } from '../../../shared/component/ui/select/select.model';
import { FiltroReporte } from '../../../shared/models/filtro-reporte.model';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent extends UnsubcribeOnDestroy implements OnInit {
  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;
  listFilter: any[];
  @Output() filtros = new EventEmitter<FiltroReporte>();
  filtrosForm: FormGroup;
  origenOptions: Array<DropdownItem>;
  usuarioOptions: Array<DropdownItem>;
  spinner: boolean;
  filtrosData: {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
    this.filtrar();
  }

  createForm(): void {
    this.filtrosForm = this.formBuilder.group({
      NombreReporte: [null, []],
      CodigoReporte: [null, []],
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    });


  /*  this.filtrosForm = this.formBuilder.group({
      Id: [0, [Validators.required]],
      NombreReporte: [null, [Validators.required]],
      CodigoReporte: [null, [Validators.required]],
      RutaReporte: [null, [Validators.required]],
      RutaSalidaFTPS: [null, [Validators.required]],
      NombreArchivo: [null, [Validators.required]],
      CantidadLinea: [null, [Validators.required]],
      CreadoPor: [null],
      parametros: this.formBuilder.array([this.formBuilder.group({
        IdParam: [0, [Validators.required]],
        NumeroParametro: [1, [Validators.required]],
        NombreParametro: [null, [Validators.required]],
        ValorParametro: [null, [Validators.required]],
        TipoParametro : [null, [Validators.required]],
        Obligatorio : [null, [Validators.required]],
      })])
    });
    this.filtrosForm.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.filtrosForm.invalid);
    }); */
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
  nuevo(){
    this.router.navigate(['/reporte-information/registro']);
  }
  showErrors(control: string): boolean {
    return (
      (this.filtrosForm.controls[control].dirty || this.filtrosForm.controls[control].touched) &&
      !isEmpty(this.filtrosForm.controls[control].errors)
    );
  }
}
