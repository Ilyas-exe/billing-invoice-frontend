import { Routes } from '@angular/router';
import { CreancierListComponent } from './features/creancier/creancier-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'creanciers',
  },
  {
    path: 'creanciers',
    component: CreancierListComponent,
    pathMatch: 'full',
  },
  {
    path: 'points-de-vente',
    loadComponent: () =>
      import('./features/points-de-vente-list/points-de-vente-list.component').then(
        (module) => module.PointsDeVenteListComponent
      ),
  },
  {
    path: 'points-de-vente/new',
    loadComponent: () =>
      import('./features/point-de-vente-form/point-de-vente-form.component').then(
        (module) => module.PointDeVenteFormComponent
      ),
  },
  {
    path: 'points-de-vente/:id/edit',
    loadComponent: () =>
      import('./features/point-de-vente-form/point-de-vente-form.component').then(
        (module) => module.PointDeVenteFormComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'creanciers',
  },
];
