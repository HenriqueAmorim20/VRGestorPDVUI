import { Routes } from '@angular/router';
import { PendingChangesGuard } from '../../../core/pending-changes/pending-changes.guard';

const redeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list-rede/list-rede.component').then((m) => m.ListRedeComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-or-edit-rede/new-or-edit-rede.component').then((m) => m.NewOrEditRedeComponent),
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./new-or-edit-rede/new-or-edit-rede.component').then((m) => m.NewOrEditRedeComponent),
    canDeactivate: [PendingChangesGuard],
  },
];

export default redeRoutes;
