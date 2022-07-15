import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyComponent } from './journey.component';

describe('JourneyComponent', () => {
  let component: JourneyComponent;
  let fixture: ComponentFixture<JourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a section heading of "The Case of the Cheapest Way to Get to the Airport"', () => {
   expect(component.sectionHeading).toBe("The Case of the Cheapest Way to Get to the Airport");
  })
});
