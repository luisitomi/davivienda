import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { InfoletGlobal } from 'src/app/shared';

@Component({
  selector: 'app-infolet-global',
  templateUrl: './infolet-global.component.html',
  styleUrls: ['./infolet-global.component.scss']
})
export class InfoletGlobalComponent implements OnInit, OnDestroy {

  infolet?: InfoletGlobal;

  getInfoletSub?: Subscription;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getInfoletSub = this.dashboardService.getInfoletGlobal().subscribe(
      data => this.infolet = data,
    );
  }

  ngOnDestroy(): void {
    this.getInfoletSub?.unsubscribe();
  }

}
