import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormerService} from "../../../services/db/former.service";

@Component({
  selector: 'app-add-former',
  templateUrl: './add-former.component.html',
  styleUrls: ['./add-former.component.css']
})
export class AddFormerComponent implements OnInit {
  formAddFormerIsSubmitted = false;
  fieldCivilityFormer: any;
  fieldLastnameFormer: any;
  fieldFirstnameFormer: any;
  fieldPhoneNumberFormer: any;
  fieldEmailAddressFormer: any;
  fieldSalaryFormer: any;
  fieldPhotoFormer = "";
  numberOfErrors = 0;
  dataSend = false;
  message = "";

  constructor(
    private serviceFormer: FormerService) {
  }

  ngOnInit(): void {
  }

  /**
   * Manage form processing
   *
   * @param formAddFormer
   */
  submitHandler(formAddFormer: NgForm) {
    this.formAddFormerIsSubmitted = true;
    this.validationForm(formAddFormer);

    if (this.numberOfErrors == 0) {
      if (this.fieldCivilityFormer == "madame") {
        this.fieldPhotoFormer = "undraw_avatar1.png";
      } else if (this.fieldCivilityFormer == "monsieur") {
        this.fieldPhotoFormer = "undraw_avatar2.png";
      } else {
        this.fieldPhotoFormer = "undraw_avatar3.png"
      }

      Object.assign(formAddFormer.value, {photo: this.fieldPhotoFormer})

      this.serviceFormer.addFormer(formAddFormer.value).subscribe({
        next: () => {
          this.message = "Le formateur a ete ajouté avec success";
          this.formAddFormerIsSubmitted = false;
          this.numberOfErrors = 0;
          this.dataSend = true;
          this.fieldCivilityFormer = true;
          this.fieldLastnameFormer = true;
          this.fieldFirstnameFormer = true;
          this.fieldEmailAddressFormer = true;
          this.fieldPhoneNumberFormer = true;
          this.fieldSalaryFormer = true;

          formAddFormer.resetForm();
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
