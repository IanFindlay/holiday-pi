import { TestBed } from '@angular/core/testing';

import { JourneyCalculationService } from './journey-calculation.service';

describe('JourneyCalculationService', () => {
  let service: JourneyCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneyCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
