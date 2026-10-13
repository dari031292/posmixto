import { Routes } from '@angular/router';
import { LAYOUT_ROUTES } from './layout/routes';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.routes),
        pathMatch: 'full'
    },
    ...LAYOUT_ROUTES,
    {
        path: '**',
        redirectTo: ''
    }
];
