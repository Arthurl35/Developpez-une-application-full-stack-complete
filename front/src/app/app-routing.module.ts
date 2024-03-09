import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {MeComponent} from "./components/me/me.component";
import {PostDetailComponent} from "./features/posts/components/detail/detail.component";
import {PostFormComponent} from "./features/posts/components/form/form.component";
import {PostListComponent} from "./features/posts/components/list/list.component";
import {TopicListComponent} from "./features/topics/components/list/list.component";

const routes: Routes = [
  { path: '',  component: HomeComponent },
  {
    path : 'login',
    canActivate: [UnauthGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [UnauthGuard],
    component: RegisterComponent,
  },
  {
    path: 'posts',
    title: 'Articles',
    canActivate: [AuthGuard],
    component: PostListComponent
  },
  {
    path: 'posts/create',
    title: 'Article - créé',
    canActivate: [AuthGuard],
    component: PostFormComponent
  },
  {
    path: 'posts/:id',
    title: 'Article - detail',
    canActivate: [AuthGuard],
    component: PostDetailComponent
  },
  {
    path: 'topics',
    title: 'Thèmes',
    canActivate: [AuthGuard],
    component: TopicListComponent
  },
  {
    path: 'me',
    canActivate: [AuthGuard],
    component: MeComponent
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
