import { Component, OnInit } from '@angular/core';

import { Airport } from '../shared/interfaces';
import { AirportsService } from '../airports.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  airportsLoading = false;
  airports!: Airport[];
  numPassengers?: number;

  constructor(
    private airportsService: AirportsService,
  ) {}

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports(): void {
    this.airportsLoading = true;
    this.airportsService.getAirports().subscribe((airports) => {
      this.airports = airports.airports.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      this.airportsLoading = false;
    });
  }
}
