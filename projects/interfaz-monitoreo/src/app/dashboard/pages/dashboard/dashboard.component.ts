import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Infolet } from '../../../shared';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  infolets: Infolet[] = [];

  getInfoletsSub?: Subscription;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getInfoletsSub = this.dashboardService.getInfolets('COBIS').subscribe(
      infolets => this.infolets = infolets,
    );
  }

  ngOnDestroy(): void {
    this.getInfoletsSub?.unsubscribe();
  }

}
