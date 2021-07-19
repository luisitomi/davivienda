import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { InfoletOrigen } from 'src/app/shared';

@Component({
  selector: 'app-infolet-origen',
  templateUrl: './infolet-origen.component.html',
  styleUrls: ['./infolet-origen.component.scss']
})
export class InfoletOrigenComponent implements OnInit, OnDestroy {

  infolet?: InfoletOrigen;

  getInfoletSub?: Subscription;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getInfoletSub = this.dashboardService.getInfoletOrigen().subscribe(
      data => this.infolet = data,
    );
  }

  ngOnDestroy(): void {
    this.getInfoletSub?.unsubscribe();
  }

}
