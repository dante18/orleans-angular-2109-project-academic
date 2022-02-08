import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormationService} from "../../../services/formation.service";

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})

export class DetailFormationComponent implements OnInit {
  formation: any;
  formationId: any
  formationStatus = true

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormation: FormationService,
  ) { }

  ngOnInit(): void {
    this.getFormationDetail();
  }

  getFormationDetail()
  {
    // Retrieval of the training ID passed as a parameter
    this.formationId = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.formationId)) {
      this.formationStatus = false;
      return;
    }

    // Data recovery thanks to idFormation
    this.serviceFormation.findFormationById(this.formationId).subscribe({
      next: (value) => {
        this.formation = value;

        if (this.formation == undefined) {
          this.formationStatus = false
        }
      },
      error: () => {
        this.formationStatus = false;
      }
    });
  }
}
