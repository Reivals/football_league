import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Club, ClubAdapter} from '../models/club.model';
import {option, restPath} from '../../environments/environment';
import {Footballer, FootballerAdapter} from '../models/footballer.model';


@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private restPath = restPath.restPath + '/club/';

  constructor(private http: HttpClient, private clubAdapter: ClubAdapter, private footballerAdapter: FootballerAdapter) {
  }

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

  getClubs(): Observable<Club[]> {
    return this.http.get(this.restPath).pipe(
      map((data: any) => data.map(item => this.clubAdapter.adapt(item)
      )),
      catchError(this.handleError)
    );
  }

  getClub(id: number): Observable<Club> {
    return this.http.get(this.restPath + id).pipe(
      map((data: any) => this.clubAdapter.adapt(data)
      ),
      catchError(this.handleError)
    );
  }

    getFootballersFromClub(id: number): Observable<Footballer[]> {
      return this.http.get(this.restPath + id + '/').pipe(
        map((data: any) => data.footballers.map(item => this.footballerAdapter.adapt(item)
        )),
        catchError(this.handleError)
      );
    }

  removeClub(id: number): Observable<any> {
    return this.http.delete(this.restPath + id + '/', {observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }

  updateClub(club: Club): Observable<any> {
    return this.http.put(this.restPath + club.id + '/', JSON.stringify(club), option).pipe(
      catchError(this.handleError)
    );
  }

  addClub(club: Club): Observable<any> {
    return this.http.post(this.restPath, JSON.stringify(club), option).pipe(
      catchError(this.handleError)
    );
  }

}
