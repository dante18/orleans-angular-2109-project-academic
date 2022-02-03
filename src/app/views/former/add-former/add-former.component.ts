import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FormerService} from "../../../services/former.service";

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

  ngOnInit(): void {}

  /**
   * Manage form processing
   *
   * @param formAddFormer
   */
  submitHandler(formAddFormer: NgForm) {
    console.log(formAddFormer.value)
    this.formAddFormerIsSubmitted = true;

    if (formAddFormer.value.civility.length == 0) {
      this.fieldCivilityFormer = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormer.value.civility.length > 0) {
      this.fieldCivilityFormer = true;
    }

    if (formAddFormer.value.lastname.length == 0) {
      this.fieldLastnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormer.value.lastname.length > 0) {
      this.fieldLastnameFormer = true;
    }

    if (formAddFormer.value.firstname.length == 0) {
      this.fieldFirstnameFormer = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormer.value.firstname.length > 0) {
      this.fieldFirstnameFormer = true;
    }

    if (formAddFormer.value.phoneNumber.length == 0) {
      this.fieldPhoneNumberFormer = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormer.value.phoneNumber.length > 0) {
      this.fieldPhoneNumberFormer = true;
    }

    if (formAddFormer.value.emailAddress.length == 0) {
      this.fieldEmailAddressFormer = false;
      this.numberOfErrors += 1;
    }

    if (formAddFormer.value.emailAddress.length > 0) {
      this.fieldEmailAddressFormer = true;
    }

    if (isNaN(formAddFormer.value.salary)) {
      this.fieldSalaryFormer = false;
      this.numberOfErrors += 1;
    }

    if (!isNaN(formAddFormer.value.salary) && formAddFormer.value.salary >= 0) {
      this.fieldSalaryFormer = true;
    }

    if (this.numberOfErrors == 0) {
      Object.assign(formAddFormer.value, { photo: "" } )
      console.log(formAddFormer.value);
      this.serviceFormer.addFormer(formAddFormer.value).subscribe({
        next: () => {
          this.message = "Le former a ete ajouté avec success";
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

  private formValidation(formData: any)
  {}
}
