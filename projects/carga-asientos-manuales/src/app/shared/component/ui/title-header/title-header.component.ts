import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss']
})
export class TitleHeaderComponent {
  @Input() Title: string;
  @Input() ViewIcon: boolean;
  @Input() IconType: string;
}
