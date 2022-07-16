import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AirportsService } from '../airports.service';
import { JourneyCalculationService } from '../journey-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';
import { Airport} from '../shared/interfaces';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  sectionHeading = 'The Case of the Cheapest Way to Get to the Airport';

  airports: Airport[] = [];

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
    this.airportsService.getAirports().subscribe((airports) => {
      this.airports = airports.airports.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    });
  }

  onSubmit(): void {
    this.selectedAirport = this.airports.filter(
      (airport) => airport.name === this.journeyForm.value.departureAirport
    )[0];
    const distance = Number(this.journeyForm.value.distance);
    const numPassengers = Number(this.journeyForm.value.numPassengers);

    this.journeyCalculationService
      .calculateJourney(distance, numPassengers)
      .subscribe((details) => {

        // Extract to separate function - unittest / tdd it?
        let journeyMessage = '';
        const { taxi, car } = details.journey;
        if (taxi === car)
          journeyMessage = `Taxi(s) or car(s)... I estimate that it won't matter as both will cost about £${taxi}`;
        else {
          const lowestPrice = taxi < car ? taxi : car;
          const highestPrice = taxi > car ? taxi : car;
          journeyMessage = `${lowestPrice}, ${highestPrice} ${
            highestPrice - lowestPrice
          }`;
        }
        this.journeyMessage = journeyMessage;

      });
  }
}
