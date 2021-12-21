import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private prevUrl?: string;
  private currentUrl: string | null = null;
  private previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() { }

  setPrevUrl(url: string): void {
    this.prevUrl = url;
  }

  getPrevUrl(): string | undefined {
    return this.prevUrl;
  }

  setPreviousUrl(url: string): void {
    this.previousUrl.next(this.currentUrl);
    this.currentUrl = url;
  }

  getPreviousUrl(): Observable<string | null> {
    return this.previousUrl.asObservable();
  }
}
