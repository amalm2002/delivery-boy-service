import { ZoneDetailsDTO } from './zone-details.dto';

export interface FetchZonesResponseDTO {
    message?: string;
    fetchZones: ZoneDetailsDTO[];
    error?: boolean;
}
