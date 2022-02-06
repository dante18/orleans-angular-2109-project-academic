import {Component, OnInit} from '@angular/core';
import {InternService} from "../../services/db/intern.service";
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
  internSelectedId: any;
  modalTitle = "";

  /* pagination variables */
  numberItemToDisplay = 5;
  numberPageTotal = 0;
  numberPage = 1;
  nextPage = 2;
  prevPage = 1;
  pageNumberList: number[] = [];
  dataSets: any
  isSearchPagination = false;

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
        this.dataSets = this.internList;
        this.numberOfFIntern = this.internList.length  > 1 ? this.internList.length - 1 : this.internList.length;
        this.numberPageTotal = Math.ceil(this.numberOfFIntern / this.numberItemToDisplay);

        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
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
      this.pageNumberList = [];
      this.getInternList();
    } else {
      const internList = this.internList;
      this.internList = [];
      this.dataSets = [];
      this.numberOfFIntern = 0;
      this.pageNumberList = [];

      internList.forEach((intern) => {
        if (intern.lastname!.toLowerCase().search(internName.toLowerCase()) != -1
          || intern.firstname!.toLowerCase().search(internName.toLowerCase()) != -1) {
          this.internList.push(intern);
        }
      });

      this.dataSets = this.internList;
      this.numberOfFIntern = this.dataSets.length > 1 ? this.dataSets.length - 1 : this.dataSets.length;
      this.numberPageTotal = Math.ceil(this.numberOfFIntern / this.numberItemToDisplay);

      if (this.numberOfFIntern > this.numberItemToDisplay) {
        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
      } else {
        this.pageNumberList = [1];
      }

      if (this.numberOfFIntern == 0) {
        this.textDefault = "La recherche n'a retourné aucun résultat";
      }
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

  /**
   *
   * @param page
   * @param $event
   */
  btnHandlerPagination(page: any, $event: any) {
    $event.preventDefault();
    this.numberPage = page;
    let offSet = 1;
    let index = 0;
    let data = this.internList;

    /* Determines the number of the current, previous and next page */
    if (this.numberPage <= 1) {
      this.numberPage = 1;
      this.prevPage = 0;
      this.nextPage = 2;
    } else if (this.numberPage > this.numberPageTotal) {
      this.numberPage = this.numberPageTotal;
      this.prevPage = this.numberPage - 1;
      this.nextPage = this.numberPage + 1;
    } else {
      this.prevPage = this.numberPage - 1;
      this.nextPage = this.numberPage + 1;
    }

    /* Extract the data that will be displayed */
    if(this.numberPage == 1 || this.numberPage <=0)  {
      index = 0;
      offSet = this.numberItemToDisplay;
    } else if(this.numberPage > this.internList.length) {
      index = page - 1;
      offSet = this.internList.length;
    } else {
      index = this.numberPage * this.numberItemToDisplay - this.numberItemToDisplay
      offSet = index + this.numberItemToDisplay;
    }

    this.dataSets = data.slice(index, offSet);
  }
}
