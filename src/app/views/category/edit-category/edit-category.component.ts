import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  formEditCategoryIsSubmitted = false;
  fieldNameCategory: any;
  message: any;
  numberOfErrors = 0;
  category: any;
  categoryId: any;
  categoryStatus = true;
  dataSend = false;
  messageType: any;

  constructor(
    private routeActive: ActivatedRoute,
    private serviceCategory: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  /**
   * Get data of category for update
   */
  getCategory()
  {
    // Retrieval of the training ID passed as a parameter
    this.categoryId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.categoryId)) {
      this.categoryStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceCategory.findCategoryById(this.categoryId).subscribe({
      next: (value) => {
        this.category = value;

        if (this.category == undefined) {
          this.categoryStatus = false
          this.messageType = "danger";
          this.message = "Une erreur s'est produite lors de la récupération des données. Veuillez contactez l'administrateur si le problème persiste."
        }
      },
      error: () => {
        this.categoryStatus = false;
        this.messageType = "danger";
        this.message = "Une erreur s'est produite lors de la récupération des données. Veuillez contactez l'administrateur si le problème persiste."
      }
    });
  }

  /**
   * Manage form processing
   *
   * @param formEditCategory
   */
  submitHandler(formEditCategory: NgForm) {
    this.formEditCategoryIsSubmitted = true;
    this.validationForm(formEditCategory);

    if (this.numberOfErrors == 0) {
      this.serviceCategory.updateCategory(this.category.id, formEditCategory.value).subscribe({
        next: () => {
          this.message = "Les données de la catégorie ont bien été mises à jour";
          this.messageType = "success";
          this.formEditCategoryIsSubmitted = false;
          this.dataSend = true;
          this.fieldNameCategory = true;
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }

  /**
   * Validate the information entered in the form
   *
   * @param form Current form
   * @private
   */
  private validationForm(form: any) {
    if (form.value.name.length == 0) {
      this.fieldNameCategory = false;
      this.numberOfErrors += 1;
    }

    if (form.value.name.length > 0) {
      this.fieldNameCategory = true;
    }
  }
}
