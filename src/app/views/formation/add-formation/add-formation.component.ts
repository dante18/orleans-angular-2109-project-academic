import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  message = "";
  httpCode: number = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormation: FormationService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  returnToListFormation() {
    this.router.navigate(['/formation'])
  }

  submitHandler(formEditFormation: NgForm) {
    console.log(formEditFormation.value)
    this.serviceFormation.add(formEditFormation.value).subscribe({
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
}
