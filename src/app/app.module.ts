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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FormationComponent,
    DetailFormationComponent,
    EditFormationComponent,
    AddFormationComponent
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
