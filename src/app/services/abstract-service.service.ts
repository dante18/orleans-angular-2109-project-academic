import {Observable} from "rxjs";

export abstract class AbstractServiceService {
  protected constructor() {}

  public abstract findAll(): Observable<any>;

  public abstract findById(id: any): Observable<any>;

  public abstract findByCriteria(criteria: any): any;

  public abstract add(data:any): Observable<any>;

  public abstract update(id:any, data:any): Observable<any>;

  public abstract delete(id:any): Observable<any>;
}
