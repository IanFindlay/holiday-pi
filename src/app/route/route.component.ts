import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouteCalculationService } from '../route-calculation.service';
import { noNonIntegers } from '../shared/customValidators.directive';

import { Airport, RouteDetails } from '../shared/interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  sectionHeading =
    'The Case of the Cheapest Way to Go From One Airport to Another';

  @Input() airports?: Airport[];
  @Input() numPassengers?: number;
  @Input() selectedAirport?: Airport;

  formSubmitting = false;
  outboundDetails?: RouteDetails;
  returnDetails?: RouteDetails;
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
    this.formSubmitting = true;
    const numPassengers = Number(this.routeForm.value.numPassengers);
    const departureAirport = <Airport>(
      (<unknown>this.routeForm.value.departureAirport)
    );
    const destinationAirport = <Airport>(
      (<unknown>this.routeForm.value.destinationAirport)
    );
    this.calculateReturn =
      this.routeForm.value.calculateReturn === 'true' ? true : false;

    this.routeCalculationService
      .calculateRoute(numPassengers, departureAirport, destinationAirport)
      .subscribe((route) => {
        this.outboundDetails = route;
        console.warn(this.outboundDetails);
      });

    if (this.calculateReturn) {
      this.routeCalculationService
        .calculateRoute(numPassengers, destinationAirport, departureAirport)
        .subscribe((route) => {
          this.returnDetails = route;
          console.warn(this.returnDetails);
        });
    }
    this.formSubmitting = false;
  }
}
