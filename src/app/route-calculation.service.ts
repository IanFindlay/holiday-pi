import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airport, RouteDetails } from './shared/interfaces';

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
    return this.http.get<RouteDetails>(`${this.routeUrl}/${departure.id}/to/${destination.id}?numPassengers=${numPassengers}`);
  }
}
