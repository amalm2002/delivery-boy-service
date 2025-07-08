
import { CreateDeliveryBoyDto } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateLocationDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';

export interface IDeliveryBoyController {
  register(data: CreateDeliveryBoyDto): Promise<any>;
  updateLocation(data: UpdateLocationDto): Promise<any>;
  updateDetails(data: UpdateDetailsDto): Promise<any>;
  updateVehicle(data: UpdateVehicleDto): Promise<any>;
  updateZone(data: UpdateZoneDto): Promise<any>;
  getAllDeliveryBoys(data: any): Promise<{ message: string; fetchDeliveryBoys: Partial<IDeliveryBoy>[] }>;
  getAllDeliveryBoy(data: any): Promise<{ message: string; fetchDeliveryBoys: Partial<IDeliveryBoy>[] }>;
  updateDeliveryBoyStatus(data: { id: string }): Promise<{ message: string; response: IDeliveryBoy | null }>;
  fetchDeliveryBoyDetails(data: { id: string }): Promise<{ message: string; response: IDeliveryBoy | null }>;
  verifyDocuments(data: VerifyDocumentsDto): Promise<any>;
  rejectDocuments(data: RejectDocumentsDto): Promise<any>;
  getRejectedDocuments(data: { id: string }): Promise<{ message: string; fetchRejectedDocs: { success: boolean; data?: Partial<IDeliveryBoy>; message?: string } }>;
}