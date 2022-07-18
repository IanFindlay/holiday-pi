import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { RouteCalculationService } from '../services/route-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';

import {
  Airport,
  FlexObject,
  RouteDetails,
  RouteDisplay,
} from '../shared/interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  sectionHeading = 'Case Two - Cheapest Flights';

  @Input() airports?: Airport[];
  @Input() idToNameId?: FlexObject;
  @Input() journeyCost?: number;

  formSubmitting = false;

  error?: string;

  routeDisplay: RouteDisplay = {
    outbound: {
      journey: [],
      miles: [],
      totalMiles: 0,
      numConnections: 0,
      cost: 0,
    },
    return: {
      journey: [],
      miles: [],
      numConnections: 0,
      totalMiles: 0,
      cost: 0,
    },
    numPassengers: 0,
    showReturn: false,
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
    this.error = undefined;
    this.routeDisplay!.totalCost = 0;
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
      .pipe(catchError((error) => (this.error = error)))
      .subscribe((route) => {
        this.addRouteToRouteDisplay(
          <RouteDetails>route,
          this.routeDisplay!,
          numPassengers,
          false
        );
        if (!this.calculateReturn) {
          this.formSubmitting = false;
          this.routeDisplay!.showReturn = false;
        }
      });

    if (this.calculateReturn) {
      this.routeCalculationService
        .calculateRoute(numPassengers, destinationAirport, departureAirport)
        .pipe(catchError((error) => (this.error = error)))
        .subscribe((route) => {
          this.addRouteToRouteDisplay(
            <RouteDetails>route,
            this.routeDisplay!,
            numPassengers,
            true
          );
          this.routeDisplay!.showReturn = true;
          this.formSubmitting = false;
        });
    }
  }

  private addRouteToRouteDisplay(
    route: RouteDetails,
    routeDisplay: RouteDisplay,
    numPassengers: number,
    isReturn: boolean
  ): void {
    let routeSubObject = isReturn ? routeDisplay.return : routeDisplay.outbound;
    routeSubObject.journey = route.details.journey;
    routeSubObject.miles = route.details.miles;
    routeSubObject.totalMiles = route.details.miles.reduce((a, b) => a + b);
    routeSubObject.numConnections = route.details.journey.length - 2;
    routeSubObject.cost = route.details.totalCost;

    routeDisplay.totalCost += route.details.totalCost;

    if (!isReturn) routeDisplay.numPassengers = numPassengers;
  }
}
