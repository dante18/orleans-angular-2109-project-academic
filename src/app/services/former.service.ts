import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Former} from "../models/former";

@Injectable({
  providedIn: 'root'
})

export class FormerService {
  #baseUrl = "http://localhost:3000/formers";

  constructor(private http: HttpClient) {}

  findAllFormer(): Observable<any> {
    return this.http.get<Former[]>(this.#baseUrl);
  }

  findFormerById(id: any): Observable<any> {
    return this.http.get<Former>(this.#baseUrl + "/" + id);
  }

  findFormerByName(name: any): Observable<any> {
    return this.http.get<Former>(this.#baseUrl + "/search/" + name);
  }

  addFormer(data:any): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(data);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }

  updateFormer(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  deleteFormer(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }
}
