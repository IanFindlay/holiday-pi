import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airports } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private airportsUrl = 'https:holiday-pi.herokuapp.com/api/airports';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airports> {
    return this.http.get<Airports>(this.airportsUrl);
  }
}
