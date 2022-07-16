import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AirportsService } from '../airports.service';
import { JourneyCalculationService } from '../journey-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';
import { Airport } from '../shared/interfaces';
import { composeJourneyMessage } from '../shared/utilities';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  sectionHeading = 'The Case of the Cheapest Way to Get to the Airport';

  airportsLoading = false;
  airports: Airport[] = [];

  formSubmitting = false;
  selectedAirport?: Airport;

  journeyMessage?: string;

  journeyForm = this.fb.group({
    departureAirport: ['', Validators.required],
    distance: [
      '',
      Validators.compose([Validators.required, Validators.min(0.1)]),
    ],
    numPassengers: [
      '',
      Validators.compose([
        Validators.required,
        Validators.min(1),
        noNonIntegers(),
      ]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private airportsService: AirportsService,
    private journeyCalculationService: JourneyCalculationService
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

  onSubmit(): void {
   this.formSubmitting = true; 
    this.selectedAirport = this.airports.filter(
      (airport) => airport.name === this.journeyForm.value.departureAirport
    )[0];
    const distance = <string>this.journeyForm.value.distance;
    const numPassengers = <string>this.journeyForm.value.numPassengers;

    this.journeyCalculationService
      .calculateJourney(distance, numPassengers)
      .subscribe((details) => {
        const { taxi, car } = details.journey;
        this.journeyMessage = composeJourneyMessage(taxi, car, Number(numPassengers));
        this.formSubmitting = false; 
      });
  }
}
