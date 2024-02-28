import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "../posts/components/list/list.component";
import {DetailComponent} from "../posts/components/detail/detail.component";

const routes: Routes = [
  { path: '', title: 'Thèmes', component: ListComponent },
  { path: ':id', title: 'Thème - detail', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicsRoutingModule {
}
