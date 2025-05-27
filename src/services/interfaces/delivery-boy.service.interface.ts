import { CreateDeliveryBoyDto } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateLocationDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';

export interface IDeliveryBoyService {
  registerDeliveryBoy(dto: CreateDeliveryBoyDto): Promise<{
    success: boolean;
    message: string;
    deliveryBoyName?: string;
    mobile?: string;
    token?: string;
    _id?: string;
    isOnline?: boolean;
    isVerified?: boolean;
    refreshToken?: string;
    isActive?: boolean;
    isRejected?: boolean;
    deliveryBoy?: IDeliveryBoy;
    role?: string;
    rejectionReason?: string;
    missingFields?: string;
  }>;
  updateLocation(dto: UpdateLocationDto): Promise<{ success: boolean; message: string; data?: IDeliveryBoy }>;
  updateDetails(dto: UpdateDetailsDto): Promise<{ success: boolean; message: string; data?: IDeliveryBoy }>;
  updateVehicle(dto: UpdateVehicleDto): Promise<{ success: boolean; message: string; data?: IDeliveryBoy }>;
  updateZone(dto: UpdateZoneDto): Promise<{ success: boolean; message: string; data?: IDeliveryBoy }>;
  getAllDeliveryBoys(): Promise<Partial<IDeliveryBoy>[]>;
  updateDeliveryBoyStatus(deliveryBoyId: string): Promise<IDeliveryBoy | null>;
  fetchDeliveryBoyDetails(deliveryBoyId: string): Promise<IDeliveryBoy | null>;
  verifyDocuments(dto: VerifyDocumentsDto): Promise<IDeliveryBoy | { message: string }>;
  rejectDocuments(dto: RejectDocumentsDto): Promise<IDeliveryBoy | { message: string }>;
  getRejectedDocuments(deliveryBoyId: string): Promise<{ success: boolean; data?: Partial<IDeliveryBoy>; message?: string }>;
}