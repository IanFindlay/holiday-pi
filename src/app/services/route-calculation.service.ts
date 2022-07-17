import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Airport, RouteDetails } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class RouteCalculationService {
  private routeUrl = 'https:holiday-pi.herokuapp.com/api/airports';

  constructor(private http: HttpClient) {}

  calculateRoute(
    numPassengers: number,
    departure: Airport,
    destination: Airport
  ): Observable<RouteDetails> {
    return this.http
      .get<RouteDetails>(
        `${this.routeUrl}/${departure.id}/to/${destination.id}?numPassengers=${numPassengers}`
      )
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
          'Something went wrong when investigating your airline journey; please try again later'
        )
    );
  }
}
