import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {InternService} from "../../../services/intern.service";

@Component({
  selector: 'app-edit-intern',
  templateUrl: './edit-intern.component.html',
  styleUrls: ['./edit-intern.component.css']
})
export class EditInternComponent implements OnInit {
  intern: any
  idIntern: any
  internStatus = true
  message = ""
  httpCode = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceIntern: InternService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieval of the training ID passed as a parameter
    this.idIntern = parseInt(this.routeActive.snapshot.paramMap.get("id")!);
    if(isNaN(this.idIntern)) {
      this.internStatus = false;
      return;
    }

    // Data recovery thanks to idCategory
    this.serviceIntern.findById(this.idIntern).subscribe({
      next: (value:any) => {
        this.intern = value;

        if (this.intern == undefined) {
          this.internStatus = false
        }
      },
      error: (error:any) => {
        this.internStatus = false;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  submitHandler(formEditIntern: NgForm) {
    this.idIntern = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.idIntern)) {
      this.internStatus = false;
      return;
    }

    this.serviceIntern.update(this.idIntern, formEditIntern.value).subscribe({
      next: () => {
        this.message = "La categorie a ete ajouté avec success";
        this.httpCode = 200;
      },
      error: (error:any) => {
        this.message = error.message;
        this.httpCode = 404
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  returnToListIntern() {
    this.router.navigate(['/intern'])
  }
}
