import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.css']
})
export class EditFormationComponent implements OnInit {
  formation: any
  idFormation: any
  formationStatus = true

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
    this.formation = this.serviceFormation.getFormation(this.idFormation)

    if (this.formation == undefined) {
      this.formationStatus = false
    }
  }

  returnToListFormation() {
    this.router.navigate(['/formation'])
  }

  updateFormation(form: NgForm) {
    this.serviceFormation.updateFormation(this.idFormation, form.value)
    console.log(this.serviceFormation.getFormation(this.idFormation))
  }
}
