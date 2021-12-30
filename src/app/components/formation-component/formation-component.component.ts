import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formation-component',
  templateUrl: './formation-component.component.html',
  styleUrls: ['./formation-component.component.css']
})
export class FormationComponentComponent implements OnInit {
  dataViewType = "table"

  constructor() { }

  ngOnInit(): void {
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
