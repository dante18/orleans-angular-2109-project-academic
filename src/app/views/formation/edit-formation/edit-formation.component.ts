import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";
import {NgForm} from "@angular/forms";
// import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  formation: any
  idFormation: any
  formationStatus = true
  message = ""
  httpCode = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormation: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieval of the training ID passed as a parameter
    this.idFormation = parseInt(this.routeActive.snapshot.paramMap.get("id")!);
    if(isNaN(this.idFormation)) {
      this.formationStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormation.findById(this.idFormation).subscribe({
      next: (value) => {
        this.formation = value;

        if (this.formation == undefined) {
          this.formationStatus = false
        }
      },
      error: (error) => {
        this.formationStatus = false;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  submitHandler(formEditFormation: NgForm) {
    this.idFormation = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.idFormation)) {
      this.formationStatus = false;
      return;
    }

    this.serviceFormation.update(this.idFormation, formEditFormation.value).subscribe({
      next: () => {
        this.message = "La formation a ete ajouté avec success";
        this.httpCode = 200;
      },
      error: (error) => {
        this.message = error.message;
        this.httpCode = 404
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  returnToListFormation() {
    this.router.navigate(['/formation'])
  }
}
