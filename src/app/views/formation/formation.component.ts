import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation.service";
import {Router} from "@angular/router";
import {Formation} from "../../models/formation";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  dataViewType = "table"
  formations: Formation[] = [];
  categories: Category[] = [];
  errorMessage = "";
  formationSelectedName = "";
  formationSelectedId: any;
  buttonFilterText = "Filtrer par catégorie"
  message = "";

  constructor(
    private serviceFormation: FormationService,
    private serviceCategory: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    this.getAllFormations();
    this.getCategories();
  }

  getAllFormations()
  {
    this.errorMessage = "";

    this.serviceFormation.findAll().subscribe({
      next: (value) => {
        this.formations = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  getCategories()
  {
    this.errorMessage = "";

    this.serviceCategory.findAll().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  getFormationByCategory($event: any, category: any)
  {
    $event.preventDefault()

    if (category == "all") {
      this.getAllFormations()
    } else {
      this.formations = this.serviceFormation.findByCriteria(category)
      this.buttonFilterText = "Filtrer par categorie : " + category
    }
  }

  addFormation()
  {
    this.router.navigate(["/formation/add"])
  }

  detailFormation(idFormation: any)
  {
    this.router.navigate(["/formation/detail", idFormation])
  }

  editFormation(idFormation: any)
  {
    this.router.navigate(["/formation/edit", idFormation])
  }

  deleteFormation(formation: any)
  {
    this.formationSelectedName = formation.name
    this.formationSelectedId = formation.id
  }

  confirmDeleteFormation($event: any)
  {
    if ($event.target.innerText == "Oui") {
      this.serviceFormation.delete(this.formationSelectedId).subscribe({
        next: () => {
          this.getAllFormations()
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
        complete: () => {
          console.log("La réception des données est terminée.");
        }
      });
    }
  }

  changeDataView($event:any):void
  {
    if ($event.target.innerText == "Tableau") {
      this.dataViewType = "table"
    } else if ($event.target.innerText == "Card") {
      this.dataViewType = "card"
    } else {
      this.dataViewType = "table"
    }
  }
}
