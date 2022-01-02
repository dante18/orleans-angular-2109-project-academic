import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './views/home/home.component';
import { FormationComponent } from './views/formation/formation.component';
import { DetailFormationComponent } from './views/formation/detail-formation/detail-formation.component';
import { EditFormationComponent } from './views/formation/edit-formation/edit-formation.component';
import {AddFormationComponent} from "./views/formation/add-formation/add-formation.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {CategoryComponent} from "./views/category/category.component";
import {AddCategoryComponent} from "./views/category/add-category/add-category.component";
import {EditCategoryComponent} from "./views/category/edit-category/edit-category.component";
import {FormerComponent} from "./views/former/former.component";
import {AddFormerComponent} from "./views/former/add-former/add-former.component";
import {EditFormerComponent} from "./views/former/edit-former/edit-former.component";
import {InternComponent} from "./views/intern/intern.component";
import {AddInternComponent} from "./views/intern/add-intern/add-intern.component";
import {EditInternComponent} from "./views/intern/edit-intern/edit-intern.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FormationComponent,
    DetailFormationComponent,
    EditFormationComponent,
    AddFormationComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    FormerComponent,
    AddFormerComponent,
    EditFormerComponent,
    InternComponent,
    AddInternComponent,
    EditInternComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
