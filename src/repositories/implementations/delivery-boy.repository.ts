import mongoose, { UpdateQuery } from 'mongoose';
import { DeliveryBoy, IDeliveryBoy } from '../../models/delivery-boy.model';
import { IDeliveryBoyRepository } from '../interfaces/delivery-boy.repository.interface';
import { BaseRepository } from './base.repository';
import { UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';

export class DeliveryBoyRepository extends BaseRepository<IDeliveryBoy> implements IDeliveryBoyRepository {
  constructor() {
    super(DeliveryBoy);
  }

  async findByMobile(mobile: string): Promise<IDeliveryBoy | null> {
    return await this.model.findOne({ mobile }).exec();
  }

  async updateById(id: string, data: Partial<IDeliveryBoy>): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const response = await this.model
        .findByIdAndUpdate(id, { $set: data, $unset: { rejectionReason: '' } }, { new: true })
        .populate('zone.id', 'name coordinates')
        .exec();

      if (!response) {
        return { success: false, message: 'DeliveryBoy not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async deliveryBoyLocationUpdate(locationData: { latitude: number; longitude: number; deliveryBoyId: string }) {
    try {
      const { latitude, longitude, deliveryBoyId } = locationData;

      if (!deliveryBoyId || !mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
        return { success: false, message: 'Invalid or missing deliveryBoyId' };
      }

      const response = await this.model
        .findByIdAndUpdate(deliveryBoyId, { $set: { location: { latitude, longitude } } }, { new: true })
        .exec();

      if (!response) {
        return { success: false, message: 'DeliveryBoy not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async getAllDeliveryBoys(): Promise<Partial<IDeliveryBoy>[]> {
    try {
      return await this.model
        .find({
          name: { $exists: true, $ne: null },
          mobile: { $exists: true, $ne: null },
          'panCard.number': { $exists: true, $ne: null },
          'license.number': { $exists: true, $ne: null },
          'bankDetails.accountNumber': { $exists: true, $ne: null },
          'bankDetails.ifscCode': { $exists: true, $ne: null },
          vehicle: { $exists: true, $ne: null },
          'zone.id': { $exists: true, $ne: null },
          'location.latitude': { $exists: true, $ne: null },
          'location.longitude': { $exists: true, $ne: null },
        })
        .populate('zone.id', 'name')
        .lean()
        .exec();
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async getAllDeliveryBoy(): Promise<Partial<IDeliveryBoy>[]> {
    try {
      const deliveryBoys = await this.model
        .find({
          isOnline: true,
          name: { $exists: true, $ne: null },
          mobile: { $exists: true, $ne: null },
          'location.latitude': { $exists: true, $ne: null },
          'location.longitude': { $exists: true, $ne: null },
        })
        .populate('zone.id', 'name')
        .lean()
        .exec();

      if (!deliveryBoys.length) {
        console.log('No delivery boys found matching the criteria');
      }

      return deliveryBoys;
    } catch (error) {
      console.error('Error fetching delivery boys:', error);
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateTheDeliveryBoyStatus(deliveryBoyId: string): Promise<IDeliveryBoy | null> {
    try {
      const deliveryBoy = await this.model.findById(deliveryBoyId).exec();
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }
      return await this.model
        .findByIdAndUpdate(deliveryBoyId, { $set: { isActive: !deliveryBoy.isActive } }, { new: true })
        .exec();
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async findById(id: string): Promise<IDeliveryBoy | null> {
    return await this.model.findById(id).populate('zone.id', 'name coordinates').exec();
  }

  async verifyDeliveryBoyDocuments(deliveryBoyId: string): Promise<IDeliveryBoy | { message: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
        return { message: 'Invalid deliveryBoyId' };
      }
      const response = await this.model
        .findByIdAndUpdate(deliveryBoyId, { $set: { isVerified: true } }, { new: true })
        .exec();
      if (!response) {
        return { message: 'DeliveryBoy not found' };
      }
      return response;
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async rejectDeliveryBoyDocuments(deliveryBoyId: string, rejectionReason: string): Promise<IDeliveryBoy | { message: string }> {
    try {
      const response = await this.model
        .findByIdAndUpdate(deliveryBoyId, { $set: { rejectionReason, isVerified: false } }, { new: true })
        .exec();
      if (!response) {
        return { message: 'DeliveryBoy not found' };
      }
      return response;
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async getRejectedDocuments(deliveryBoyId: string): Promise<{ success: boolean; data?: Partial<IDeliveryBoy>; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const deliveryBoy = await this.model.findById(deliveryBoyId).exec();
      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      const rejectedDocs = {
        name: deliveryBoy.name,
        mobile: deliveryBoy.mobile,
        panCard: deliveryBoy.panCard,
        license: deliveryBoy.license,
        bankDetails: deliveryBoy.bankDetails,
        rejectionReason: deliveryBoy.rejectionReason,
        isVerified: deliveryBoy.isVerified,
        profileImage: deliveryBoy.profileImage,
      };

      return { success: true, data: rejectedDocs };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async updateDeliveryBoyWithOperators(
    id: string,
    update: UpdateQuery<IDeliveryBoy>
  ): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const response = await this.model
        .findByIdAndUpdate(id, update, { new: true })
        .populate('zone.id', 'name coordinates')
        .exec();

      if (!response) {
        return { success: false, message: 'DeliveryBoy not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async updateDeliveryBoyById(
    id: string,
    update: Partial<IDeliveryBoy> | UpdateQuery<IDeliveryBoy>
  ): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const isOperatorUpdate = Object.keys(update).some(key => key.startsWith('$'));
      const response = await this.model
        .findByIdAndUpdate(id, isOperatorUpdate ? update : { $set: update }, { new: true })
        .populate('zone.id', 'name coordinates')
        .exec();

      if (!response) {
        return { success: false, message: 'DeliveryBoy not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async deliveryBoyLocationUpdateRedis(locationData: {
    latitude: number;
    longitude: number;
    deliveryBoyId: string;
  }): Promise<{
    success: boolean;
    message?: string;
  }> {
    try {
      const { deliveryBoyId, latitude, longitude } = locationData;

      if (!deliveryBoyId || !mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
        return { success: false, message: 'Invalid or missing deliveryBoyId' };
      }

      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return { success: false, message: 'Invalid latitude or longitude' };
      }

      return { success: true, message: 'Input validated successfully' };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async countPendingOrdersByVehicleType(vehicleType: string): Promise<number> {
    const count = await this.model.countDocuments({
      vehicle: vehicleType,
      pendingOrders: { $gt: 0 },
    });
    return count;
  }

  async updateEarningsAndCash(
    id: string,
    earnings: { today: number; week: number; history: { date: Date; amount: number; paid: boolean, orderId: string }[] },
    inHandCash: number,
    monthlyAmount?: number,
    lastPaidAt?: Date,
    nextPaidAt?: Date,
    completeAmount?: number,
    amountToPayDeliveryBoy?: number
  ): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const updateData: any = {
        'earnings.today': Math.round(earnings.today),
        'earnings.week': Math.round(earnings.week),
        'earnings.history': earnings.history,
        inHandCash: Math.round(inHandCash),
      };

      if (monthlyAmount !== undefined) {
        updateData.monthlyAmount = monthlyAmount;
      }

      if (lastPaidAt) {
        updateData.lastPaidAt = lastPaidAt;
      }

      if (nextPaidAt) {
        updateData.nextPaidAt = nextPaidAt;
      }

      if (completeAmount !== undefined) {
        updateData.completeAmount = completeAmount;
      }

      if (amountToPayDeliveryBoy !== undefined) {
        updateData.amountToPayDeliveryBoy = amountToPayDeliveryBoy;
      }

      const response = await this.model
        .findByIdAndUpdate(id, { $set: updateData }, { new: true })
        .populate('zone.id', 'name coordinates')
        .exec();

      if (!response) {
        return { success: false, message: 'DeliveryBoy not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }


  async setOffLineOnPartner(deliveryBoyId: string, isOnline: boolean): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await this.model.findByIdAndUpdate(deliveryBoyId, { isOnline: isOnline })
      return { success: true };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async findOne(id: string): Promise<IDeliveryBoy | null> {
    return await this.model.findOne({ _id: id, pendingOrders: 0 })
  }

  async addReview(deliveryBoyId: string, review: UserReviewDTO): Promise<IDeliveryBoy> {
    const { userId, orderId, isEdit, ...reviewFields } = review;

    if (isEdit) {
      return await DeliveryBoy.findOneAndUpdate(
        {
          _id: deliveryBoyId,
          'reviews.userId': userId,
          'reviews.orderId': orderId
        },
        {
          $set: {
            'reviews.$.rating': review.rating,
            'reviews.$.comment': review.comment,
            'reviews.$.createdAt': new Date()
          }
        },
        { new: true }
      );
    } else {
      return await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $push: { reviews: { ...reviewFields, userId, orderId, createdAt: new Date() } } },
        { new: true }
      );
    }
  }


  async findReviewByUserOrderAndDeliveryBoy(deliveryBoyId: string, userId: string, orderId: string): Promise<any> {
    return await DeliveryBoy.findOne(
      {
        _id: deliveryBoyId,
        reviews: {
          $elemMatch: {
            userId: userId,
            orderId: orderId
          }
        }
      },
      {
        reviews: {
          $elemMatch: {
            userId: userId,
            orderId: orderId
          }
        }
      }
    );
  }

  async updateOne(filter: any, update: any): Promise<IDeliveryBoy | null> {
    return await DeliveryBoy.findOneAndUpdate(filter, update, { new: true });
  }

  async updateZone(deliveryBoyId: string, zoneId: string, zoneName: string): Promise<IDeliveryBoy | null> {
    try {
      const deliveryBoy = await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $set: { 'zone.id': zoneId, 'zone.name': zoneName, updatedAt: new Date() } },
        { new: true }
      ).exec();
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }
      return deliveryBoy;
    } catch (error) {
      throw new Error(`Failed to update delivery boy zone: ${(error as Error).message}`);
    }
  }

}