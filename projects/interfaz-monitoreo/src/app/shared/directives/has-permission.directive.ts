import { ElementRef, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';

import { Features, Permissions } from '../enums';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input('feature') feature?: Features;
  @Input('permission') permission?: Permissions;

  constructor(
    private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private permissionService: PermissionService,
  ) { }

  ngOnInit(): void {
    this.permissionService.nivelAcceso({ feature: this.feature!!, permission: this.permission!! }).subscribe(
      canAccess => {
        if (canAccess) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      },
    );
  }

}
