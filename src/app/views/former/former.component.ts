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
  textDefault = "Aucune données n'a été trouvée";
  numberOfFormer = 0;
  formerSelectedId: any;
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

  constructor(private serviceFormer: FormerService) {
  }

  ngOnInit(): void {
    this.getFormerList();
  }

  /**
   * Retrieves the list of formation
   */
  getFormerList(): any
  {
    this.serviceFormer.findAllFormer().subscribe({
      next: (value: any) => {
        this.formerList = value;
        this.dataSets = this.formerList;
        this.numberOfFormer = this.formerList.length  > 1 ? this.formerList.length - 1 : this.formerList.length;
        this.numberPageTotal = Math.ceil(this.numberOfFormer / this.numberItemToDisplay);

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
  btnHandlerDisplayDataMethod($event: any)
  {
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
  eventSearchHandler(formSearch: any)
  {
    let formerName = formSearch.value.searchFormer;

    if (formerName.length == 0) {
      this.pageNumberList = [];
      this.getFormerList();
    } else {
      const formerList = this.formerList;
      this.formerList = [];
      this.dataSets = [];
      this.numberOfFormer = 0;
      this.pageNumberList = [];

      formerList.forEach((former) => {
        if (former.lastname!.toLowerCase().search(formerName.toLowerCase()) != -1
          || former.firstname!.toLowerCase().search(formerName.toLowerCase()) != -1) {
          this.formerList.push(former);
        }
      });

      this.dataSets = this.formerList;
      this.numberOfFormer = this.dataSets.length > 1 ? this.dataSets.length - 1 : this.dataSets.length;
      this.numberPageTotal = Math.ceil(this.numberOfFormer / this.numberItemToDisplay);

      if (this.numberOfFormer > this.numberItemToDisplay) {
        for (let i = 0; i < this.numberPageTotal; i++) {
          this.pageNumberList.push(i + 1);
        }
      } else {
        this.pageNumberList = [1];
      }

      if (this.numberOfFormer == 0) {
        this.textDefault = "La recherche n'a retourné aucun résultat";
      }
    }
  }

  /**
   * handles the confirmation request before deleting
   *
   * @param $event
   */
  confirmDeleteFormer($event: any)
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
   * @param former
   */
  deleteFormer(former: any)
  {
    this.modalTitle = "Confirmez-vous la suppression ?";
    this.formerSelectedId = former.id;
  }

  /**
   *
   * @param page
   * @param $event
   */
  btnHandlerPagination(page: any, $event: any)
  {
    $event.preventDefault();
    this.numberPage = page;
    let offSet = 1;
    let index = 0;
    let data = this.formerList;

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
    } else if(this.numberPage > this.formerList.length) {
      index = page - 1;
      offSet = this.formerList.length;
    } else {
      index = this.numberPage * this.numberItemToDisplay - this.numberItemToDisplay
      offSet = index + this.numberItemToDisplay;
    }

    this.dataSets = data.slice(index, offSet);
  }
}
