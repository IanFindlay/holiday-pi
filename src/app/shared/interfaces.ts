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
  outbound: {
    journey: string[];
    miles: number[];
    totalMiles: number;
    numConnections: number;
    cost: number;
  };
  return: {
    journey: string[];
    miles: number[];
    totalMiles: number;
    numConnections: number;
    cost: number;
  };
  numPassengers: number;
  showReturn: boolean;
  totalCost: number;
}

export interface FlexObject {
  [key: string]: any;
}
