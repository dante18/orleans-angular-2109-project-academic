import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../services/formation.service";
import {Category} from "../../models/category";
import {Formation} from "../../models/formation";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formationList: Formation[] = [];
  categoryList: Category[] = [];
  displayDataMethod = "table";
  formSearchIsVisible = false;
  textDefault = "Aucune données n'a été trouvé";
  numberOfFormation = 0;
  numberItemToDisplay = 10;
  formationSelectedName = "";
  formationSelectedId: any;

  constructor(private serviceFormation: FormationService, private serviceCategory: CategoryService) {
  }

  ngOnInit(): void {
    this.getFormationList();
    this.getCategoryList();
  }

  /**
   * Retrieves the list of formation
   */
  getFormationList(): any {
    this.serviceFormation.findAllFormation().subscribe({
      next: (value: any) => {
        /* Retrieve formation list */
        this.formationList = value;
        this.numberOfFormation = value.length;
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Retrieves the list of category
   */
  getCategoryList(): any
  {
    this.serviceCategory.findAllCategory().subscribe({
      next: (value: any) => {
        /* Retrieve formation list */
        this.categoryList = value;
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Modify the display of data according to the selected method
   *
   * @param $event
   */
  btnHandlerDisplayDataMethod($event: any) {
    $event.preventDefault();

    if ($event.target.innerText == "Tableau") {
      this.displayDataMethod = "table";
    } else if ($event.target.innerText == "Liste") {
      this.displayDataMethod = "list";
    }
  }

  /**
   * Manage actions related to the search form
   *
   * @param $event
   * @param formSearch
   */
  eventSearchHandler($event: any, formSearch: any) {
    if ($event.target.id == "btnSearchSend") {
      let formationName = formSearch.value.searchFormation;

      this.serviceFormation.findFormationByName(formationName).subscribe({
        next: (value: any) => {
          /* Retrieve formation list */
          this.formationList = value;
          this.numberOfFormation = value.length;

          if (this.numberOfFormation == 0) {
            this.textDefault = "La recherche n'a retourné aucun résultat";
          }
        },
        error: () => {
          this.numberOfFormation = 0;
          this.textDefault = "La recherche n'a retourné aucun résultat";
        }
      });
    } else if ($event.target.id == "btnSearchReset") {
      formSearch.reset();
      this.getFormationList();
    } else {
      this.formSearchIsVisible = !this.formSearchIsVisible;
    }
  }

  /**
   * Display
   * @param categoryName
   */
  btnHandlerDisplayDataByCategory(categoryName: any)
  {
    if (categoryName == "All") {
      this.getFormationList();
    } else {
      this.serviceFormation.findFormationByCategory(categoryName).subscribe({
        next: (value: any) => {
          this.formationList = value;
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  confirmDeleteFormation($event: any)
  {
    if ($event.target.innerText == "Oui") {
      this.serviceFormation.deleteFormation(this.formationSelectedId).subscribe({
        next: () => {
          this.getFormationList()
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

  deleteFormation(formation: any)
  {
    this.formationSelectedName = formation.name
    this.formationSelectedId = formation.id
  }
}
