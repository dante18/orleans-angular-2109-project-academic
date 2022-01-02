import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {FormerService} from "../../../services/former.service";
import {InternService} from "../../../services/intern.service";
import {Category} from "../../../models/category";
import {Former} from "../../../models/former";
import {Intern} from "../../../models/intern";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  formation: any
  idFormation: any
  formationStatus = true
  message = ""
  httpCode = 0
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

  ngOnInit(): void {
    // Retrieval of the training ID passed as a parameter
    this.idFormation = parseInt(this.routeActive.snapshot.paramMap.get("id")!);
    if(isNaN(this.idFormation)) {
      this.formationStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormation.findById(this.idFormation).subscribe({
      next: (value) => {
        this.formation = value;

        if (this.formation == undefined) {
          this.formationStatus = false
        }
      },
      error: (error) => {
        this.formationStatus = false;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });

    this.getCategories();
    this.getFormers();
    this.getInterns();
  }

  submitHandler(formEditFormation: NgForm) {
    this.idFormation = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.idFormation)) {
      this.formationStatus = false;
      return;
    }

    this.serviceFormation.update(this.idFormation, formEditFormation.value).subscribe({
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

  returnToListFormation() {
    this.router.navigate(['/formation'])
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

  getFullName(firstname:any, lastname:any)
  {
    return firstname + " " + lastname
  }

  checkStringIsEqual(string1: string, string2: string)
  {
    return string1 === string2;
  }

  checkInternInList(intern:string, interns:any)
  {
    return interns.includes(intern)
  }
}
