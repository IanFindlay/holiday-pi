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
