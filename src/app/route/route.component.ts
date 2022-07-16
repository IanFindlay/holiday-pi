import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouteCalculationService } from '../route-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';

import { Airport, RouteDisplay } from '../shared/interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  sectionHeading =
    'The Case of the Cheapest Way to Go From One Airport to Another';

  @Input() airports?: Airport[];
  @Input() selectedAirport?: Airport;
  @Input() numPassengers?: number;

  formSubmitting = false;

  routeDisplay: RouteDisplay = {
    outboundJourney: [],
    outboundMiles: [],
    showReturn: false,
    returnJourney: [],
    returnMiles: [],
    outboundTotalCost: 0,
    returnTotalCost: 0,
    totalCost: 0,
  };

  calculateReturn?: boolean;

  routeForm = this.fb.group({
    departureAirport: ['', Validators.required],
    destinationAirport: ['', Validators.required],
    numPassengers: [
      '',
      Validators.compose([
        Validators.required,
        Validators.min(1),
        noNonIntegers(),
      ]),
    ],
    calculateReturn: ['true'],
  });

  constructor(
    private fb: FormBuilder,
    private routeCalculationService: RouteCalculationService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.routeDisplay.totalCost = 0;
    this.formSubmitting = true;
    const numPassengers = Number(this.routeForm.value.numPassengers);
    const departureAirport = <Airport>(
      (<unknown>this.routeForm.value.departureAirport)
    );
    const destinationAirport = <Airport>(
      (<unknown>this.routeForm.value.destinationAirport)
    );
    this.calculateReturn = Boolean(this.routeForm.value.calculateReturn);

    this.routeCalculationService
      .calculateRoute(numPassengers, departureAirport, destinationAirport)
      .subscribe((route) => {
        this.routeDisplay.outboundJourney = <string[]>route.details.journey;
        this.routeDisplay.outboundMiles = route.details.miles;
        this.routeDisplay.outboundTotalCost = route.details.totalCost;
        this.routeDisplay.totalCost += route.details.totalCost;
        if (!this.calculateReturn) {
          this.formSubmitting = false;
          this.routeDisplay.showReturn = false;
        }
      });

    if (this.calculateReturn) {
      this.routeCalculationService
        .calculateRoute(numPassengers, destinationAirport, departureAirport)
        .subscribe((route) => {
          this.routeDisplay.returnJourney = route.details.journey;
          this.routeDisplay.returnMiles = route.details.miles;
          this.routeDisplay.returnTotalCost = route.details.totalCost;
          this.routeDisplay.totalCost += route.details.totalCost;
          this.routeDisplay.showReturn = true;
          this.formSubmitting = false;
          console.warn(this.routeDisplay);
        });
    }
  }
}
