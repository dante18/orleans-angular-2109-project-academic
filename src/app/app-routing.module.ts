import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/home/home.component";
import {FormationComponent} from "./views/formation/formation.component";
import {CategoryComponent} from "./views/category/category.component";
import {AddCategoryComponent} from "./views/category/add-category/add-category.component";
import {EditCategoryComponent} from "./views/category/edit-category/edit-category.component";
import {FormerComponent} from "./views/former/former.component";
import {AddFormerComponent} from "./views/former/add-former/add-former.component";
import {EditFormerComponent} from "./views/former/edit-former/edit-former.component";
import {InternComponent} from "./views/intern/intern.component";
import {AddFormationComponent} from "./views/formation/add-formation/add-formation.component";
import {DetailFormationComponent} from "./views/formation/detail-formation/detail-formation.component";
import {EditFormationComponent} from "./views/formation/edit-formation/edit-formation.component";
import {AddInternComponent} from "./views/intern/add-intern/add-intern.component";
import {EditInternComponent} from "./views/intern/edit-intern/edit-intern.component";

const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'accueil', component: HomeComponent},

  {path: 'formation', component: FormationComponent},
  {path: 'formation/ajouter', component: AddFormationComponent},
  {path: 'formation/consulter/:id', component: DetailFormationComponent},
  {path: 'formation/modifier/:id', component: EditFormationComponent},

  {path: 'categorie', component: CategoryComponent},
  {path: 'categorie/ajouter', component: AddCategoryComponent},
  {path: 'categorie/modifier/:id', component: EditCategoryComponent},

  {path: 'formateur', component: FormerComponent},
  {path: 'formateur/ajouter', component: AddFormerComponent},
  {path: 'formateur/modifier/:id', component: EditFormerComponent},

  {path: 'stagiaire', component: InternComponent},
  {path: 'stagiaire/ajouter', component: AddInternComponent},
  {path: 'stagiaire/modifier/:id', component: EditInternComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
