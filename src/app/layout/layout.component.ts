import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderComponent, type HeaderAction } from './header.component';
import { LayoutService } from './layout.service';

export interface LayoutRouteData {
  title: string;
  actions?: HeaderAction[];
  action?: HeaderAction;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  private route = inject(ActivatedRoute);
  layoutService = inject(LayoutService);

  constructor() {
    // Listen to route data changes
    this.route.data.subscribe(data => {
      const routeData = data as { title?: string; action?: HeaderAction; actions?: HeaderAction[] };
      if (routeData.title) {
        this.layoutService.setConfig({
          title: routeData.title,
          actions: routeData.actions || (routeData.action ? [routeData.action] : [])
        });
      }
    });
  }

  onActionClick(action: HeaderAction) {
    this.layoutService.triggerActionClick(action);
  }
}
