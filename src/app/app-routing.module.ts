import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {FormationComponent} from "./views/formation/formation.component";
import {DetailFormationComponent} from "./views/formation/detail-formation/detail-formation.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'formation/:id', component: DetailFormationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
