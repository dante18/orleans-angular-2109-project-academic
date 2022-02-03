import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormationService} from "../../../services/formation.service";
import {CategoryService} from "../../../services/category.service";
import {LevelService} from "../../../services/level.service";
import {ActivatedRoute} from "@angular/router";
import {FormerService} from "../../../services/former.service";

@Component({
  selector: 'app-edit-former',
  templateUrl: './edit-former.component.html',
  styleUrls: ['./edit-former.component.css']
})
export class EditFormerComponent implements OnInit {
  formEditFormerIsSubmitted = false;
  fieldCivilityFormer: any;
  fieldLastnameFormer: any;
  fieldFirstnameFormer: any;
  fieldPhoneNumberFormer: any;
  fieldEmailAddressFormer: any;
  fieldSalaryFormer: any;
  fieldPhotoFormer = "";
  message: any;
  numberOfErrors = 0;
  former: any;
  formerId: any
  formerStatus = true
  dataSend = false;

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormer: FormerService) {
  }

  ngOnInit(): void {
    this.getFormer();
  }

  /**
   * Get data of formations for update
   */
  getFormer()
  {
    // Retrieval of the training ID passed as a parameter
    this.formerId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.formerId)) {
      this.formerStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormer.findFormerById(this.formerId).subscribe({
      next: (value) => {
        this.former = value;

        if (this.former == undefined) {
          this.formerStatus = false
        }
      },
      error: () => {
        this.formerStatus = false;
      }
    });
  }

  /**
   * Manage form processing
   *
   * @param formEditFormer
   */
  submitHandler(formEditFormer: NgForm) {
    this.formEditFormerIsSubmitted = true;

    if (formEditFormer.value.civility.length == 0) {
      this.fieldCivilityFormer = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormer.value.civility.length > 0) {
      this.fieldCivilityFormer = true;
    }

    if (formEditFormer.value.lastname.length == 0) {
      this.fieldLastnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormer.value.lastname.length > 0) {
      this.fieldLastnameFormer = true;
    }

    if (formEditFormer.value.firstname.length == 0) {
      this.fieldFirstnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormer.value.firstname.length > 0) {
      this.fieldFirstnameFormer = true;
    }

    if (formEditFormer.value.phoneNumber.length == 0) {
      this.fieldPhoneNumberFormer = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormer.value.phoneNumber.length > 0) {
      this.fieldPhoneNumberFormer = true;
    }

    if (formEditFormer.value.emailAddress.length == 0) {
      this.fieldEmailAddressFormer = false;
      this.numberOfErrors += 1;
    }

    if (formEditFormer.value.emailAddress.length > 0) {
      this.fieldEmailAddressFormer = true;
    }

    if (isNaN(formEditFormer.value.salary)) {
      this.fieldSalaryFormer = false;
      this.numberOfErrors += 1;
    }

    if (!isNaN(formEditFormer.value.salary) && formEditFormer.value.salary >= 0) {
      this.fieldSalaryFormer = true;
    }

    if (this.numberOfErrors == 0) {
      this.serviceFormer.updateFormer(this.former.id, formEditFormer.value).subscribe({
        next: () => {
          this.message = "Le formateur a ete mise a jour";
          this.formEditFormerIsSubmitted = false;
          this.dataSend = true;
          this.fieldCivilityFormer = true;
          this.fieldLastnameFormer = true;
          this.fieldFirstnameFormer = true;
          this.fieldEmailAddressFormer = true;
          this.fieldPhoneNumberFormer = true;
          this.fieldSalaryFormer = true;
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }
}
