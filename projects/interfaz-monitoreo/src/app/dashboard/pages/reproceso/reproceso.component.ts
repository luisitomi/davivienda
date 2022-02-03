import { Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CargasService } from '../../../core/services/cargas.service';
import { NavigationService } from '../../../core/services/navigation.service';
import { Carga, Reversado } from '../../../shared';


@Component({
  selector: 'app-reproceso',
  templateUrl: './reproceso.component.html',
  styleUrls: ['./reproceso.component.scss']
})
export class ReprocesoComponent implements OnInit, OnDestroy {
  cargaId: number = 0;

  elemento: string | undefined;
  carga: Carga | undefined;
  origen: string | undefined;
  tipoArchivo: string | undefined;

  getCargaByIdSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cargasService: CargasService,
    private snackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.cargaId = Number(routeParams.get('id'));
  
    this.elemento = routeParams.get('elemento') || undefined;

    this.origen = routeParams.get('origen') || undefined;

    if (this.elemento == 'cabeceras') {
      this.tipoArchivo = 'HEADER'
    } else if (this.elemento == 'lineas') {
      this.tipoArchivo = 'LINE' 
    }
    this.getCargaByIdSub = this.cargasService.getCargaById(this.cargaId).subscribe(
      carga => {
        this.carga = carga;
        
        if (this.carga?.reversado !== Reversado.Si) {
          this.snackBar.open('Archivo original no ha sido reversado', 'Aceptar', {
            duration: -1,
          });
        }
      },
    );
    console.log(this.elemento )
  }


  

  ngOnDestroy(): void {
    this.getCargaByIdSub?.unsubscribe();
  }

  volver(): void {
    this.router.navigate(['/dashboard/controlymonitoreo'], {queryParams: { origen:this.carga?.origen, carga: this.carga?.id }});
  /* this.navigationService.getPreviousUrl().subscribe( url => {
    const carga = `${url.includes('?') ? '&' : '?'}carga=${this.cargaId}`;
                console.log('url + carga:' +url + carga)
                this.router.navigateByUrl(url + carga);
    }); */

    //this.location.back();
  }

}
