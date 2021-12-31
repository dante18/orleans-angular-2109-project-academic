import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../../services/formation.service";

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {
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
}
