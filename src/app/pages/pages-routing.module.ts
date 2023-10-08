import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((p) => p.AuthModule),
      },
      {
        path: 'todo',
        loadChildren: () =>
          import('./todo/todo.module').then((p) => p.TodoModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
