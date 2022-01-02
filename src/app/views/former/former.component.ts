import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Former} from "../../models/former";
import {FormerService} from "../../services/former.service";

@Component({
  selector: 'app-former',
  templateUrl: './former.component.html',
  styleUrls: ['./former.component.css']
})
export class FormerComponent implements OnInit {

  formers: Former[] = [];
  errorMessage = "";
  formerSelectedName = "";
  formerSelectedId: any;

  constructor(
    private serviceFormer: FormerService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllFormers();
  }

  getAllFormers() {
    this.errorMessage = "";

    this.serviceFormer.findAll().subscribe({
      next: (value) => {
        this.formers = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  addFormer() {
    this.router.navigate(["/former/add"])
  }

  editFormer(idFormer: any) {
    this.router.navigate(["/former/edit", idFormer])
  }

  deleteFormer(former: any) {
    this.formerSelectedName = former.name
    this.formerSelectedId = former.id
  }

  confirmDeleteFormer($event: any) {
    if ($event.target.innerText == "Oui") {
      this.serviceFormer.delete(this.formerSelectedId).subscribe({
        next: () => {
          this.getAllFormers()
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
        complete: () => {
          console.log("La réception des données est terminée.");
        }
      });
    }
  }
}
