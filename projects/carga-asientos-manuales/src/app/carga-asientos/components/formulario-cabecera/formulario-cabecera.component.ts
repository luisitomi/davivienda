import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrigenService } from '../../../core/services/origen.service';
import { CabeceraAsiento, Origen } from '../../../shared';
import { AsientoManualService } from '../../services/asiento-manual.service';
import { PeriodoContableService } from '../../services/periodo-contable.service';



@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent implements OnInit, OnDestroy {

  cabeceraForm = new FormGroup({
    origen: new FormControl(null, Validators.required),
    periodoContable: new FormControl(null, Validators.required),
    numero: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaContable: new FormControl(null, Validators.required),
  });

  @Output() saveCabeceraAsiento = new EventEmitter<CabeceraAsiento>();
//  @ViewChild(MatExpansionPanel) panel?: MatExpansionPanel;
  getCabeceraSub?: Subscription;

  hayLineas: boolean = false;

  getHayLineasSub?: Subscription;

  origenOptions: Origen[] = [];

  getOrigenSub?: Subscription;

  periodoOptions: string[] = [];
  getPeriodosSub?: Subscription;


  /*INITIAL - BORRAR CANTES*/
  title = "Cabecera";

  constructor(
    private asientoManualService: AsientoManualService,
    private origenService: OrigenService,
    private periodoContableService: PeriodoContableService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getOrigenSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    );

    this.getPeriodosSub = this.periodoContableService.getPeriodos().subscribe(
      periodos => this.periodoOptions = periodos,
    );

    this.getCabeceraSub = this.asientoManualService.getCabecera().pipe(
      take(1),
    ).subscribe(
      cabecera => {
        if (cabecera !== undefined) {
          this.cabeceraForm.setValue(cabecera);
        }
      }
    );

    this.cabeceraForm.valueChanges.subscribe(
      cabecera => this.asientoManualService.setCabecera(cabecera),
    );

    this.getHayLineasSub = this.asientoManualService.hayLineas().subscribe(
      v => this.hayLineas = v,
    );
  }

  ngOnDestroy(): void {
    this.getHayLineasSub?.unsubscribe();
    this.getOrigenSub?.unsubscribe();
    this.getPeriodosSub?.unsubscribe();
  }

  save(): void {
    this.asientoManualService.grabarAsiento().subscribe(
      res => {
        this.snackBar.open('Asiento registrado');
        this.asientoManualService.clear();
        this.router.navigate(['/dashboard/infolet']);
      },
    );
  }

  saveCabecera(): void {
    this.saveCabeceraAsiento.emit(this.cabeceraForm.value);
   // this.panel?.close();
  }
/*
  filter(): void {
    this.filtrarCargas.emit(this.filterForm.value);
    this.panel?.close();
  }
*/
}
