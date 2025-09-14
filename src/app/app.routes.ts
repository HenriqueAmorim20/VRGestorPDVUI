import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { publicRoutes } from './pages/public/public.routes';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { privateRoutes } from './pages/private/private.routes';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [...publicRoutes],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [...privateRoutes],
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
