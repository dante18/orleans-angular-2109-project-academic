import {Component, OnInit} from '@angular/core';
import {FormationService} from "../../services/formation.service";
import {InternService} from "../../services/intern.service";

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
    const year = today.getFullYear();
    const month = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    const day = (today.getMonth() + 1) < 10 ? "0" + today.getDate() : today.getDate();

    const curentDate = year + '-' + month + '-' + day;

    console.log(curentDate);
    this.serviceFormation.findAllFormation().subscribe({
      next: (value: any) => {
        value.forEach((formation: any) => {
          let dateAvailable = formation.dateAvailable.split("T")[0];

          if (new Date(dateAvailable) > new Date(curentDate)) {
            this.numberTotalOfComingSoonFormation += 1;
          } else if (dateAvailable == curentDate) {
            this.formationList.push(formation);
          } else {
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
