import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  #baseUrl = "http://localhost:3000/api/categories";

  constructor(private http: HttpClient) { }

  findAllCategory(): Observable<any> {
    return this.http.get<Category[]>(this.#baseUrl);
  }

  findCategoryById(id: any): Observable<any> {
    return this.http.get<Category>(this.#baseUrl + "/" + id);
  }

  findCategoryByName(name: any): Observable<any> {
    return this.http.get<Category>(this.#baseUrl + "/search/" + name);
  }

  addCategory(data:any): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(data);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }

  updateCategory(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  deleteCategory(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }
}
