import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Infolet } from 'src/app/shared';

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
    this.getInfoletsSub = this.dashboardService.getInfolets().subscribe(
      infolets => this.infolets = infolets,
    );
  }

  ngOnDestroy(): void {
    this.getInfoletsSub?.unsubscribe();
  }

}
