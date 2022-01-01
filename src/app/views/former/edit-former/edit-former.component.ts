import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {FormerService} from "../../../services/former.service";

@Component({
  selector: 'app-edit-former',
  templateUrl: './edit-former.component.html',
  styleUrls: ['./edit-former.component.css']
})
export class EditFormerComponent implements OnInit {
  former: any
  idFormer: any
  formerStatus = true
  message = ""
  httpCode = 0

  constructor(
    private routeActive: ActivatedRoute,
    private serviceFormer: FormerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Retrieval of the training ID passed as a parameter
    this.idFormer = parseInt(this.routeActive.snapshot.paramMap.get("id")!);
    if(isNaN(this.idFormer)) {
      this.formerStatus = false;
      return;
    }

    // Data recovery thanks to idCategory
    this.serviceFormer.findById(this.idFormer).subscribe({
      next: (value:any) => {
        this.former = value;

        if (this.former == undefined) {
          this.formerStatus = false
        }
      },
      error: (error:any) => {
        this.formerStatus = false;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });
  }

  submitHandler(formEditFormer: NgForm) {
    this.idFormer = parseInt(this.routeActive.snapshot.paramMap.get("id")!);

    if(isNaN(this.idFormer)) {
      this.formerStatus = false;
      return;
    }

    this.serviceFormer.update(this.idFormer, formEditFormer.value).subscribe({
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

  returnToListFormer() {
    this.router.navigate(['/former'])
  }
}
