import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Infolet } from 'src/app/shared';

@Component({
  selector: 'app-infolet-origen',
  templateUrl: './infolet-origen.component.html',
  styleUrls: ['./infolet-origen.component.scss']
})
export class InfoletOrigenComponent implements OnInit {

  title: string = '';

  @Input() infolet?: Infolet;

  constructor() { }

  ngOnInit(): void {
    this.title = this.infolet?.origen !== undefined ? 'Infolet de Origen' : 'Infolet Global de Integración';
  }

}
