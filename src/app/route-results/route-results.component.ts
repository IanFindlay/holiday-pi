import { Component, Input, OnInit } from '@angular/core';
import { FlexObject, RouteDisplay } from '../shared/interfaces';

@Component({
  selector: 'app-route-results',
  templateUrl: './route-results.component.html',
  styleUrls: ['./route-results.component.css'],
})
export class RouteResultsComponent implements OnInit {
  @Input() routeResults!: RouteDisplay;
  @Input() idToNameId?: FlexObject;
  @Input() journeyCost?: number;

  includeJourney = false;

  constructor() {}

  ngOnInit(): void {}
}
