import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import { JourneyCalculationService } from '../services/journey-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';
import { Airport, JourneyDetails, RouteDetails } from '../shared/interfaces';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  sectionHeading = 'Case One - Cheapest Way to the Airport';

  @Output() journeyCost = new EventEmitter<number>();

  error?: string;
  formSubmitting = false;
  journeyMessage?: string;

  journeyForm = this.fb.group({
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
    this.error = undefined;
    this.formSubmitting = true;
    const distance = <string>this.journeyForm.value.distance;
    const numPassengers = Number(this.journeyForm.value.numPassengers);

    this.journeyCalculationService
      .calculateJourney(distance, numPassengers)
      .pipe(catchError((error) => (this.error = error)))
      .subscribe((response) => {
        const details = <JourneyDetails>response;
        const { taxi, car } = details.journey;
        const cheapest = taxi <= car ? taxi : car;
        this.journeyCost.emit(cheapest);
        this.journeyMessage = this.composeJourneyMessage(
          taxi,
          car,
          numPassengers
        );
        this.formSubmitting = false;
      });
  }

  private composeJourneyMessage(
    taxiCost: number,
    carCost: number,
    numPassenger: number
  ): string {
    let message = '';
    const suffix = numPassenger > 4 ? 's' : '';

    if (taxiCost === carCost)
      message = `Taxi${suffix} or car${suffix}... I estimate that it won't matter
                 as both will cost around £${taxiCost.toFixed(2)}`;
    else if (taxiCost < carCost)
      message = `Taxi${suffix} will be cheaper at
                 £${taxiCost.toFixed(2)} which is 
                 £${(carCost - taxiCost).toFixed(2)} less than
                 taking the car${suffix}`;
    else
      message = `Car${suffix} will be cheaper at
                 £${carCost.toFixed(2)} which is
                 £${(taxiCost - carCost).toFixed(2)} less than
                 taking the taxi${suffix}`;

    return message;
  }
}
