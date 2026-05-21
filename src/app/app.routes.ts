import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'points-de-vente'
  },
  {
    path: 'points-de-vente',
    loadComponent: () =>
      import('./features/points-de-vente-list/points-de-vente-list.component').then(
        (module) => module.PointsDeVenteListComponent
      )
  },
  {
    path: 'points-de-vente/new',
    loadComponent: () =>
      import('./features/point-de-vente-form/point-de-vente-form.component').then(
        (module) => module.PointDeVenteFormComponent
      )
  },
  {
    path: 'points-de-vente/:id/edit',
    loadComponent: () =>
      import('./features/point-de-vente-form/point-de-vente-form.component').then(
        (module) => module.PointDeVenteFormComponent
      )
  },
  {
    path: '**',
    redirectTo: 'points-de-vente'
  }
];
