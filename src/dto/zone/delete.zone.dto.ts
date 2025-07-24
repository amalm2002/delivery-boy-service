import { ZoneDetailsDTO } from './zone-details.dto';

export interface DeleteZoneDto {
  id: string;
}


export interface DeleteZoneResponseDTO {
  message: string;
  zone: ZoneDetailsDTO | null;
}
