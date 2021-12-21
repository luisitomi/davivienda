import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CombinacionContable } from '../../models/combinacion-contable.model';
import { AsientoManualService } from '../../services/asiento-manual.service';
import { CombinacionContableService } from '../../services/combinacion-contable.service';

@Component({
  selector: 'app-combinacion-contable',
  templateUrl: './combinacion-contable.component.html',
  styleUrls: ['./combinacion-contable.component.scss']
})
export class CombinacionContableComponent implements OnInit, OnDestroy {

  combinacionForm = new FormGroup({
    comp1: new FormControl(null, [Validators.required]),
    comp2: new FormControl(null, [Validators.required]),
    comp3: new FormControl(null, [Validators.required]),
    comp4: new FormControl(null, [Validators.required]),
    comp5: new FormControl(null, [Validators.required]),
    comp6: new FormControl(null, [Validators.required]),
    comp7: new FormControl(null, [Validators.required]),
    comp8: new FormControl(null, [Validators.required]),
    comp9: new FormControl(null, [Validators.required]),
    comp10: new FormControl(null, [Validators.required]),
    comp11: new FormControl(null, [Validators.required]),
  });

  private getCombinacionSub?: Subscription;

  parte1Options: string[] = [];
  parte2Options: string[] = [];
  parte3Options: string[] = [];
  parte4Options: string[] = [];
  parte5Options: string[] = [];
  parte6Options: string[] = [];
  parte7Options: string[] = [];
  parte8Options: string[] = [];
  parte9Options: string[] = [];
  parte10Options: string[] = [];
  parte11Options: string[] = [];

  getParte1Sub?: Subscription;
  getParte2Sub?: Subscription;
  getParte3Sub?: Subscription;
  getParte4Sub?: Subscription;
  getParte5Sub?: Subscription;
  getParte6Sub?: Subscription;
  getParte7Sub?: Subscription;
  getParte8Sub?: Subscription;
  getParte9Sub?: Subscription;
  getParte10Sub?: Subscription;
  getParte11Sub?: Subscription;

  constructor(
    private dialogRef: MatDialogRef<CombinacionContableComponent>,
    @Inject(MAT_DIALOG_DATA) private index: number,
    private asientoManualService: AsientoManualService,
    private combinacionContableService: CombinacionContableService,
  ) {
  }

  ngOnInit(): void {
    this.getParte1Sub = this.combinacionContableService.getParte1().subscribe(
      parte1 => this.parte1Options = parte1,
    );
    this.getParte2Sub = this.combinacionContableService.getParte2().subscribe(
      parte2 => this.parte2Options = parte2,
    );
    this.getParte3Sub = this.combinacionContableService.getParte3().subscribe(
      parte3 => this.parte3Options = parte3,
    );
    this.getParte4Sub = this.combinacionContableService.getParte4().subscribe(
      parte4 => this.parte4Options = parte4,
    );
    this.getParte5Sub = this.combinacionContableService.getParte5().subscribe(
      parte5 => this.parte5Options = parte5,
    );
    this.getParte6Sub = this.combinacionContableService.getParte6().subscribe(
      parte6 => this.parte6Options = parte6,
    );
    this.getParte7Sub = this.combinacionContableService.getParte7().subscribe(
      parte7 => this.parte7Options = parte7,
    );
    this.getParte8Sub = this.combinacionContableService.getParte8().subscribe(
      parte8 => this.parte8Options = parte8,
    );
    this.getParte9Sub = this.combinacionContableService.getParte9().subscribe(
      parte9 => this.parte9Options = parte9,
    );
    this.getParte10Sub = this.combinacionContableService.getParte10().subscribe(
      parte10 => this.parte10Options = parte10,
    );
    this.getParte11Sub = this.combinacionContableService.getParte11().subscribe(
      parte11 => this.parte11Options = parte11,
    );

    this.getCombinacionSub = this.asientoManualService.getCombinacionContable(this.index).subscribe(
      combinacionContable => combinacionContable ? this.combinacionForm.setValue(this.splitComCon(combinacionContable)) : null,
    );
  }

  ngOnDestroy(): void {
    this.getCombinacionSub?.unsubscribe();
    this.getParte1Sub?.unsubscribe();
  }

  setCombinacionContable(): void {
    const combinacion: string = Object.values(this.combinacionForm.value).join('-');
    this.asientoManualService.setCombinacionContable(this.index, combinacion);
    this.dialogRef.close();
  }

  splitComCon(combinacion: string): CombinacionContable {
    const items = combinacion.split('-');
    const comb = items.reduce((acc, cur) => ({ ...acc, ['comp' + (Object.keys(acc).length + 1)]: cur }), {} as CombinacionContable);
    console.log(comb);
    return comb;
  }
}
