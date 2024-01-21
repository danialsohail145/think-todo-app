import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { authGuard } from '../guard/auth.guard';

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
          canActivate:[authGuard]
      },
      {
        path:'',
        redirectTo:'auth',
        pathMatch:'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
