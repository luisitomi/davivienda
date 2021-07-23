import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Limite } from '../../models/limite.model';
import { LimitesService } from '../../services/limites.service';

@Component({
  selector: 'app-configuracion-limites',
  templateUrl: './configuracion-limites.component.html',
  styleUrls: ['./configuracion-limites.component.scss']
})
export class ConfiguracionLimitesComponent implements OnInit, OnDestroy {

  nivelForm = new FormGroup({
    nivel: new FormControl('Automático'),
  });

  nivelOptions: string[] = [];
  getNivelesSub?: Subscription;

  limites: Limite[] = [];
  getLimitesSub?: Subscription;
  cambiarLimitesSub?: Subscription;

  loadingLimites: boolean = false;

  constructor(
    private limitesService: LimitesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getNivelesSub = this.limitesService.getNiveles().subscribe(
      niveles => this.nivelOptions = niveles,
    );

    this.buscar();
  }

  ngOnDestroy(): void {
    this.getNivelesSub?.unsubscribe();
    this.getLimitesSub?.unsubscribe();
  }

  buscar(): void {
    this.loadingLimites = true;
    this.getLimitesSub = this.limitesService.getLimites(this.nivelForm.value).subscribe(
      limites => this.limites = limites,
      error => console.log(error),
      () => this.loadingLimites = false,
    );
  }

  grabar(limites: Limite[]): void {
    this.cambiarLimitesSub = this.limitesService.cambiarLimites(limites).subscribe(
      ok => {
        this.snackBar.open('Límites cambiados', undefined, {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 3000,
        });
        this.buscar();
      },
    );
  }

}
