import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {FormerService} from "../../../services/former.service";

@Component({
  selector: 'app-edit-former',
  templateUrl: './add-former.component.html',
  styleUrls: ['./add-former.component.css']
})
export class AddFormerComponent implements OnInit {
  message = "";
  httpCode: number = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormer: FormerService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  returnToListFormer() {
    this.router.navigate(['/former'])
  }

  submitHandler(formAddFormer: NgForm) {
    this.serviceFormer.add(formAddFormer.value).subscribe({
      next: () => {
        this.message = "Le formateur a ete ajouté avec success";
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
