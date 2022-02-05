import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models/formation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  #baseUrl = "http://localhost:3000/api/formations";

  constructor(private http: HttpClient) { }

  findAllFormation(): Observable<any> {
    return this.http.get<Formation[]>(this.#baseUrl);
  }

  findFormationById(id: any): Observable<any> {
    return this.http.get<Formation>(this.#baseUrl + "/" + id);
  }

  findFormationByName(name: any): Observable<any> {
    return this.http.get<Formation>(this.#baseUrl + "/search/" + name);
  }

  findFormationByCategory(name: any): Observable<any> {
    return this.http.get<Formation>(this.#baseUrl + "/category/" + name);
  }

  addFormation(formation: Formation): Observable<any> {
    const headers = {
      "content-type": "application/json",
    };

    const corpsMessage = JSON.stringify(formation);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }

  updateFormation(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  deleteFormation(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }
}
