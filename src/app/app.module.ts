import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from './views/home/home.component';
import {FormationComponent} from './views/formation/formation.component';
import {CategoryComponent} from './views/category/category.component';
import {FormerComponent} from './views/former/former.component';
import {InternComponent} from './views/intern/intern.component';
import {AddFormationComponent} from './views/formation/add-formation/add-formation.component';
import {DetailFormationComponent} from './views/formation/detail-formation/detail-formation.component';
import {EditFormationComponent} from "./views/formation/edit-formation/edit-formation.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormationComponent,
    CategoryComponent,
    FormerComponent,
    InternComponent,
    AddFormationComponent,
    DetailFormationComponent,
    EditFormationComponent
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
export class AppModule {
}
