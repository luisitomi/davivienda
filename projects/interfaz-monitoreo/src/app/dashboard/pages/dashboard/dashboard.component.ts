import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Infolet } from '../../../shared';
import { UtilServices } from '../../components/general/util.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  infolets: Infolet[] = [];
  origen: string;
  getInfoletsSub?: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilServices: UtilServices,
    private cdRef:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.utilServices.setTextValue('Infolet');
    this.origen = this.route.snapshot.queryParams.origen ;
   // const routeParams = this.route.snapshot.paramMap;
    //this.origen = String(routeParams.get('origen'));
  
    this.getInfoletsSub = this.dashboardService.getInfolets(this.origen).subscribe(
      infolets => this.infolets = infolets,
    );
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.getInfoletsSub?.unsubscribe();
  }

}
