import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models/formation";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  #baseUrl = "http://localhost:3000/api/categories";

  constructor(private http: HttpClient) { }

  findAllCategory(): Observable<any> {
    return this.http.get<Formation[]>(this.#baseUrl);
  }
}
