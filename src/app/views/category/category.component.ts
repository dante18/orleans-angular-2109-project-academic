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
  numberItemToDisplay = 10;
  categorySelectedId: any;
  modalTitle = "";

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
        /* Retrieve formation list */
        this.categoryList = value;
        this.numberOfCategory = value.length;
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
      this.getCategoryList();
    } else {
      this.serviceCategory.findCategoryByName(categoryName).subscribe({
        next: (value: any) => {
          /* Retrieve formation list */
          this.categoryList = value;
          this.numberOfCategory = value.length;

          if (this.numberOfCategory == 0) {
            this.textDefault = "La recherche n'a retourné aucun résultat";
          }
        },
        error: () => {
          this.numberOfCategory = 0;
          this.textDefault = "La recherche n'a retourné aucun résultat";
        }
      });
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
          console.log(this.getCategoryList());
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
}
