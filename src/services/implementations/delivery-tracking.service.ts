import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';
import { IDeliveryBoyTrackingService } from '../interfaces/delivery-tracking.service.interfaces';
import { UpdateOnlineStatusDTO } from '../../dto/delivery-boy/update.online.status.dto';
import { DeliveryBoyDetailsDTO } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';
import redisClient from '../../config/redis.config';


export class DeliveryBoyTrackingService implements IDeliveryBoyTrackingService {
  constructor(private repository: IDeliveryBoyRepository) { }

  async updateOnlineStatus(dto: UpdateOnlineStatusDTO): Promise<{
    success: boolean;
    data?: IDeliveryBoy;
    message?: string;
  }> {
    try {
      const { deliveryBoyId, isOnline } = dto;
      const deliveryBoy = await this.repository.findById(deliveryBoyId);

      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      const newOnlineStatus = isOnline !== undefined ? isOnline : !deliveryBoy.isOnline;

      // const updatedDeliveryBoy = await this.repository.updateById(deliveryBoyId, {
      //   isOnline: newOnlineStatus,
      // });
      const updatedDeliveryBoy = await this.repository.updateDeliveryBoyById(deliveryBoyId, {
        isOnline: newOnlineStatus,
      });

      return updatedDeliveryBoy;
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async getDeliveryBoyDetails(dto: UpdateOnlineStatusDTO): Promise<{
    success: boolean;
    data?: DeliveryBoyDetailsDTO;
    message?: string;
  }> {
    try {
      const { deliveryBoyId } = dto;
      const deliveryBoy = await this.repository.findById(deliveryBoyId);

      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      const deliveryBoyDetails: DeliveryBoyDetailsDTO = {
        name: deliveryBoy.name,
        email: deliveryBoy.email,
        mobile: deliveryBoy.mobile,
        rating: deliveryBoy.rating || 4.8,
        isOnline: deliveryBoy.isOnline,
        earnings: deliveryBoy.earnings || { today: 0, week: 0 },
        loginHours: deliveryBoy.loginHours || '0:00',
        ordersCompleted: deliveryBoy.ordersCompleted || 0,
        pendingOrders: deliveryBoy.pendingOrders || 0,
        location: deliveryBoy.location,
        zone: deliveryBoy.zone?.id
          ? {
            id: deliveryBoy.zone.id,
            name: deliveryBoy.zone.name,
          }
          : undefined,
      };

      return { success: true, data: deliveryBoyDetails };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async findNearestDeliveryPartners(location: { latitude: number; longitude: number }): Promise<{
    success: boolean;
    data?: DeliveryBoyDetailsDTO[];
    message?: string;
  }> {
    try {

      const deliveryBoys = await this.repository.getAllDeliveryBoys();
      console.log('delivery boys :', deliveryBoys);

      console.log('locations :', location);

      const eligibleDeliveryBoys = deliveryBoys.filter(
        (db) => db.isOnline && db.pendingOrders === 0 && db.location?.latitude && db.location?.longitude

      );

      if (!eligibleDeliveryBoys.length) {
        return { success: false, message: 'No online delivery boys with no pending orders found' };
      }


      const deliveryBoyDetails: DeliveryBoyDetailsDTO[] = [];
      for (const db of eligibleDeliveryBoys) {
        const redisKey = `deliveryBoy:${db._id}:location`;
        const redisData = await redisClient.get(redisKey);

        let liveLocation = db.location;
        if (redisData) {
          try {
            liveLocation = JSON.parse(redisData);
          } catch (error) {
            console.error(`Error parsing Redis location for ${db._id}:`, error);
          }
        }

        if (!liveLocation || !liveLocation.latitude || !liveLocation.longitude) {
          continue;
        }


        const distance = this.calculateDistance(
          location.latitude,
          location.longitude,
          liveLocation.latitude,
          liveLocation.longitude
        );

        if (distance <= 50) {
          deliveryBoyDetails.push({
            _id: db._id,
            name: db.name || '',
            email: db.email || '',
            mobile: db.mobile || '',
            rating: db.rating || 4.8,
            isOnline: db.isOnline || false,
            earnings: db.earnings || { today: 0, week: 0 },
            loginHours: db.loginHours || '0:00',
            ordersCompleted: db.ordersCompleted || 0,
            pendingOrders: db.pendingOrders || 0,
            location: liveLocation,
            zone: db.zone ? { id: db.zone.id, name: db.zone.name } : undefined,
          });
        }
      }
      // console.log('delivery boy details :', deliveryBoyDetails);

      if (!deliveryBoyDetails.length) {
        return { success: false, message: 'No delivery boys found within 5 km radius' };
      }

      return { success: true, data: deliveryBoyDetails };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async updateLocation(data: { deliveryBoyId: string; latitude: number; longitude: number }): Promise<{
    success: boolean;
    data?: IDeliveryBoy;
    message?: string;
  }> {
    try {
      const { deliveryBoyId, latitude, longitude } = data;
      const result = await this.repository.deliveryBoyLocationUpdate({ deliveryBoyId, latitude, longitude });

      if (result.success && result.data) {

        const x = await redisClient.set(
          `deliveryBoy:${deliveryBoyId}:location`,
          JSON.stringify({ latitude, longitude }),
          { EX: 60 }
        );
        console.log('redis data :', x);


      }

      return result;
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async assignOrder(data: { deliveryBoyId: string; orderId: string }): Promise<{
    success: boolean;
    data?: IDeliveryBoy;
    message?: string;
  }> {
    try {
      const { deliveryBoyId } = data;

      const deliveryBoy = await this.repository.findById(deliveryBoyId);
      console.log('delivery boy :', deliveryBoy);

      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      if (!deliveryBoy.isOnline) {
        return { success: false, message: 'Delivery boy is offline' };
      }

      const updatedDeliveryBoy = await this.repository.updateDeliveryBoyWithOperators(deliveryBoyId, {
        $inc: { pendingOrders: 1 },
      });

      if (!updatedDeliveryBoy.success || !updatedDeliveryBoy.data) {
        return { success: false, message: updatedDeliveryBoy.message || 'Failed to assign order' };
      }

      return { success: true, data: updatedDeliveryBoy.data, message: 'Order assigned successfully' };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async updateDeliveryBoyLocation(data: {
    deliveryBoyId: string;
    latitude: number;
    longitude: number;
  }): Promise<{
    success: boolean;
    message?: string;
  }> {
    try {
      const { deliveryBoyId, latitude, longitude } = data;

      if (!deliveryBoyId || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return { success: false, message: 'Invalid request: deliveryBoyId, latitude, and longitude are required' };
      }


      await redisClient.set(
        `deliveryBoy:${deliveryBoyId}:location`,
        JSON.stringify({ latitude, longitude }),
        { EX: 60 } 
      );

      return { success: true, message: 'Location updated in Redis successfully' };
    } catch (error) {
      console.error('Error in updateDeliveryBoyLocation:', error);
      return { success: false, message: (error as Error).message };
    }
  }

  async completeDelivery(data: { orderId: string; deliveryBoyId: string }): Promise<any> {
    try {
      const { deliveryBoyId } = data;

      const deliveryBoy = await this.repository.findById(deliveryBoyId);
      if (!deliveryBoy) {
        return { success: false, message: 'Delivery boy not found' };
      }

      const update = {
        $set: { pendingOrders: 0 },
        $inc: { ordersCompleted: 1 },
      };

      const updatedDeliveryBoy = await this.repository.updateDeliveryBoyWithOperators(deliveryBoyId, update);

      if (!updatedDeliveryBoy.success) {
        return { success: false, message: updatedDeliveryBoy.message || 'Failed to update delivery boy' };
      }

      return {
        success: true,
        data: updatedDeliveryBoy.data,
        message: 'Delivery boy updated successfully',
      };
    } catch (error) {
      console.error('Error in completeDelivery:', error);
      return { success: false, message: `Failed to complete delivery: ${(error as Error).message}` };
    }
  }
}