import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { Airports } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private airportsUrl = 'https:holiday-pi.herokuapp.com/api/airports';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airports> {
    return this.http
      .get<Airports>(this.airportsUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () =>
        new Error(
          'Something went wrong when trying to fetch the list of airports; please try again later'
        )
    );
  }
}
