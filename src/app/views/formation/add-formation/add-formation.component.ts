import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Former} from "../../../models/former";
import {FormerService} from "../../../services/former.service";
import {Intern} from "../../../models/intern";
import {InternService} from "../../../services/intern.service";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  message = "";
  httpCode: number = 0
  categories: Category[] = [];
  formers: Former[] = [];
  interns: Intern[] = [];

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormation: FormationService,
    private serviceCategory: CategoryService,
    private serviceFormer: FormerService,
    private serviceIntern: InternService,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    this.getCategories();
    this.getFormers();
    this.getInterns();
  }

  getCategories()
  {

    this.serviceCategory.findAll().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  getFormers()
  {

    this.serviceFormer.findAll().subscribe({
      next: (value) => {
        this.formers = value;
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  getInterns()
  {

    this.serviceIntern.findAll().subscribe({
      next: (value) => {
        this.interns = value;
      },
      error: (error) => {
        console.log(error.message);
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  returnToListFormation() {
    this.router.navigate(['/formation'])
  }

  submitHandler(formEditFormation: NgForm) {
    this.serviceFormation.add(formEditFormation.value).subscribe({
      next: () => {
        this.message = "La formation a ete ajouté avec success";
        this.httpCode = 200;
      },
      error: (error) => {
        this.message = error.message;
        this.httpCode = 404
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }
}
