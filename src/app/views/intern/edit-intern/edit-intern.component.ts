import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {InternService} from "../../../services/intern.service";

@Component({
  selector: 'app-edit-intern',
  templateUrl: './edit-intern.component.html',
  styleUrls: ['./edit-intern.component.css']
})
export class EditInternComponent implements OnInit {
  formEditInternIsSubmitted = false;
  fieldCivilityIntern: any;
  fieldLastnameIntern: any;
  fieldFirstnameIntern: any;
  fieldPhoneNumberIntern: any;
  fieldEmailAddressIntern: any;
  fieldPhotoIntern = "";
  message: any;
  numberOfErrors = 0;
  intern: any;
  internId: any
  internStatus = true
  dataSend = false;

  constructor(
    private routeActive: ActivatedRoute,
    private serviceIntern: InternService) {
  }

  ngOnInit(): void {
    this.getIntern();
  }

  /**
   * Get data of intern for update
   */
  getIntern()
  {
    // Retrieval of the training ID passed as a parameter
    this.internId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.internId)) {
      this.internStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceIntern.findInternById(this.internId).subscribe({
      next: (value) => {
        this.intern = value;

        if (this.intern == undefined) {
          this.internStatus = false
        }

        this.fieldPhotoIntern = this.intern.photo;
      },
      error: () => {
        this.internStatus = false;
      }
    });
  }

  /**
   * Manage form processing
   *
   * @param formEditIntern
   */
  submitHandler(formEditIntern: NgForm) {
    this.formEditInternIsSubmitted = true;
    console.log(formEditIntern.value)

    if (formEditIntern.value.civility.length == 0) {
      this.fieldCivilityIntern = false;
      this.numberOfErrors += 1;
    }

    if (formEditIntern.value.civility.length > 0) {
      this.fieldCivilityIntern = true;
    }

    if (formEditIntern.value.lastname.length == 0) {
      this.fieldLastnameIntern = false;
      this.numberOfErrors += 1;
    }

    if (formEditIntern.value.lastname.length > 0) {
      this.fieldLastnameIntern = true;
    }

    if (formEditIntern.value.firstname.length == 0) {
      this.fieldFirstnameIntern = false;
      this.numberOfErrors += 1;
    }

    if (formEditIntern.value.firstname.length > 0) {
      this.fieldFirstnameIntern = true;
    }

    if (formEditIntern.value.phoneNumber.length == 0) {
      this.fieldPhoneNumberIntern = false;
      this.numberOfErrors += 1;
    }

    if (formEditIntern.value.phoneNumber.length > 0) {
      this.fieldPhoneNumberIntern = true;
    }

    if (formEditIntern.value.emailAddress.length == 0) {
      this.fieldEmailAddressIntern = false;
      this.numberOfErrors += 1;
    }

    if (formEditIntern.value.emailAddress.length > 0) {
      this.fieldEmailAddressIntern = true;
    }

    if (this.numberOfErrors == 0) {
      this.serviceIntern.updateIntern(this.intern.id, formEditIntern.value).subscribe({
        next: () => {
          this.message = "Les données du stagiaire ont été mise a jour avec suces";
          this.formEditInternIsSubmitted = false;
          this.dataSend = true;
          this.fieldCivilityIntern = true;
          this.fieldLastnameIntern = true;
          this.fieldFirstnameIntern = true;
          this.fieldEmailAddressIntern = true;
          this.fieldPhoneNumberIntern = true;
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    }
  }
}
