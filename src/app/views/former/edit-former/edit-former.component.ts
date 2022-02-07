import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
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
  messageType: any;

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
        this.fieldPhotoFormer = this.former.photo;

        if (this.former == undefined) {
          this.formerStatus = false
          this.messageType = "danger";
          this.message = "Une erreur s'est produite lors de la récupération des données. Veuillez contactez l'administrateur si le problème persiste.";
        }
      },
      error: () => {
        this.formerStatus = false;
        this.messageType = "danger";
        this.message = "Une erreur s'est produite lors de la récupération des données. Veuillez contactez l'administrateur si le problème persiste.";
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
    this.validationForm(formEditFormer);

    if (this.numberOfErrors == 0) {
      this.serviceFormer.updateFormer(this.former.id, formEditFormer.value).subscribe({
        next: () => {
          this.message = "Les données du formateur ont été mise à jour";
          this.formEditFormerIsSubmitted = false;
          this.messageType = "success";
          this.dataSend = true;
          this.fieldCivilityFormer = true;
          this.fieldLastnameFormer = true;
          this.fieldFirstnameFormer = true;
          this.fieldEmailAddressFormer = true;
          this.fieldPhoneNumberFormer = true;
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
    if (form.value.civility.length == 0) {
      this.fieldCivilityFormer = false;
      this.numberOfErrors += 1;
    }

    if (form.value.civility.length > 0) {
      this.fieldCivilityFormer = true;
    }

    if (form.value.lastname.length == 0) {
      this.fieldLastnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (form.value.lastname.length > 0) {
      this.fieldLastnameFormer = true;
    }

    if (form.value.firstname.length == 0) {
      this.fieldFirstnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (form.value.firstname.length > 0) {
      this.fieldFirstnameFormer = true;
    }

    if (form.value.phoneNumber.length == 0) {
      this.fieldPhoneNumberFormer = false;
      this.numberOfErrors += 1;
    }

    if (form.value.phoneNumber.length > 0) {
      this.fieldPhoneNumberFormer = true;
    }

    if (form.value.emailAddress.length == 0) {
      this.fieldEmailAddressFormer = false;
      this.numberOfErrors += 1;
    }

    if (form.value.emailAddress.length > 0) {
      this.fieldEmailAddressFormer = true;
    }

    if (isNaN(form.value.salary)) {
      this.fieldSalaryFormer = false;
      this.numberOfErrors += 1;
    }

    if (!isNaN(form.value.salary) && form.value.salary >= 0) {
      this.fieldSalaryFormer = true;
    }
  }
}
