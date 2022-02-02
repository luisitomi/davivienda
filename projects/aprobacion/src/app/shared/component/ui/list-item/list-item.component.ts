import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() title: string;
  @Input() Link: string;
  @Input() subtitleLink: string;
  @Input() subtitle: string | undefined;
  @Input() isDate: Date | undefined;
  @Input() toogle: boolean;
  @Input() divider: boolean;

  transform(urls: any) {
    const a = document.createElement("a");
    const url = urls;
    a.href = url;
    a.download = "log.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
}
