import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { RouteCalculationService } from '../services/route-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';

import { Airport, RouteDetails, RouteDisplay } from '../shared/interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  sectionHeading =
    'The Case of the Cheapest Way to Go From One Airport to Another';

  @Input() airports?: Airport[];

  formSubmitting = false;

  error?: string;

  routeDisplay: RouteDisplay = {
    outbound: {
      journey: [],
      miles: [],
      cost: 0,
    },
    return: {
      journey: [],
      miles: [],
      cost: 0,
    },
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
    isReturn: boolean
  ): void {
    let routeSubObject = isReturn ? routeDisplay.return : routeDisplay.outbound;
    routeSubObject.journey = route.details.journey;
    routeSubObject.miles = route.details.miles;
    routeSubObject.cost = route.details.totalCost;

    routeDisplay.totalCost += route.details.totalCost;
  }
}
