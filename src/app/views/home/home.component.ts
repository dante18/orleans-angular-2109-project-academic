import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../services/db/formation.service";
import {InternService} from "../../services/db/intern.service";

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

  constructor(
    private serviceFormation: FormationService,
    private serviceIntern: InternService) {
  }

  ngOnInit(): void {
    this.getFormationList();
    this.getNotificationData();
  }

  /**
   * Recovery of data used to display data from notification cards
   */
  getNotificationData(): any {
    this.serviceIntern.findAllIntern().subscribe({
      next: (value: any) => {
        this.numberTotalOfIntern = value.length;
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Retrieves the list of formation
   */
  getFormationList(): any {
    const today = new Date();
    const curentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.serviceFormation.findAllFormation().subscribe({
      next: (value: any) => {
        value.forEach((formation: any) => {
          let dateAvailable = formation.dateAvailable.split("T")[0];

          if (new Date(dateAvailable) > new Date(curentDate)) {
            this.numberTotalOfComingSoonFormation += 1;
          } else if (new Date(dateAvailable) == new Date(curentDate)) {
            this.formationList.push(formation);
          }
          else {
            this.numberTotalOfAvailableFormation += 1;
          }
        });
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }
}
