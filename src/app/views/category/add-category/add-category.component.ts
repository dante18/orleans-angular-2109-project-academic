import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormationService} from "../../../services/formation.service";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Level} from "../../../models/level";
import {LevelService} from "../../../services/level.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categoryList: Category[] = [];
  levelList: Level[] = [];
  formAddFormationIsSubmitted = false;
  fieldNameFormation: any;
  fieldDescriptionFormation: any;
  fieldProgrammFormation: any;
  fieldPriceFormation: any;
  fieldDurationFormation: any;
  fieldDateAvailableFormation: any;
  fieldLevelFormation: any;
  fieldCategoryFormation: any;
  message: any;
  numberOfErrors = 0;
  dataSend = false;

  constructor(
    private serviceFormation: FormationService,
    private serviceCategory: CategoryService,
    private serviceLevel: LevelService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getLevelList();
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
   * Retrieves the list of level
   */
  getLevelList(): any {
    this.serviceLevel.findAllLevel().subscribe({
      next: (value: any) => {
        /* Retrieve formation list */
        this.levelList = value;
      },
      error: (error: any) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Manage form processing
   *
   * @param formAddFormation
   */
  submitHandler(formAddFormation: NgForm) {
    this.formAddFormationIsSubmitted = true;

    if (formAddFormation.value.name.length == 0) {
      this.fieldNameFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.name.length > 0) {
      this.fieldNameFormation = true;
    }

    if (formAddFormation.value.description.length == 0 || formAddFormation.value.description.length > 255) {
      this.fieldDescriptionFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.description.length > 0) {
      this.fieldDescriptionFormation = true;
    }

    if (formAddFormation.value.program.length == 0) {
      this.fieldProgrammFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.program.length > 0) {
      this.fieldProgrammFormation = true;
    }

    if (formAddFormation.value.price == 0) {
      this.fieldPriceFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.price > 0) {
      this.fieldPriceFormation = true;
    }

    if (formAddFormation.value.duration == 0) {
      this.fieldDurationFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.duration > 0) {
      this.fieldDurationFormation = true;
    }

    if (formAddFormation.value.dateAvailable.length == 0) {
      this.fieldDateAvailableFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.dateAvailable.length > 0) {
      this.fieldDateAvailableFormation = true;
    }

    if (formAddFormation.value.level.length == 0 && formAddFormation.value.level == "Veuillez choisir un niveau") {
      this.fieldLevelFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.level.length > 0 && formAddFormation.value.level != "Veuillez choisir un niveau") {
      this.fieldLevelFormation = true;
    }

    if (formAddFormation.value.category.length == 0 && formAddFormation.value.category == "Catégorie de la formation") {
      this.fieldCategoryFormation = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormation.value.category.length > 0 && formAddFormation.value.category != "Catégorie de la formation") {
      this.fieldCategoryFormation = true;
    }

    if (this.numberOfErrors == 0) {
      this.serviceFormation.addFormation(formAddFormation.value).subscribe({
        next: () => {
          this.message = "La formation a ete ajouté avec success";
          this.formAddFormationIsSubmitted = false;
          this.numberOfErrors = 0;
          this.dataSend = true;
          this.fieldNameFormation = true;
          this.fieldDescriptionFormation = true;
          this.fieldProgrammFormation = true;
          this.fieldPriceFormation = true;
          this.fieldDurationFormation = true;
          this.fieldDateAvailableFormation = true;
          this.fieldLevelFormation = true;
          this.fieldCategoryFormation = true;

          formAddFormation.resetForm();
        },
        error: (error) => {
          console.log(error.message);
        },
        complete: () => {
          console.log("La réception des données est terminée.");
        }
      });
    }
  }
}
