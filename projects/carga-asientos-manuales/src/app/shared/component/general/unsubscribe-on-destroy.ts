import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export abstract class UnsubcribeOnDestroy implements OnDestroy {
  unsubscribeDestroy$: Subject<boolean> = new Subject();
  arrayToDestroy: Array<any> = [];

  ngOnDestroy(): void {
    this.destroySubcriptions();
  }

  destroySubcriptions(): void {
    this.unsubscribeDestroy$.next(true);
    this.unsubscribeDestroy$.complete();

    Array.isArray(this.arrayToDestroy) &&
      this.arrayToDestroy.forEach((o) => {
        o.unsubscribe && o.unsubscribe();
      });
  }
}
