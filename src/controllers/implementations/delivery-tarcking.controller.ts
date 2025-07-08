import { IDeliveryBoyTrackingService } from '../../services/interfaces/delivery-tracking.service.interfaces';
import { IDeliveryTrackingController } from '../interfaces/delivery-tarcking.controller.interfaces';
import { UpdateOnlineStatusDTO } from '../../dto/delivery-boy/update.online.status.dto';

export class DeliveryTrackingController implements IDeliveryTrackingController {
  constructor(private deliveryBoyService: IDeliveryBoyTrackingService) { }

  async updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<any> {
    try {
      const result = await this.deliveryBoyService.updateOnlineStatus(data);

      if (!result.success) {
        return {
          status: 'error',
          message: result.message || 'Failed to update online status',
        };
      }

      return {
        status: 'success',
        message: 'Online status updated successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: (error as Error).message,
      };
    }
  }

  async getDeliveryBoyDetails(data: UpdateOnlineStatusDTO): Promise<any> {
    try {
      const result = await this.deliveryBoyService.getDeliveryBoyDetails(data);

      if (!result.success) {
        return {
          status: 'error',
          message: result.message || 'Failed to fetch delivery boy details',
        };
      }

      return {
        status: 'success',
        message: 'Delivery boy details fetched successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: (error as Error).message,
      };
    }
  }

  async findNearestDeliveryPartners(data: { location: { latitude: number; longitude: number } }): Promise<any> {
    try {
      const { location } = data;
      if (!location || !location.latitude || !location.longitude) {
        return { success: false, message: 'Invalid restaurant location' };
      }

      const result = await this.deliveryBoyService.findNearestDeliveryPartners(location);

      if (!result.success) {
        return {
          success: false,
          message: result.message || 'No suitable delivery partners found',
        };
      }

      return {
        success: true,
        message: 'Nearest delivery partners fetched successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async updateLocation(data: { deliveryBoyId: string; latitude: number; longitude: number }): Promise<any> {
    try {
      const result = await this.deliveryBoyService.updateLocation(data);
      if (!result.success) {
        return { success: false, message: result.message || 'Failed to update location' };
      }
      return { success: true, message: 'Location updated successfully', data: result.data };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async assignOrder(data: { deliveryBoyId: string; orderId: string }): Promise<any> {
    try {
      const result = await this.deliveryBoyService.assignOrder(data);
      if (!result.success) {
        return {
          status: 'error',
          message: result.message || 'Failed to assign order',
        };
      }
      return {
        status: 'success',
        message: 'Order assigned successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        status: 'error',
        message: (error as Error).message,
      };
    }
  }

  async updateDeliveryBoyLocation(data: {
    deliveryBoyId: string;
    latitude: number;
    longitude: number;
  }): Promise<any> {
    try {
      const result = await this.deliveryBoyService.updateDeliveryBoyLocation(data);
      return result;
    } catch (error) {
      console.error('Error in updateDeliveryBoyLocation:', error);
      return { success: false, message: (error as Error).message };
    }
  }

  async completeDelivery(data: { orderId: string; deliveryBoyId: string }): Promise<any> {
    return await this.deliveryBoyService.completeDelivery(data);
  }

}