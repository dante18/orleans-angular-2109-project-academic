import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormationService} from "../../../services/formation.service";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";
import {Level} from "../../../models/level";
import {LevelService} from "../../../services/level.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-former',
  templateUrl: './edit-former.component.html',
  styleUrls: ['./edit-former.component.css']
})
export class EditFormerComponent implements OnInit {
  categoryList: Category[] = [];
  levelList: Level[] = [];
  formEditFormationIsSubmitted = false;
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
  formation: any;
  formationId: any
  formationStatus = true
  dataSend = false;

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormation: FormationService,
    private serviceCategory: CategoryService,
    private serviceLevel: LevelService) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getLevelList();
    this.getFormation();
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
   * Get data of formations for update
   */
  getFormation()
  {
    // Retrieval of the training ID passed as a parameter
    this.formationId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.formationId)) {
      this.formationStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormation.findFormationById(this.formationId).subscribe({
      next: (value) => {
        this.formation = value;

        if (this.formation == undefined) {
          this.formationStatus = false
        }
      },
      error: () => {
        this.formationStatus = false;
      }
    });
  }

  /**
   * Manage form processing
   *
   * @param formEditFormation
   */
  submitHandler(formEditFormation: NgForm) {
    this.formEditFormationIsSubmitted = true;

    if (formEditFormation.value.name.length == 0) {
      this.fieldNameFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.name.length > 0) {
      this.fieldNameFormation = true;
    }

    if (formEditFormation.value.description.length == 0 || formEditFormation.value.description.length > 255) {
      this.fieldDescriptionFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.description.length > 0) {
      this.fieldDescriptionFormation = true;
    }

    if (formEditFormation.value.program.length == 0) {
      this.fieldProgrammFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.program.length > 0) {
      this.fieldProgrammFormation = true;
    }

    if (formEditFormation.value.price == 0) {
      this.fieldPriceFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.price > 0) {
      this.fieldPriceFormation = true;
    }

    if (formEditFormation.value.duration == 0) {
      this.fieldDurationFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.duration > 0) {
      this.fieldDurationFormation = true;
    }

    if (formEditFormation.value.dateAvailable.length == 0) {
      this.fieldDateAvailableFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.dateAvailable.length > 0) {
      this.fieldDateAvailableFormation = true;
    }

    if (formEditFormation.value.level.length == 0 && formEditFormation.value.level == "Veuillez choisir un niveau") {
      this.fieldLevelFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.level.length > 0 && formEditFormation.value.level != "Veuillez choisir un niveau") {
      this.fieldLevelFormation = true;
    }

    if (formEditFormation.value.category.length == 0 && formEditFormation.value.category == "Catégorie de la formation") {
      this.fieldCategoryFormation = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormation.value.category.length > 0 && formEditFormation.value.category != "Catégorie de la formation") {
      this.fieldCategoryFormation = true;
    }

    if (this.numberOfErrors == 0) {
      this.serviceFormation.updateFormation(this.formation.id, formEditFormation.value).subscribe({
        next: () => {
          this.message = "La formation a ete mise a jour";
          this.formEditFormationIsSubmitted = false;
          this.dataSend = true;
          this.fieldNameFormation = true;
          this.fieldDescriptionFormation = true;
          this.fieldProgrammFormation = true;
          this.fieldPriceFormation = true;
          this.fieldDurationFormation = true;
          this.fieldDateAvailableFormation = true;
          this.fieldLevelFormation = true;
          this.fieldCategoryFormation = true;
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
