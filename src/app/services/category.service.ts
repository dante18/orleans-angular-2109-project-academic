import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {AbstractServiceService} from "./abstract-service.service";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})

export class CategoryService extends AbstractServiceService {
  #baseUrl = "http://localhost:3000/categories";

  constructor(private http: HttpClient) {
    super();
  }

  delete(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + id);
  }

  findAll(): Observable<any> {
    return this.http.get<Category[]>(this.#baseUrl);
  }

  findByCriteria(criteria:any): any {
    let errorMessage = "";
    let formations:any[] = [];

    this.http.get<Category[]>(this.#baseUrl).subscribe({
      next: (value) => {
        value.forEach((item: any) => {
          if (item.category == criteria){
            formations.push(item)
          }
        })
      },
      error: (error) => {
        errorMessage = error.message;
      },
      complete: () => {
        console.log("La réception des données est terminée.");
      }
    });

    return formations
  }

  findById(id: any): Observable<any> {
    return this.http.get<Category>(this.#baseUrl + "/" + id);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + id, data);
  }

  add(data:any): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(data);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }
}
