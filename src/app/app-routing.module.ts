import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {FormationComponent} from "./views/formation/formation.component";
import {CategoryComponent} from "./views/category/category.component";
import {AddCategoryComponent} from "./views/category/add-category/add-category.component";
import {EditCategoryComponent} from "./views/category/edit-category/edit-category.component";
import {FormerComponent} from "./views/former/former.component";
import {InternComponent} from "./views/intern/intern.component";
import {AddFormationComponent} from "./views/formation/add-formation/add-formation.component";
import {DetailFormationComponent} from "./views/formation/detail-formation/detail-formation.component";
import {EditFormationComponent} from "./views/formation/edit-formation/edit-formation.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},

  {path: 'formation', component: FormationComponent},
  {path: 'formation/add', component: AddFormationComponent},
  {path: 'formation/detail/:id', component: DetailFormationComponent},
  {path: 'formation/edit/:id', component: EditFormationComponent},

  {path: 'category', component: CategoryComponent},
  {path: 'category/add', component: AddCategoryComponent},
  {path: 'category/edit/:id', component: EditCategoryComponent},

  {path: 'former', component: FormerComponent},

  {path: 'intern', component: InternComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
