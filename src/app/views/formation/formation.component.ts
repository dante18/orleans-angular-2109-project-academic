import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../services/db/formation.service";
import {Category} from "../../models/category";
import {Formation} from "../../models/formation";
import {CategoryService} from "../../services/db/category.service";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formationList: Formation[] = [];
  categoryList: Category[] = [];
  displayDataMethod = "table";
  textDefault = "Aucune données n'a été trouvé";
  numberOfFormation = 0;
  formationSelectedId: any;
  modalTitle = "";

  /* pagination variables */
  numberItemToDisplay = 5;
  numberPageTotal = 0;
  numberPage = 1;
  nextPage = 2;
  prevPage = 1;
  pageNumberList: number[] = [];
  dataSets: any
  isSearchPagination = false;

  constructor(
    private serviceFormation: FormationService,
    private serviceCategory: CategoryService) {
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
        this.formationList = value;
        this.dataSets = this.formationList;
        this.numberOfFormation = this.formationList.length  > 1 ? this.formationList.length - 1 : this.formationList.length;
        this.numberPageTotal = Math.ceil(this.numberOfFormation / this.numberItemToDisplay);

        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Retrieves the list of category
   */
  getCategoryList(): any {
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
   * @param formSearch
   */
  eventSearchHandler(formSearch: any) {
    let formationName = formSearch.value.searchFormation;

    if (formationName.length == 0) {
      this.pageNumberList = [];
      this.getFormationList();
    } else {
      const formationList = this.formationList;
      this.formationList = [];
      this.dataSets = [];
      this.numberOfFormation = 0;
      this.pageNumberList = [];

      formationList.forEach((formation) => {
        if (formation.name!.toLowerCase().search(formationName.toLowerCase()) != -1) {
          this.formationList.push(formation);
        }
      });

      this.dataSets = this.formationList;
      this.numberOfFormation = this.dataSets.length > 1 ? this.dataSets.length - 1 : this.dataSets.length;
      this.numberPageTotal = Math.ceil(this.numberOfFormation / this.numberItemToDisplay);
      console.log(this.dataSets);

      if (this.numberOfFormation > this.numberItemToDisplay) {
        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
      } else {
        this.pageNumberList = [1];
      }

      if (this.numberOfFormation == 0) {
        this.textDefault = "La recherche n'a retourné aucun résultat";
      }
    }
  }

  /**
   * Display data by category
   * @param categoryName
   */
  btnHandlerDisplayDataByCategory(categoryName: any) {
    if (categoryName == "All") {
      this.pageNumberList = [];
      this.getFormationList();
    } else {
      this.pageNumberList = [];

      this.serviceFormation.findFormationByCategory(categoryName).subscribe({
        next: (value: any) => {
          this.formationList = value;
          this.dataSets = this.formationList;
          this.numberOfFormation = this.formationList.length  > 1 ? this.formationList.length - 1 : this.formationList.length;
          this.numberPageTotal = Math.ceil(this.numberOfFormation / this.numberItemToDisplay);

          for (let i = 0; i < this.numberPageTotal; i++) {
            this.pageNumberList.push(i + 1);
          }

          if (this.numberOfFormation == 0) {
            this.textDefault = "Aucune formation n'est associé a la catégorie '" + categoryName + "'";
          }
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  /**
   * handles the confirmation request before deleting
   *
   * @param $event
   */
  confirmDeleteFormation($event: any) {
    if ($event.choice == "Oui") {
      this.serviceFormation.deleteFormation(this.formationSelectedId).subscribe({
        next: () => {
          this.getFormationList()
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  /**
   *
   * @param formation
   */
  deleteFormation(formation: any) {
    this.modalTitle = "Confirmez-vous la suppression de la formation: " + formation.name;
    this.formationSelectedId = formation.id;
  }

  /**
   *
   * @param page
   * @param $event
   */
  btnHandlerPagination(page: any, $event: any) {
    $event.preventDefault();
    this.numberPage = page;
    let offSet = 1;
    let index = 0;
    let data = this.formationList;

    /* Determines the number of the current, previous and next page */
    if (this.numberPage <= 1) {
      this.numberPage = 1;
      this.prevPage = 0;
      this.nextPage = 2;
    } else if (this.numberPage > this.numberPageTotal) {
      this.numberPage = this.numberPageTotal;
      this.prevPage = this.numberPage - 1;
      this.nextPage = this.numberPage + 1;
    } else {
      this.prevPage = this.numberPage - 1;
      this.nextPage = this.numberPage + 1;
    }

    /* Extract the data that will be displayed */
    if(this.numberPage == 1 || this.numberPage <=0)  {
      index = 0;
      offSet = this.numberItemToDisplay;
    } else if(this.numberPage > this.formationList.length) {
      index = page - 1;
      offSet = this.formationList.length;
    } else {
      index = this.numberPage * this.numberItemToDisplay - this.numberItemToDisplay
      offSet = index + this.numberItemToDisplay;
    }

    this.dataSets = data.slice(index, offSet);
  }
}
