import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';
import { IDeliveryBoyTrackingService } from '../interfaces/delivery-tracking.service.interfaces';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';
import { DeliveryBoyDetailsDTO, GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';
import redisClient from '../../config/redis.config';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';
import { IDeliveryRateModelRepository } from '../../repositories/interfaces/delivery-rate-model.repository.interfaces';


export class DeliveryBoyTrackingService implements IDeliveryBoyTrackingService {
  constructor(
    private repository: IDeliveryBoyRepository,
    private rideRateRepository: IDeliveryRateModelRepository
  ) { }

  async updateOnlineStatus(dto: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto> {
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

  async getDeliveryBoyDetails(dto: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto> {
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
        amountToPayDeliveryBoy: deliveryBoy.amountToPayDeliveryBoy,
        inHandCash: deliveryBoy.inHandCash,
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

  async findNearestDeliveryPartners(location: FindNearestDeliveryPartnersRequestDto['location']): Promise<FindNearestDeliveryPartnersResponseDto> {
    try {

      const deliveryBoys = await this.repository.getAllDeliveryBoys();

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
            // liveLocation = JSON.parse(redisData);
            liveLocation = JSON.parse(redisData.toString());
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

  async updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
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

  async assignOrder(data: AssignOrderDTO): Promise<AssignOrderResponseDTO> {
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

  async updateDeliveryBoyLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
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

  async completeDelivery(data: completeDeliveryDTO): Promise<completeDeliveryResponseDTO> {
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

  async orderEarnings(data: { paymentMethod: string; deliveryBoyId: string; finalTotalDistance: number; orderAmount: number,order_id:string }): Promise<any> {
    try {
      const { paymentMethod, deliveryBoyId, finalTotalDistance, orderAmount ,order_id} = data;

      const deliveryBoy = await this.repository.findById(deliveryBoyId);
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }

      const vehicleType = deliveryBoy.vehicle;
      const rateModel = await this.rideRateRepository.findOne({ vehicleType });

      if (!rateModel) {
        throw new Error('No active rate model found for vehicle type');
      }

      const distanceInKm = Math.round(finalTotalDistance) / 1000;
      const calculatedEarnings = Math.round(distanceInKm * rateModel.ratePerKm);

      const todayDateString = new Date().toISOString().slice(0, 10);
      const now = new Date();

      const existingHistory = deliveryBoy.earnings?.history || [];
      const updatedHistory = [...existingHistory, { date: now, amount: calculatedEarnings, paid: false ,orderId:order_id}];

      const todayTotal = updatedHistory
        .filter(entry => new Date(entry.date).toISOString().slice(0, 10) === todayDateString)
        .reduce((sum, entry) => sum + entry.amount, 0);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);

      const weekTotal = updatedHistory
        .filter(entry => !entry.paid && new Date(entry.date) >= oneWeekAgo)
        .reduce((sum, entry) => sum + entry.amount, 0);

      let monthlyAmount = 0;
      let completeAmount = 0;
      let lastPaidAtToUpdate: Date | null = null;
      let nextPaidAtToUpdate: Date | null = null;

      const lastPaid = deliveryBoy.lastPaidAt;
      const unpaidEntries = updatedHistory.filter(entry => !entry.paid);

      if (unpaidEntries.length > 0) {
        const unpaidAfterLastPaid = unpaidEntries.filter(entry => {
          const entryDate = new Date(entry.date);
          return !lastPaid || entryDate > new Date(lastPaid);
        });

        let totalUnpaid = unpaidAfterLastPaid.reduce((sum, entry) => sum + entry.amount, 0);

        let remainingCarryOver = deliveryBoy.amountToPayDeliveryBoy || 0;

        if (remainingCarryOver > 0) {
          const deduct = Math.min(remainingCarryOver, calculatedEarnings);
          remainingCarryOver -= deduct;
          totalUnpaid -= deduct;

          deliveryBoy.amountToPayDeliveryBoy = remainingCarryOver;
        }

        monthlyAmount = Math.max(totalUnpaid, 0);
        lastPaidAtToUpdate = lastPaid || new Date(now.getFullYear(), now.getMonth(), 1);
        nextPaidAtToUpdate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      }

      const updatedEarnings = {
        today: todayTotal,
        week: weekTotal,
        history: updatedHistory,
        lastPaidAt: deliveryBoy.lastPaidAt || null,
      };

      let updatedInHandCash = deliveryBoy.inHandCash || 0;
      if (paymentMethod.toLowerCase() === 'cash') {
        updatedInHandCash += Math.round(orderAmount);
      }

      let carryOver = 0;
      if (monthlyAmount > 0 && updatedInHandCash > monthlyAmount) {
        carryOver = updatedInHandCash - monthlyAmount;
      }

      completeAmount = Math.max(monthlyAmount - updatedInHandCash, 0);

      const updateResult = await this.repository.updateEarningsAndCash(
        deliveryBoyId,
        updatedEarnings,
        updatedInHandCash,
        monthlyAmount,
        lastPaidAtToUpdate,
        nextPaidAtToUpdate,
        completeAmount,
        deliveryBoy.amountToPayDeliveryBoy || 0 + carryOver
      );

      if (!updateResult.success) {
        throw new Error(updateResult.message || 'Failed to update earnings and cash');
      }

      return {
        success: true,
        message: 'Earnings updated successfully',
        data: {
          earnings: calculatedEarnings,
          totalEarnings: updatedEarnings,
          inHandCash: updatedInHandCash,
        },
      };
    } catch (error) {
      console.error('Error in orderEarnings:', error);
      return { success: false, message: `Failed to update order earnings: ${(error as Error).message}` };
    }
  }

}