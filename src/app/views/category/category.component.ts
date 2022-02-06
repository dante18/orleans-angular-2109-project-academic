import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryList: Category[] = [];
  textDefault = "Aucune données n'a été trouvé";
  numberOfCategory = 0;
  categorySelectedId: any;
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

  constructor(private serviceCategory: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  /**
   * Retrieves the list of category
   */
  getCategoryList(): any {
    this.serviceCategory.findAllCategory().subscribe({
      next: (value: any) => {
        this.categoryList = value;

        this.dataSets = this.categoryList;
        this.numberOfCategory = this.categoryList.length  > 1 ? this.categoryList.length - 1 : this.categoryList.length;
        this.numberPageTotal = Math.ceil(this.numberOfCategory / this.numberItemToDisplay);

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
   * Manage actions related to the search form
   *
   * @param formSearch
   */
  eventSearchHandler(formSearch: any) {
    let categoryName = formSearch.value.searchCategory;

    if (categoryName.length == 0) {
      this.pageNumberList = [];
      this.getCategoryList();
    } else {
      const categoryList = this.categoryList;
      this.categoryList = [];
      this.dataSets = [];
      this.numberOfCategory = 0;
      this.pageNumberList = [];

      categoryList.forEach((formation) => {
        if (formation.name!.toLowerCase().search(categoryName.toLowerCase()) != -1) {
          this.categoryList.push(formation);
        }
      });

      this.dataSets = this.categoryList;
      this.numberOfCategory = this.dataSets.length > 1 ? this.dataSets.length - 1 : this.dataSets.length;
      this.numberPageTotal = Math.ceil(this.numberOfCategory / this.numberItemToDisplay);
      console.log(this.dataSets);

      if (this.numberOfCategory > this.numberItemToDisplay) {
        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
      } else {
        this.pageNumberList = [1];
      }

      if (this.numberOfCategory == 0) {
        this.textDefault = "La recherche n'a retourné aucun résultat";
      }
    }
  }

  /**
   * handles the confirmation request before deleting
   *
   * @param $event
   */
  confirmDeleteCategory($event: any) {
    if ($event.choice == "Oui") {
      this.serviceCategory.deleteCategory(this.categorySelectedId).subscribe({
        next: () => {
          this.getCategoryList();
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  /**
   *
   * @param category
   */
  deleteCategory(category: any) {
    this.modalTitle = "Confirmez-vous la suppression de la catégory: " + category.name
    this.categorySelectedId = category.id;
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
    let data = this.categoryList;

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
    } else if(this.numberPage > this.categoryList.length) {
      index = page - 1;
      offSet = this.categoryList.length;
    } else {
      index = this.numberPage * this.numberItemToDisplay - this.numberItemToDisplay
      offSet = index + this.numberItemToDisplay;
    }

    this.dataSets = data.slice(index, offSet);
  }
}
