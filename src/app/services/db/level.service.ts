import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../../models/level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  #baseUrl = "http://localhost:3000/api/levels";

  constructor(private http: HttpClient) { }

  findAllLevel(): Observable<any> {
    return this.http.get<Level[]>(this.#baseUrl);
  }
}
