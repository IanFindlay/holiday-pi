import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css'],
})
export class JourneyComponent implements OnInit {
  sectionHeading = 'The Case of the Cheapest Way to Get to the Airport';

  journeyForm = this.fb.group({
    numPassengers: [0, Validators.compose([Validators.required, Validators.min(1)])],
    distance: [0, Validators.compose([Validators.required, Validators.min(1)])],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.journeyForm.value);
  }
}
