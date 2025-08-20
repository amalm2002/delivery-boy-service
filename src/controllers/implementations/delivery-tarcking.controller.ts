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
  constructor(
    private readonly _deliveryBoyService: IDeliveryBoyTrackingService
  ) { }

  async updateOnlineStatus(statusUpdate: UpdateOnlineStatusDTO): Promise<UpdateOnlineStatusResponseDto> {
    try {
      const result = await this._deliveryBoyService.updateOnlineStatus(statusUpdate);

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

  async getDeliveryBoyDetails(detailsRequest: UpdateOnlineStatusDTO): Promise<GetDeliveryBoyDetailsResponseDto> {
    try {
      const result = await this._deliveryBoyService.getDeliveryBoyDetails(detailsRequest);

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

  async findNearestDeliveryPartners(locationQuery: FindNearestDeliveryPartnersRequestDto): Promise<FindNearestDeliveryPartnersResponseDto> {
    try {
      const { location } = locationQuery;
      if (!location || !location.latitude || !location.longitude) {
        return { success: false, message: 'Invalid restaurant location' };
      }

      const result = await this._deliveryBoyService.findNearestDeliveryPartners(location);

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

  async updateLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
    try {
      const result = await this._deliveryBoyService.updateLocation(locationUpdate);
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
      const result = await this._deliveryBoyService.assignOrder(data);

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

  async updateDeliveryBoyLocation(locationUpdate: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
    try {
      const result = await this._deliveryBoyService.updateDeliveryBoyLocation(locationUpdate);
      return result;
    } catch (error) {
      console.error('Error in updateDeliveryBoyLocation:', error);
      return { success: false, message: (error as Error).message };
    }
  }

  async completeDelivery(deliveryCompletion: completeDeliveryDTO): Promise<completeDeliveryResponseDTO> {
    return await this._deliveryBoyService.completeDelivery(deliveryCompletion);
  }

  async orderEarnings(earningsRequest: OrderEarningsDTO): Promise<OrderEarningsResponseDTO> {
    return await this._deliveryBoyService.orderEarnings(earningsRequest)
  }

}