import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Intern} from "../../models/intern";

@Injectable({
  providedIn: 'root'
})

export class InternService {
  #baseUrl = "http://localhost:3000/api/interns";

  constructor(private http: HttpClient) {}

  findAllIntern(): Observable<any> {
    return this.http.get<Intern[]>(this.#baseUrl);
  }

  findInternById(id: any): Observable<any> {
    return this.http.get<Intern>(this.#baseUrl + "/" + id);
  }

  findInternByName(name: any): Observable<any> {
    return this.http.get<Intern>(this.#baseUrl + "/search/" + name);
  }

  addIntern(data:any): Observable<any> {
    const headers = {
      "content-type": "application/json"
    };
    const corpsMessage = JSON.stringify(data);

    return this.http.post(this.#baseUrl, corpsMessage, { "headers": headers });
  }

  updateIntern(id:any, data:any): Observable<any> {
    return this.http.put(this.#baseUrl + "/" + id, data);
  }

  deleteIntern(id:any): Observable<any> {
    return this.http.delete(this.#baseUrl + "/" + id);
  }
}
