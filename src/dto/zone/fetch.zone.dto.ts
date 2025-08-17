import { ZoneDetailsDTO } from './zone-details.dto';

export interface FetchZonesResponseDTO {
    message?: string;
    fetchZones: ZoneDetailsDTO[];
    error?: boolean;
}


export interface Zone {
  name: string;
  coordinates: { latitude: number; longitude: number }[];
}