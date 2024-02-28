import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import {DetailComponent} from "./components/detail/detail.component";
import {FormComponent} from "./components/form/form.component";

const routes: Routes = [
  { path: '', title: 'Articles', component: ListComponent },
  { path: 'create', title: 'Article - créé', component: FormComponent },
  { path: ':id', title: 'Article - detail', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}
