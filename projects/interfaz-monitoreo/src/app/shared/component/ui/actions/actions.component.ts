import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() label = '';
  @Input() color: string;
  @Input() icon: string;
  @Input() class: string;
  @Input()
  @Input() iconPos = 'right';
  @Input() cssClass = '';
  @Input() loading = false;
  /**
   * Is this the principal call to action on the page?
   */

  @Input() download = false;
  @Input() iconDowload = false;

  @Input() disabled = false;
  /**
   * Button type
   */
  @Input() type: 'button' | 'submit' = 'button';
  /**
   * How large should the button be?
   */
  @Input() size: 'small' | 'large' = 'small';
}
