import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { InfoletService } from '../../../core/services/infolet.service';


import { OrigenService } from '../../../core/services/origen.service';
import { Infolet, Origen } from '../../../shared';

@Component({
  selector: 'app-infolet-origen',
  templateUrl: './infolet-origen.component.html',
  styleUrls: ['./infolet-origen.component.scss']
})
export class InfoletOrigenComponent implements OnInit, OnDestroy {

  title: string = '';

  @Input() infolet?: Infolet;
  filterForm = new FormGroup({
    origen: new FormControl(this.infolet?.origen)
  });
  getTokenSub?: Subscription;
  origenOptions: Origen[] = [];
  getOrigenesSub?: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private origenService: OrigenService,
    private infoletService: InfoletService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.infolet?.origen !== null ) {
      this.filterForm.controls['origen'].setValue(this.infolet?.origen);
    }
  
    this.title = this.infolet?.origen !== null ? 'Infolet de Origen' : 'Infolet Global de Integración';

    this.getOrigenesSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    );



 //   this.obtenerInfoletPorOrigen();

  }
  seleccionarOrigen(){
    console.log(this.filterForm.controls['origen'].value)
    this.obtenerInfoletPorOrigen();
  }

  obtenerInfoletPorOrigen(){
    this.infoletService.postInfoletPorOrigen(this.filterForm.controls['origen'].value).subscribe(res => {
      this.infolet = res;
      () => console.log('asdsadds')
    });
  }
  ngOnDestroy(): void {
    this.getTokenSub?.unsubscribe();
  }

  goDetalle(): void {

    this.getTokenSub = this.authService.getToken().subscribe(token => {
   /*
      const url: string = this.router.serializeUrl(this.router.createUrlTree(['/dashboard/controlymonitoreo'], {
        queryParams: { origen: this.infolet?.origenId, token },
      }));*/
      this.router.navigate(['/dashboard/controlymonitoreo'], {queryParams: { origen: this.infolet?.origen, token }});
     // this.router.navigateByUrl(url + carga);
      //window.open(url);
    });
  }

}
