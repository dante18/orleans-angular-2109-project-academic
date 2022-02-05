import {Component, OnInit} from '@angular/core';
import {InternService} from "../../services/intern.service";
import {Intern} from "../../models/intern";

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.css']
})
export class InternComponent implements OnInit {
  internList: Intern[] = [];
  displayDataMethod = "table";
  textDefault = "Aucune données n'a été trouvé";
  numberOfFIntern = 0;
  numberItemToDisplay = 10;
  internSelectedId: any;
  modalTitle = "";

  constructor(private serviceIntern: InternService) {
  }

  ngOnInit(): void {
    this.getInternList();
  }

  /**
   * Retrieves the list of interns
   */
  getInternList(): any {
    this.serviceIntern.findAllIntern().subscribe({
      next: (value: any) => {
        this.internList = value;
        this.numberOfFIntern = value.length;
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
    let internName = formSearch.value.searchIntern;

    if (internName.length == 0) {
      this.getInternList();
    } else {
      this.serviceIntern.findInternByName(internName).subscribe({
        next: (value: any) => {
          this.internList = value;
          this.numberOfFIntern = value.length;

          if (this.numberOfFIntern == 0) {
            this.textDefault = "La recherche n'a retourné aucun résultat";
          }
        },
        error: () => {
          this.numberOfFIntern = 0;
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
  confirmDeleteIntern($event: any)
  {
    if ($event.choice == "Oui") {
      this.serviceIntern.deleteIntern(this.internSelectedId).subscribe({
        next: () => {
          this.getInternList();
        },
        error: (error) => {
          console.log(`Failed to retrieve data. Error invoked:${error.message}`);
        }
      });
    }
  }

  /**
   *
   * @param intern
   */
  deleteIntern(intern: any)
  {
    this.modalTitle = "Confirmez-vous la suppression";
    this.internSelectedId = intern.id;
  }
}
