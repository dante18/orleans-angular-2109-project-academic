import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { FormationComponent } from "./views/formation/formation.component";
import { DetailFormationComponent} from "./views/formation/detail-formation/detail-formation.component";
import { EditFormationComponent } from "./views/formation/edit-formation/edit-formation.component";
import {AddFormationComponent} from "./views/formation/add-formation/add-formation.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'formation/add', component: AddFormationComponent },
  { path: 'formation/detail/:id', component: DetailFormationComponent },
  { path: 'formation/edit/:id', component: EditFormationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
