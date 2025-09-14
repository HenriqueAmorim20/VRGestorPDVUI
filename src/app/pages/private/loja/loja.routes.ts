import { Routes } from '@angular/router';
import { PendingChangesGuard } from '../../../core/pending-changes/pending-changes.guard';

const lojaRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-loja/list-loja.component').then((m) => m.ListLojaComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-or-edit-loja/new-or-edit-loja.component').then((m) => m.NewOrEditLojaComponent),
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./new-or-edit-loja/new-or-edit-loja.component').then((m) => m.NewOrEditLojaComponent),
    canDeactivate: [PendingChangesGuard],
  },
];

export default lojaRoutes;
