import { IDeliveryTrackingController } from '../interfaces/delivery-tarcking.controller.interfaces';
import { IDeliveryBoyTrackingService } from '../../services/interfaces/delivery-tracking.service.interfaces';
import { UpdateOnlineStatusDTO, UpdateOnlineStatusResponseDto } from '../../dto/delivery-boy/update.online.status.dto';
import { UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { GetDeliveryBoyDetailsResponseDto } from '../../dto/delivery-boy/delivery-boy.details.dto';
import { FindNearestDeliveryPartnersRequestDto, FindNearestDeliveryPartnersResponseDto } from '../../dto/delivery-boy/find-nearest-delivery-partners.dto';
import { AssignOrderDTO, AssignOrderResponseDTO } from '../../dto/delivery-boy/assign-order.dto';
import { completeDeliveryDTO, completeDeliveryResponseDTO } from '../../dto/delivery-boy/complete-delivery.dto';
import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { OrderEarningsDTO, OrderEarningsResponseDTO } from '../../dto/delivery-boy/order-earings.dto';

export class DeliveryTrackingController implements IDeliveryTrackingController {
  constructor(private deliveryBoyService: IDeliveryBoyTrackingService) { }

  async updateOnlineStatus(data: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto> {
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

  async getDeliveryBoyDetails(data: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto> {
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

  async findNearestDeliveryPartners(data: FindNearestDeliveryPartnersRequestDto): Promise<FindNearestDeliveryPartnersResponseDto> {
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

  async updateLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
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

  async assignOrder(call: ServerUnaryCall<AssignOrderDTO, AssignOrderResponseDTO>,
    callback: sendUnaryData<AssignOrderResponseDTO>
  ): Promise<void> {
    try {
      const data = call.request;
      const result = await this.deliveryBoyService.assignOrder(data);

      if (!result.success) {
        return callback(null, {
          status: 'error',
          message: result.message || 'Failed to assign order',
        });
      }

      return callback(null, {
        status: 'success',
        message: 'Order assigned successfully',
        data: result.data,
      });
    } catch (error) {
      return callback(null, {
        status: 'error',
        message: (error as Error).message,
      });
    }
  }

  async updateDeliveryBoyLocation(data: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
    try {
      const result = await this.deliveryBoyService.updateDeliveryBoyLocation(data);
      return result;
    } catch (error) {
      console.error('Error in updateDeliveryBoyLocation:', error);
      return { success: false, message: (error as Error).message };
    }
  }

  async completeDelivery(data: completeDeliveryDTO): Promise<completeDeliveryResponseDTO> {
    return await this.deliveryBoyService.completeDelivery(data);
  }

  async orderEarnings(data: OrderEarningsDTO): Promise<OrderEarningsResponseDTO> {
    return await this.deliveryBoyService.orderEarnings(data)
  }

}