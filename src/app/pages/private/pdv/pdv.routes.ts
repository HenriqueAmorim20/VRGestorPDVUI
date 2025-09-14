import { Routes } from '@angular/router';
import { PendingChangesGuard } from '../../../core/pending-changes/pending-changes.guard';

const pdvRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-pdv/list-pdv.component').then((m) => m.ListPDVComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-or-edit-pdv/new-or-edit-pdv.component').then((m) => m.NewOrEditPDVComponent),
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./new-or-edit-pdv/new-or-edit-pdv.component').then((m) => m.NewOrEditPDVComponent),
    canDeactivate: [PendingChangesGuard],
  },
];

export default pdvRoutes;
