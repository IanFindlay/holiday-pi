export interface Airport {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface Airports {
  airports: Array<Airport>;
}
