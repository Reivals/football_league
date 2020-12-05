import { Injectable } from '@angular/core';
import {option, restPath} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Goal, GoalAdapter} from '../models/goal.model';
import {Card} from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private restPath = restPath.restPath + '/card/';
  constructor(
    private http: HttpClient,
    private goalAdapter: GoalAdapter
  ) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: `, error.error);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  getCards(): Observable<Card[]> {
    return this.http.get(this.restPath).pipe(
      map((data: any) => data.map(item => this.goalAdapter.adapt(item))),
      catchError(this.handleError)
    );
  }

  addCard(card: Card): Observable<any> {
    return this.http.post(this.restPath, JSON.stringify(card), option).pipe(
      catchError(this.handleError)
    );
  }

  removeCard(id: number): Observable<any> {
    return this.http.delete(this.restPath + `${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateCard(card: Card): Observable<any> {
    return this.http.post(this.restPath + `${card.id}/update`, JSON.stringify(card), option).pipe(
      catchError(this.handleError)
    );
  }


  getCardTypes() {
    return this.http.get(this.restPath + 'cardTypes/').pipe(
      catchError(this.handleError)
    );
  }
}
