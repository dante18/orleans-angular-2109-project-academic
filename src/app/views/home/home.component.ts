import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../services/formation.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numberTotalOfAvailableFormation = 0;
  numberTotalOfComingSoonFormation = 0;
  numberTotalOfIntern = 0;
  formationList: any[] = [];

  constructor(private serviceFormation: FormationService) { }

  ngOnInit(): void {
    this.getFormationList();
    this.getNotificationData();
  }

  /**
   * Recovery of data used to display data from notification cards
   */
  getNotificationData(): any
  {
    this.numberTotalOfIntern = 12;
  }

  /**
   * Retrieves the list of formation
   */
  getFormationList(): any
  {
    const today = new Date();
    const curentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    this.serviceFormation.findAllFormation().subscribe({
      next: (value: any) => {
        /* Retrieve formation list */
        value.forEach((formation: any) => {
          let dateAvailable = formation.dateAvailable.split("T")[0];

          if(new Date(dateAvailable) > new Date(curentDate)){
            this.numberTotalOfComingSoonFormation += 1;
          } else {
            this.numberTotalOfAvailableFormation += 1;
            this.formationList.push(formation);
          }
        });
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }
}
