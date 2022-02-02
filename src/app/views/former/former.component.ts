import {Component, OnInit} from '@angular/core';
import {FormerService} from "../../services/former.service";
import {Former} from "../../models/former";

@Component({
  selector: 'app-former',
  templateUrl: './former.component.html',
  styleUrls: ['./former.component.css']
})
export class FormerComponent implements OnInit {
  formerList: Former[] = [];
  displayDataMethod = "table";
  textDefault = "Aucune données n'a été trouvé";
  numberOfFormer = 0;
  numberItemToDisplay = 10;
  formerSelectedId: any;
  modalTitle = "";

  constructor(private serviceFormer: FormerService) {
  }

  ngOnInit(): void {
    this.getFormerList();
  }

  /**
   * Retrieves the list of formation
   */
  getFormerList(): any {
    this.serviceFormer.findAllFormer().subscribe({
      next: (value: any) => {
        this.formerList = value;
        this.numberOfFormer = value.length;
      },
      error: (error) => {
        console.log(`Failed to retrieve data. Error invoked:${error.message}`);
      }
    });
  }

  /**
   * Modify the display of data according to the selected method
   *
   * @param $event
   */
  btnHandlerDisplayDataMethod($event: any) {
    $event.preventDefault();

    if ($event.target.innerText == "Tableau") {
      this.displayDataMethod = "table";
    } else if ($event.target.innerText == "Liste") {
      this.displayDataMethod = "list";
    }
  }

  /**
   * Manage actions related to the search form
   *
   * @param formSearch
   */
  eventSearchHandler(formSearch: any) {
    let formerName = formSearch.value.searchFormer;

    if (formerName.length == 0) {
      this.getFormerList();
    } else {
      this.serviceFormer.findFormerByName(formerName).subscribe({
        next: (value: any) => {
          this.formerList = value;
          this.numberOfFormer = value.length;

          if (this.numberOfFormer == 0) {
            this.textDefault = "La recherche n'a retourné aucun résultat";
          }
        },
        error: () => {
          this.numberOfFormer = 0;
          this.textDefault = "La recherche n'a retourné aucun résultat";
        }
      });
    }
  }

  /**
   * handles the confirmation request before deleting
   *
   * @param $event
   */
  confirmDeleteFormation($event: any)
  {
    if ($event.choice == "Oui") {
      this.serviceFormer.deleteFormer(this.formerSelectedId).subscribe({
        next: () => {
          this.getFormerList()
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  /**
   *
   * @param formation
   */
  deleteFormation(formation: any)
  {
    this.modalTitle = "Confirmez-vous la suppression";
    this.formerSelectedId = formation.id;
  }
}
