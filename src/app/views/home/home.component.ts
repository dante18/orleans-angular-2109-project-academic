import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation.service";
import {Formation} from "../../models/formation";
import {InternService} from "../../services/intern.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numberTotalOfFormation = 0;
  numberTotalOfIntern = 0;
  formationList: Formation[] = [];

  constructor(private serviceFormation: FormationService, private serviceIntern: InternService) { }

  ngOnInit(): void {
    this.getNotificationData();
  }

  getNotificationData()
  {
    this.serviceFormation.findAllFormation().subscribe({
      next: (value) => {
        value.forEach((formation:any) => {
          if (formation.isAvailable) {
            this.formationList.push(formation);
            this.numberTotalOfFormation += 1;
          }
        })
      },
      error: (error) => {
        console.log("The data could not be retrieved. Error invoked : " + error.message)
      },
      complete: () => {
        console.log("The data has been successfully recovered");
      }
    });

    this.serviceIntern.findAll().subscribe({
      next: (value) => {
        value.forEach((intern:any) => {
          this.numberTotalOfIntern += 1
        })
      },
      error: (error) => {
        console.log("The data could not be retrieved. Error invoked : " + error.message)
      },
      complete: () => {
        console.log("The data has been successfully recovered");
      }
    });
  }
}
