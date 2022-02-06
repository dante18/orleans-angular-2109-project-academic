import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {InternService} from "../../../services/db/intern.service";

@Component({
  selector: 'app-add-intern',
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.css']
})
export class AddInternComponent implements OnInit {
  formAddInternIsSubmitted = false;
  fieldCivilityIntern: any;
  fieldLastnameIntern: any;
  fieldFirstnameIntern: any;
  fieldPhoneNumberIntern: any;
  fieldEmailAddressIntern: any;
  fieldPhotoIntern = "";
  numberOfErrors = 0;
  dataSend = false;
  message = "";

  constructor(
    private serviceIntern: InternService) {
  }

  ngOnInit(): void {
  }

  /**
   * Manage form processing
   *
   * @param formAddIntern
   */
  submitHandler(formAddIntern: NgForm) {
    this.formAddInternIsSubmitted = true;

    if (formAddIntern.value.civility.length == 0) {
      this.fieldCivilityIntern = false;
      this.numberOfErrors += 1;
    }

    if (formAddIntern.value.civility.length > 0) {
      this.fieldCivilityIntern = true;
    }

    if (formAddIntern.value.lastname.length == 0) {
      this.fieldLastnameIntern = false;
      this.numberOfErrors += 1;
    }

    if (formAddIntern.value.lastname.length > 0) {
      this.fieldLastnameIntern = true;
    }

    if (formAddIntern.value.firstname.length == 0) {
      this.fieldFirstnameIntern = false;
      this.numberOfErrors += 1;
    }

    if (formAddIntern.value.firstname.length > 0) {
      this.fieldFirstnameIntern = true;
    }

    if (formAddIntern.value.phoneNumber.length == 0) {
      this.fieldPhoneNumberIntern = false;
      this.numberOfErrors += 1;
    }

    if (formAddIntern.value.phoneNumber.length > 0) {
      this.fieldPhoneNumberIntern = true;
    }

    if (formAddIntern.value.emailAddress.length == 0) {
      this.fieldEmailAddressIntern = false;
      this.numberOfErrors += 1;
    }

    if (formAddIntern.value.emailAddress.length > 0) {
      this.fieldEmailAddressIntern = true;
    }

    if (this.numberOfErrors == 0) {
      if (this.fieldCivilityIntern == "madame") {
        this.fieldPhotoIntern = "undraw_avatar1.png";
      } else if (this.fieldCivilityIntern == "monsieur") {
        this.fieldPhotoIntern = "undraw_avatar2.png";
      } else {
        this.fieldPhotoIntern = "undraw_avatar3.png"
      }

      Object.assign(formAddIntern.value, {photo: this.fieldPhotoIntern})

      this.serviceIntern.addIntern(formAddIntern.value).subscribe({
        next: () => {
          this.message = "Le stagiaire a ete ajouté avec success";
          this.formAddInternIsSubmitted = false;
          this.numberOfErrors = 0;
          this.dataSend = true;
          this.fieldCivilityIntern = true;
          this.fieldLastnameIntern = true;
          this.fieldFirstnameIntern = true;
          this.fieldEmailAddressIntern = true;
          this.fieldPhoneNumberIntern = true;

          formAddIntern.resetForm();
        },
        error: (error) => {
          console.log("***", error.message);
        }
      });
    }
  }
}
