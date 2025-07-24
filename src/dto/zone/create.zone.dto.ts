
export interface CreateZoneDto {
  name: string;
  coordinates: number[][];
}


export interface CreateZoneResponseDto {
  _id?: any;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

export interface CreateZoneResponseControllerDto {
  message?: string;
  id?: any;
  zone?: any;
  error?: boolean;
}