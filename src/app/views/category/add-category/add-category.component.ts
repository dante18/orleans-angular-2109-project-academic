import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  formAddCategoryIsSubmitted = false;
  fieldNameCategory: any;
  message: any;
  numberOfErrors = 0;
  dataSend = false;

  constructor(private serviceCategory: CategoryService) {}

  ngOnInit(): void {}

  /**
   * Manage form processing
   *
   * @param formAddCategory
   */
  submitHandler(formAddCategory: NgForm) {
    this.formAddCategoryIsSubmitted = true;

    if (formAddCategory.value.name.length == 0) {
      this.fieldNameCategory = false;
      this.numberOfErrors += 1;
    }

    if (formAddCategory.value.name.length > 0) {
      this.fieldNameCategory = true;
    }

    if (this.numberOfErrors == 0) {
      this.serviceCategory.addCategory(formAddCategory.value).subscribe({
        next: () => {
          this.message = "La catégorie a ete ajouté avec success";
          this.formAddCategoryIsSubmitted = false;
          this.numberOfErrors = 0;
          this.dataSend = true;
          this.fieldNameCategory = true;

          formAddCategory.resetForm();
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }
}
