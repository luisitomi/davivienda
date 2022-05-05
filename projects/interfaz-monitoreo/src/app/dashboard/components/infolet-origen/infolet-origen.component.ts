import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { InfoletService } from '../../../core/services/infolet.service';


import { OrigenService } from '../../../core/services/origen.service';
import { Infolet, Origen } from '../../../shared';
import { UtilServices } from '../general/util.service';

@Component({
  selector: 'app-infolet-origen',
  templateUrl: './infolet-origen.component.html',
  styleUrls: ['./infolet-origen.component.scss']
})
export class InfoletOrigenComponent implements OnInit, OnDestroy {

  title: string = '';
  origen: string = '';

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
    private route: ActivatedRoute,
    private utilServices: UtilServices,
    
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.origen = String(routeParams.get('origen'));
    //this.utilServices.setTextValue('Infolet');
    if (this.infolet?.origen !== null &&  this.infolet?.origen !== undefined) {
      this.filterForm.controls['origen'].setValue(this.infolet?.origen);
    }
  
    this.title = this.infolet?.origen !== null ? 'Infolet de Origen' : 'Infolet Global de Integración';
/*  
    this.getOrigenesSub = this.origenService.getOrigenes().subscribe(
      origenes => this.origenOptions = origenes,
    ); */



 //   this.obtenerInfoletPorOrigen();

  }
  seleccionarOrigen(){
    this.obtenerInfoletPorOrigen();
  }

  obtenerInfoletPorOrigen(){
    this.infoletService.postInfoletPorOrigen(this.filterForm.controls['origen'].value).subscribe(res => {
      this.infolet = res;
      () => {
        
      }
    });
  }
  ngOnDestroy(): void {
    this.getTokenSub?.unsubscribe();
  }

  numerTranfors(number: any): string {
    var num = Number(number)?.toFixed(2)
    var numArr = num.split('.')
    // eslint-disable-next-line no-redeclare
    var [num, dotNum] = numArr


    var operateNum = num.split('').reverse()
    var result = [], len = operateNum.length
    for (var i = 0; i < len; i++) {
        result.push(operateNum[i])
        if (((i + 1) % 3 === 0) && (i !== len - 1)) {
            result.push(',')
        }
    }

    if (dotNum) {
        result.reverse().push('.', ...dotNum)
        return result.join('')
    } else {
        return result.reverse().join('')
    }
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
