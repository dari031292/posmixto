import { Routes } from '@angular/router';
import { LayoutComponent, type LayoutRouteData } from './layout.component';

export const LAYOUT_ROUTES: Routes = [
  {
    path: 'generala',
    component: LayoutComponent,
    data: {
      title: 'Anotador de Generala',
      action: 'reset'
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/generala/generala.routes').then(m => m.routes) }
    ]
  },
  {
    path: 'bazas',
    component: LayoutComponent,
    data: {
      title: 'Anotador de Bazas',
      action: 'reset'
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/bazas/bazas.routes').then(m => m.routes) }
    ]
  },
  {
    path: 'truco',
    component: LayoutComponent,
    data: {
      title: 'Truco',
      action: 'reset'
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/truco/truco.routes').then(m => m.routes) }
    ]
  },
  {
    path: 'mus',
    component: LayoutComponent,
    data: {
      title: 'Mus',
      actions: ['undo', 'reset']
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/mus/mus.routes').then(m => m.routes) }
    ]
  },
  {
    path: 'share-receiver',
    component: LayoutComponent,
    data: {
      title: 'Recibir Comparte',
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/share-receiver/share-receiver.routes').then(m => m.routes) }
    ]
  },
  {
    path: 'team-builder',
    component: LayoutComponent,
    data: {
      title: 'Team Builder',
      action: 'share'
    } satisfies LayoutRouteData,
    children: [
      { path: '', loadChildren: () => import('../features/team-builder/team-builder.routes').then(m => m.routes) }
    ]
  }
];

