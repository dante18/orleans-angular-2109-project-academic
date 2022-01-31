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
}
