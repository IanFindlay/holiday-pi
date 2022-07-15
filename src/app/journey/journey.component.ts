import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AirportsService } from '../airports.service';
import { noNonIntegers } from '../customValidators.directive';
import { Airport } from '../interfaces';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  sectionHeading = 'The Case of the Cheapest Way to Get to the Airport';

  airports: Airport[] = [];

  selectedAirport?: Airport;

  journeyForm = this.fb.group({
    departureAirport: ['', Validators.required],
    distance: [
      '',
      Validators.compose([Validators.required, Validators.min(0.1)]),
    ],
    numPassengers: [
      '',
      Validators.compose([Validators.required, Validators.min(1), noNonIntegers()]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private airportsService: AirportsService
  ) {}

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports(): void {
    this.airportsService.getAirports().subscribe((airports) => {
      this.airports = airports.airports.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  }

  onSubmit() {
    this.selectedAirport = this.airports.filter(
      (airport) => airport.name === this.journeyForm.value.departureAirport
    )[0];
    console.warn(this.journeyForm.value);
  }
}
