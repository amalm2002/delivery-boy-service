
import mongoose from 'mongoose';
import { DeliveryBoy, IDeliveryBoy } from '../../models/delivery-boy.model';
import { IDeliveryBoyRepository } from '../interfaces/delivery-boy.repository.interface';

export class DeliveryBoyRepository implements IDeliveryBoyRepository {
  async findByMobile(mobile: string): Promise<IDeliveryBoy | null> {
    return await DeliveryBoy.findOne({ mobile });
  }

  async create(data: Partial<IDeliveryBoy>): Promise<IDeliveryBoy> {
    return await DeliveryBoy.create(data);
  }

  async updateById(id: string, data: Partial<IDeliveryBoy>): Promise<{ success: boolean; data?: IDeliveryBoy; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid deliveryBoyId' };
      }

      const response = await DeliveryBoy.findByIdAndUpdate(
        id,
        { $set: data, $unset: { rejectionReason: '' } },
        { new: true }
      );

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

      const response = await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $set: { location: { latitude, longitude } } },
        { new: true }
      );

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
      return await DeliveryBoy.find({
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
        .lean();
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateTheDeliveryBoyStatus(deliveryBoyId: string): Promise<IDeliveryBoy | null> {
    try {
      const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }
      return await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $set: { isActive: !deliveryBoy.isActive } },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async findById(id: string): Promise<IDeliveryBoy | null> {
    return await DeliveryBoy.findById(id);
  }

  async verifyDeliveryBoyDocuments(deliveryBoyId: string): Promise<IDeliveryBoy | { message: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(deliveryBoyId)) {
        return { message: 'Invalid deliveryBoyId' };
      }
      const response = await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $set: { isVerified: true } },
        { new: true }
      );
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
      const response = await DeliveryBoy.findByIdAndUpdate(
        deliveryBoyId,
        { $set: { rejectionReason, isVerified: false } },
        { new: true }
      );
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

      const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      console.log('delivery boy :', deliveryBoy);


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

      console.log('rejectedDocs :', rejectedDocs);


      return { success: true, data: rejectedDocs };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}