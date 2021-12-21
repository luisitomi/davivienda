import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'integracion-contable';

  constructor(
    private router: Router,
    private navigationService: NavigationService,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe(
      event => this.navigationService.setPreviousUrl((event as NavigationEnd).url),
      error => console.log(error),
      () => console.log('complete'),
    );
  }
}
