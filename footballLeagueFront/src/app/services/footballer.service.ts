import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Footballer, FootballerAdapter} from '../models/footballer.model';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {option, restPath} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FootballerService {

  private restPath = restPath.restPath + '/footballer/';

  constructor( private http: HttpClient, private footballerAdapter: FootballerAdapter) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  getFootballers(): Observable<Footballer[]> {
    return this.http.get(this.restPath).pipe(
      map( (data: any) => data.footballers.map( item => this.footballerAdapter.adapt(item)
      )),
      catchError(this.handleError)
    );
  }

  getFootballer(id: number): Observable<Footballer> {
    return this.http.get(this.restPath + id).pipe(
      map( (data: any) => this.footballerAdapter.adapt(data)
      ),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line:ban-types
  getPositions(): Observable<String[]> {
    return this.http.get(this.restPath + 'positions').pipe(
      map( (data: any) => data.map( item => item)),
      catchError(this.handleError)
    );
  }

  removeFootballer(id: number): Observable<any> {
    return this.http.delete(this.restPath + id , {observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }

  updateFootballer(footballer: Footballer): Observable<any> {
    return this.http.post(this.restPath + footballer.id + '/update', JSON.stringify(footballer), option).pipe(
      catchError(this.handleError)
    );
  }

  addFootballer(footballer: Footballer): Observable<any> {
    return this.http.post(this.restPath + 'add', JSON.stringify(footballer), option).pipe(
      catchError(this.handleError)
    );
  }

  assignClub(footballerId: number, clubId: number): Observable<any> {
    if (clubId != null) {
      return this.http.get(this.restPath + footballerId + '/update/club/' + clubId).pipe(
        catchError(this.handleError)
      );
    } else {
      return this.http.get(this.restPath + footballerId + '/update/club/null').pipe(
        catchError(this.handleError)
      );
    }
  }


}
