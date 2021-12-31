import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation.service";

@Component({
  selector: 'app-formation-component',
  templateUrl: './formation-component.component.html',
  styleUrls: ['./formation-component.component.css']
})
export class FormationComponentComponent implements OnInit {
  dataViewType = "table"
  formations = [] as any;

  constructor(private serviceFormation: FormationService) { }

  ngOnInit(): void
  {
    this.formations = this.serviceFormation.getAllFormation();
  }

  getServiceFormation()
  {
    return this.serviceFormation;
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
}
