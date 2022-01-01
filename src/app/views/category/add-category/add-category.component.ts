import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  message = "";
  httpCode: number = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceCategory: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  returnToListFormation() {
    this.router.navigate(['/category'])
  }

  submitHandler(formEditCategory: NgForm) {
    this.serviceCategory.add(formEditCategory.value).subscribe({
      next: () => {
        this.message = "La category a ete ajouté avec success";
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
