import { Routes } from '@angular/router';

const atualizacaoRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./list-atualizacao/list-atualizacao.component').then((m) => m.ListAtualizacaoComponent),
  },
  {
    path: 'new',
    loadComponent: () => import('./new-atualizacao/new-atualizacao.component').then((m) => m.NewAtualizacaoComponent),
  },
];

export default atualizacaoRoutes;
