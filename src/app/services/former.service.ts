import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {AbstractServiceService} from "./abstract-service.service";
import {Former} from "../models/former";

@Injectable({
  providedIn: 'root'
})

export class FormerService extends AbstractServiceService {
  #baseUrl = "http://localhost:3000/formers";

  constructor(private http: HttpClient) {
    super();
  }

  delete(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }

  findAll(): Observable<any> {
    return this.http.get<Former[]>(this.#baseUrl);
  }

  findById(id: any): Observable<any> {
    return this.http.get<Former>(this.#baseUrl + "/" + id);
  }

  update(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  add(data:any): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(data);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }
}
