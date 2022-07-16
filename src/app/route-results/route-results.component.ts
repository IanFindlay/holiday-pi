import { Component, Input, OnInit } from '@angular/core';
import { RouteDisplay } from '../shared/interfaces';

@Component({
  selector: 'app-route-results',
  templateUrl: './route-results.component.html',
  styleUrls: ['./route-results.component.css'],
})
export class RouteResultsComponent implements OnInit {
  @Input() routeResults?: RouteDisplay;

  constructor() {}

  ngOnInit(): void {}
}
