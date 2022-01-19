import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilServices {
  private textValue = new BehaviorSubject('');

  public getTextValue() {
    return this.textValue.asObservable();
  }

  public setTextValue(text: string) {
    this.textValue.next(text);
  }
}
