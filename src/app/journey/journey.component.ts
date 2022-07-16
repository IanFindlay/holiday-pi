import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  @Input() airports?: Airport[];
  @Input() numPassengers?: number;
  @Input() selectedAirport?: Airport;

  formSubmitting = false;

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
    private journeyCalculationService: JourneyCalculationService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmitting = true;
    this.selectedAirport = <Airport> <unknown>this.journeyForm.value.departureAirport;
    const distance = <string>this.journeyForm.value.distance;
    this.numPassengers = Number(this.journeyForm.value.numPassengers);

    this.journeyCalculationService
      .calculateJourney(distance, this.numPassengers)
      .subscribe((details) => {
        const { taxi, car } = details.journey;
        this.journeyMessage = composeJourneyMessage(
          taxi,
          car,
          <number>this.numPassengers
        );
        this.formSubmitting = false;
      });
  }
}
