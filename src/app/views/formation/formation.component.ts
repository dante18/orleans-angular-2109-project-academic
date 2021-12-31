import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  dataViewType = "table"
  formations = [] as any;

  constructor(private serviceFormation: FormationService, private router: Router) { }

  ngOnInit(): void
  {
    this.formations = this.serviceFormation.getAllFormation();
  }

  changeDataView($event:any):void
  {
    if ($event.target.innerText == "Tableau") {
      this.dataViewType = "table"
    } else if ($event.target.innerText == "Card") {
      this.dataViewType = "card"
    } else {
      this.dataViewType = "table"
    }
  }

  getFormation(formation: any)
  {
    this.router.navigate(['/formation', formation.id])
  }

}
