import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteResultsComponent } from './route-results.component';

describe('RouteResultsComponent', () => {
  let component: RouteResultsComponent;
  let fixture: ComponentFixture<RouteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
