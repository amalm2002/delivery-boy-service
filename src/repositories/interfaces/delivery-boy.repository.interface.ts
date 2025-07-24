import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { UpdateQuery } from 'mongoose';

export interface IDeliveryBoyRepository {
  findByMobile(mobile: string): Promise<IDeliveryBoy | null>;
  create(data: Partial<IDeliveryBoy>): Promise<IDeliveryBoy>;
  updateById(id: string, data: Partial<IDeliveryBoy>): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
  deliveryBoyLocationUpdate(locationData: { latitude: number; longitude: number; deliveryBoyId: string }): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
  getAllDeliveryBoys(): Promise<Partial<IDeliveryBoy>[]>;
  getAllDeliveryBoy(): Promise<Partial<IDeliveryBoy>[]>;
  updateTheDeliveryBoyStatus(deliveryBoyId: string): Promise<IDeliveryBoy | null>;
  findById(id: string): Promise<IDeliveryBoy | null>;
  verifyDeliveryBoyDocuments(deliveryBoyId: string): Promise<IDeliveryBoy | { message: string }>;
  rejectDeliveryBoyDocuments(deliveryBoyId: string, rejectionReason: string): Promise<IDeliveryBoy | { message: string }>;
  getRejectedDocuments(deliveryBoyId: string): Promise<{ success: boolean; data?: Partial<IDeliveryBoy>; message?: string }>;
  updateDeliveryBoyById(id: string, update: Partial<IDeliveryBoy> | UpdateQuery<IDeliveryBoy>): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
  updateDeliveryBoyWithOperators(id: string, update: UpdateQuery<IDeliveryBoy>): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
  deliveryBoyLocationUpdateRedis(locationData: {
    latitude: number;
    longitude: number;
    deliveryBoyId: string;
  }): Promise<{
    success: boolean;
    message?: string;
  }>;
}