export interface ZoneDetailsDTO {
  _id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}
