import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import redeRoutes from './rede/rede.routes';
import lojaRoutes from './loja/loja.routes';
import pdvRoutes from './pdv/pdv.routes';
import atualizacaoRoutes from './atualizacao/atualizacao.routes';

export const privateRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'rede',
    children: [...redeRoutes],
  },
  {
    path: 'loja',
    children: [...lojaRoutes],
  },
  {
    path: 'pdv',
    children: [...pdvRoutes],
  },
  {
    path: 'atualizacao',
    children: [...atualizacaoRoutes],
  },
  { path: 'notificacao', component: NotificacaoComponent },
];
