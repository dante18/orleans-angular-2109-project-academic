import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormationService} from "../../../services/db/formation.service";
import {CategoryService} from "../../../services/db/category.service";
import {Category} from "../../../models/category";
import {Level} from "../../../models/level";
import {LevelService} from "../../../services/db/level.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
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
  messageType = "";
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
  getFormation() {
    // Retrieval of the training ID passed as a parameter
    this.formationId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if (isNaN(this.formationId)) {
      this.formationStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormation.findFormationById(this.formationId).subscribe({
      next: (value) => {
        this.formation = value;

        if (this.formation == undefined) {
          this.messageType = "danger";
          this.message = "Une erreur s'est produite lors de la recupération des données. Veuillez contactez l'administrateur si le probleme persiste."
          this.formationStatus = false;
        }
      },
      error: () => {
        this.messageType = "danger";
        this.message = "Une erreur s'est produite lors de la recupération des données. Veuillez contactez l'administrateur si le probleme persiste."
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
    this.validationForm(formEditFormation);

    if (this.numberOfErrors == 0) {
      this.serviceFormation.updateFormation(this.formation.id, formEditFormation.value).subscribe({
        next: () => {
          this.message = "Les données de la formation ont ete mise a jour";
          this.messageType = "success";
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
      this.fieldNameFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.name.length > 0) {
      this.fieldNameFormation = true;
    }

    if (form.value.description.length == 0 || form.value.description.length > 255) {
      this.fieldDescriptionFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.description.length > 0) {
      this.fieldDescriptionFormation = true;
    }

    if (form.value.program.length == 0) {
      this.fieldProgrammFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.program.length > 0) {
      this.fieldProgrammFormation = true;
    }

    if (form.value.price == 0) {
      this.fieldPriceFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.price > 0) {
      this.fieldPriceFormation = true;
    }

    if (form.value.duration == 0) {
      this.fieldDurationFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.duration > 0) {
      this.fieldDurationFormation = true;
    }

    let regExp = new RegExp('/^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/');
    if (form.value.dateAvailable.length == 0 || !regExp.test(form.value.dateAvailable)) {
      this.fieldDateAvailableFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.dateAvailable.length > 0 || regExp.test(form.value.dateAvailable)) {
      this.fieldDateAvailableFormation = true;
    }

    if (form.value.level.length == 0 && form.value.level == "Veuillez choisir un niveau") {
      this.fieldLevelFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.level.length > 0 && form.value.level != "Veuillez choisir un niveau") {
      this.fieldLevelFormation = true;
    }

    if (form.value.category.length == 0 && form.value.category == "Catégorie de la formation") {
      this.fieldCategoryFormation = false;
      this.numberOfErrors += 1;
    }

    if (form.value.category.length > 0 && form.value.category != "Catégorie de la formation") {
      this.fieldCategoryFormation = true;
    }
  }
}
