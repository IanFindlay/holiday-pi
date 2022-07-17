import { Component, OnInit } from '@angular/core';

import {
  Airport,
  Airports,
  FlexObject,
  RouteDetails,
} from '../shared/interfaces';
import { AirportsService } from '../services/airports.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  airports?: Airport[];
  idToNameId?: FlexObject;
  error?: string;

  constructor(private airportsService: AirportsService) {}

  ngOnInit(): void {
    this.getAirports();
  }

  private NameIdFromId(airports?: Airport[]): void {
    const refObj: FlexObject = {};
    airports?.forEach((airport) => {
      refObj[airport.id] = `${airport.name} (${airport.id})`;
    });
    this.idToNameId = refObj;
  }

  getAirports(): void {
    this.error = undefined;
    this.airportsService
      .getAirports()
      .pipe(catchError((error) => (this.error = error)))
      .subscribe((response) => {
        const airports = <Airports>response;
        this.airports = airports.airports.sort((a: Airport, b: Airport) =>
          a.name.localeCompare(b.name)
        );
        this.NameIdFromId(this.airports);
      });
  }
}
