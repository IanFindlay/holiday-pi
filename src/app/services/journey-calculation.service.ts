import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JourneyDetails } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class JourneyCalculationService {
  constructor(private http: HttpClient) {}

  calculateJourney(
    distance: string,
    numPassengers: number
  ): Observable<JourneyDetails> {
    return this.http.get<JourneyDetails>(
      `https://holiday-pi.herokuapp.com/api/journey?distance=${distance}&numPassengers=${numPassengers}`
    );
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
          'Something went wrong when investigating your journey to the airport; please try again later'
        )
    );
  }
}
