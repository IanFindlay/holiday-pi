import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JourneyDetails } from './shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JourneyCalculationService {

  private journeyUrl = 'https:holiday-pi.herokuapp.com/api/journey';

  constructor(private http: HttpClient) {}

  calculateJourney(distance: string, numPassengers: number): Observable<JourneyDetails> {
    return this.http.get<JourneyDetails>(`${this.journeyUrl}?distance=${distance}&numPassengers=${numPassengers}`);
  }
}
