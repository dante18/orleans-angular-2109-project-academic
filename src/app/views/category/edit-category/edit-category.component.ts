import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  category: any
  idCategory: any
  categoryStatus = true
  message = ""
  httpCode = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceCategory: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieval of the training ID passed as a parameter
    this.idCategory = parseInt(this.routeActive.snapshot.paramMap.get("id")!);
    if(isNaN(this.idCategory)) {
      this.categoryStatus = false;
      return;
    }

    // Data recovery thanks to idCategory
    this.serviceCategory.findById(this.idCategory).subscribe({
      next: (value:any) => {
        this.category = value;

        if (this.category == undefined) {
          this.categoryStatus = false
        }
      },
      error: (error:any) => {
        this.categoryStatus = false;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  submitHandler(formEditCategory: NgForm) {
    this.idCategory = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.idCategory)) {
      this.categoryStatus = false;
      return;
    }

    this.serviceCategory.update(this.idCategory, formEditCategory.value).subscribe({
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

  returnToListCategory() {
    this.router.navigate(['/category'])
  }
}
