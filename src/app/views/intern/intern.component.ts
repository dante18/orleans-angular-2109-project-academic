import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Intern} from "../../models/intern";
import {InternService} from "../../services/intern.service";

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.css']
})
export class InternComponent implements OnInit {

  interns: Intern[] = [];
  errorMessage = "";
  internSelectedName = "";
  internSelectedId: any;

  constructor(
    private serviceIntern: InternService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllInterns();
  }

  getAllInterns() {
    this.errorMessage = "";

    this.serviceIntern.findAll().subscribe({
      next: (value) => {
        this.interns = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  addIntern() {
    this.router.navigate(["/intern/add"])
  }

  editIntern(idCategory: any) {
    this.router.navigate(["/intern/edit", idCategory])
  }

  deleteIntern(intern: any) {
    this.internSelectedName = intern.name
    this.internSelectedId = intern.id
  }

  confirmDeleteIntern($event: any) {
    if ($event.target.innerText == "Oui") {
      this.serviceIntern.delete(this.internSelectedId).subscribe({
        next: () => {
          this.getAllInterns()
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
