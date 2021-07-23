import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { OrigenService } from 'src/app/core/services/origen.service';
import { AsientoManualService } from '../../services/asiento-manual.service';

@Component({
  selector: 'app-formulario-cabecera',
  templateUrl: './formulario-cabecera.component.html',
  styleUrls: ['./formulario-cabecera.component.scss']
})
export class FormularioCabeceraComponent implements OnInit, OnDestroy {

  cabeceraForm = new FormGroup({
    origen: new FormControl('', Validators.required),
    periodoContable: new FormControl(null, Validators.required),
    numero: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaContable: new FormControl(null, Validators.required),
  });

  getCabeceraSub?: Subscription;

  hayLineas: boolean = false;

  getHayLineasSub?: Subscription;

  origenOptions: string[] = [];

  getOrigenSub?: Subscription;

  constructor(
    private asientoManualService: AsientoManualService,
    private origenService: OrigenService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getOrigenSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
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
  }

  save(): void {
    this.asientoManualService.grabarAsiento().subscribe(
      res => {
        this.snackBar.open('Asiento registrado', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.asientoManualService.clear();
        this.router.navigate(['/dashboard/infolet']);
      },
    );
  }

}
