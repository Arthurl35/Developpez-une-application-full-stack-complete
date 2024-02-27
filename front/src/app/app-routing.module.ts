import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/posts/posts.module').then(m => m.PostsModule)
  },
  //{
  //  path: 'sessions',
  //  canActivate: [AuthGuard],
  //  loadChildren: () => import('./features/sessions/sessions.module').then(m => m.SessionsModule)
  //},
  //{
  //  path: 'me',
  //  canActivate: [AuthGuard],
  //  component: MeComponent
  //},
  //{ path: '404', component: NotFoundComponent },
  //{ path: '**', redirectTo: '404' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
