import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { noNonIntegers } from '../shared/customValidators.directive';

import { Airport } from '../shared/interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css'],
})
export class RouteComponent implements OnInit {
  sectionHeading = 'The Case of the Cheapest Way to Go From One Airport to Another and Back Again';

  @Input() airports?: Airport[];
  @Input() numPassengers?: number;
  @Input() selectedAirport?: Airport;

  formSubmitting = false;
  routeResults = {};

  routeForm = this.fb.group({
    departureAirport: ["", Validators.required],
    destinationAirport: ['', Validators.required],
    numPassengers: [
      "",
      Validators.compose([
        Validators.required,
        Validators.min(1),
        noNonIntegers(),
      ]),
    ],
  });
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmitting = true;
    this.numPassengers = Number(this.routeForm.value.numPassengers);
    this.formSubmitting = false;
    console.warn(this.routeForm.value)
  }
}
