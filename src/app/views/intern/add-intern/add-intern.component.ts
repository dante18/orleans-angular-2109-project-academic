import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {FormerService} from "../../../services/former.service";
import {InternService} from "../../../services/intern.service";

@Component({
  selector: 'app-add-intern',
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.css']
})
export class AddInternComponent implements OnInit {
  message = "";
  httpCode: number = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceIntern: InternService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  returnToListIntern() {
    this.router.navigate(['/intern'])
  }

  submitHandler(formAddIntern: NgForm) {
    this.serviceIntern.add(formAddIntern.value).subscribe({
      next: () => {
        this.message = "Le stagiaire a ete ajouté avec success";
        this.httpCode = 200;
      },
      error: (error) => {
        this.message = error.message;
        this.httpCode = 404
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }
}
