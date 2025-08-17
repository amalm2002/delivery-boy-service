import { UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';
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
  deliveryBoyLocationUpdateRedis(locationData: { latitude: number; longitude: number; deliveryBoyId: string; }): Promise<{ success: boolean; message?: string; }>;
  countPendingOrdersByVehicleType(vehicleType: string): Promise<number>;
  updateEarningsAndCash(
    id: string,
    earnings: { today: number; week: number; history: { date: Date; amount: number, paid: boolean, orderId: string }[] },
    inHandCash: number,
    monthlyAmount?: number,
    lastPaidAt?: Date,
    nextPaidAt?: Date,
    completeAmount?: number,
    amountToPayDeliveryBoy?: number
  ): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }>;
  setOffLineOnPartner(deliveryBoyId: string, isOnline: boolean): Promise<{ success: boolean; message?: string; }>
  findOne(id: string): Promise<IDeliveryBoy | null>
  addReview(deliveryBoyId: string, review: UserReviewDTO): Promise<IDeliveryBoy>
  findReviewByUserOrderAndDeliveryBoy(deliveryBoyId: string, userId: string, orderId: string): Promise<any>
  updateOne(filter: any, update: any): Promise<IDeliveryBoy | null>
  updateZone(deliveryBoyId: string, zoneId: string, zoneName: string): Promise<IDeliveryBoy | null>
  getDeliveryBoyChartData(query: any): Promise<{ _id: string; name: string; completedDeliveries: number; totalEarnings: number }[]>;
}