export interface Airport {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface Airports {
  airports: Array<Airport>;
}

export interface JourneyDetails {
  journey: {
    taxi: number;
    car: number;
  };
}

export interface RouteDetails {
  details: {
    journey: string[];
    miles: number[];
    totalCost: number;
  };
}

export interface RouteDisplay {
  outboundJourney: string[];
  outboundMiles: number[];
  showReturn: boolean;
  returnJourney: string[];
  returnMiles: number[];
  outboundTotalCost: number;
  returnTotalCost: number;
  totalCost: number;
}
