import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  errorMessage = "";
  categorySelectedName = "";
  categorySelectedId: any;

  constructor(
    private serviceCategory: CategoryService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.errorMessage = "";

    this.serviceCategory.findAll().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  addCategory() {
    this.router.navigate(["/category/add"])
  }

  editCategory(idCategory: any) {
    this.router.navigate(["/category/edit", idCategory])
  }

  deleteCategory(category: any) {
    this.categorySelectedName = category.name
    this.categorySelectedId = category.id
  }

  confirmDeleteCategory($event: any) {
    if ($event.target.innerText == "Oui") {
      this.serviceCategory.delete(this.categorySelectedId).subscribe({
        next: () => {
          this.getAllCategories()
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
