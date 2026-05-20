import { Routes } from '@angular/router';
import { CreancierListComponent } from './features/creancier/creancier-list.component';

export const routes: Routes = [
  {
    path: 'creanciers',
    component: CreancierListComponent,
    pathMatch: 'full',
  },
];
