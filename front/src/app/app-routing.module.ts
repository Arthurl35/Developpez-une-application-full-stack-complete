import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import {MeComponent} from "./components/me/me.component";

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
  {
    path: 'topics',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/topics/topics.module').then(m => m.TopicsModule)
  },
  //{
  //  path: 'sessions',
  //  canActivate: [AuthGuard],
  //  loadChildren: () => import('./features/sessions/sessions.module').then(m => m.SessionsModule)
  //},
  {
   path: 'me',
   canActivate: [AuthGuard],
   component: MeComponent
  }
  //{ path: '404', component: NotFoundComponent },
  //{ path: '**', redirectTo: '404' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
