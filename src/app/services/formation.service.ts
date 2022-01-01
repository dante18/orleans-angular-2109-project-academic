import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../models/formation";
import {AbstractServiceService} from "./abstract-service.service";

@Injectable({
  providedIn: 'root'
})

export class FormationService extends AbstractServiceService {
  #baseUrl = "http://localhost:3000/formations";

  constructor(private http: HttpClient) {
    super();
  }

  delete(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }

  findAll(): Observable<any> {
    return this.http.get<Formation[]>(this.#baseUrl);
  }

  findByCriteria(criteria:any): any {
    let errorMessage = "";
    let formations:any[] = [];

    this.http.get<Formation[]>(this.#baseUrl).subscribe({
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
    return this.http.get<Formation>(this.#baseUrl + "/" + id);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  add(formation: Formation): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(formation);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }
}
