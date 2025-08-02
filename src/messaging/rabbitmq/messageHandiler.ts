import { DeliveryBoyController } from '../../controllers/implementations/delivery-boy.controller';
import { DeliveryTrackingController } from '../../controllers/implementations/delivery-tarcking.controller';
import { ZoneController } from '../../controllers/implementations/zone.controller';
import RabbitMQClient from './client';

export class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string,
    controllers: {
      deliveryBoyController: DeliveryBoyController;
      zoneController: ZoneController;
      deliveryTrackingController: DeliveryTrackingController;
    }
  ) {
    const { deliveryBoyController, zoneController, deliveryTrackingController } = controllers;
    let response;

    console.log('Operation:', operation, 'Data:', data);

    switch (operation) {
      case 'Delivery-Boy-Register':
        response = await deliveryBoyController.register(data);
        break;
      case 'Delivery-Boy-location':
        response = await deliveryBoyController.updateLocation(data);
        break;
      case 'Delivery-Boy-Details':
      case 'Delivery-Boy-Resubmit':
        response = await deliveryBoyController.updateDetails(data);
        break;
      case 'Delivery-Boy-Vehicle':
        response = await deliveryBoyController.updateVehicle(data);
        break;
      case 'Delivery-Boy-Zone':
        response = await deliveryBoyController.updateZone(data);
        break;
      case 'Fetch-All-Delivery-Boys':
        response = await deliveryBoyController.getAllDeliveryBoys(data);
        break;
      case 'Fetch-All-Delivery-Boy':
        response = await deliveryBoyController.getAllDeliveryBoy(data);
        break;
      case 'Update-The-Delivery-Boy-Status':
        response = await deliveryBoyController.updateDeliveryBoyStatus(data);
        break;
      case 'Fetch-The-Delivery-Boy-Deatils':
        response = await deliveryBoyController.fetchDeliveryBoyDetails(data);
        break;
      case 'Verify-Delivery-Boy-Documents':
        response = await deliveryBoyController.verifyDocuments(data);
        break;
      case 'Rejected-DeliveryBoy-Documents':
        response = await deliveryBoyController.rejectDocuments(data);
        break;
      case 'Get-Rejected-Documents':
        response = await deliveryBoyController.getRejectedDocuments(data);
        break;
      case 'Zone-Creation':
        response = await zoneController.zoneCreation(data);
        break;
      case 'Fetch-Delivery-Boy-Zone':
        response = await zoneController.fetchZones(data);
        break;
      case 'Delete-Delivery-Boy-Zone':
        response = await zoneController.deleteZone(data);
        break;
      case 'Partner-Enable-Online-Status':
        response = await deliveryTrackingController.updateOnlineStatus(data);
        break;
      case 'Get-Delivery-Boy-Details':
        response = await deliveryTrackingController.getDeliveryBoyDetails(data);
        break;
      case 'Find-The-Nearest-Delivery-Partner':
        response = await deliveryTrackingController.findNearestDeliveryPartners(data);
        break;
      case 'Delivery-Boy-Location-Update':
        response = await deliveryTrackingController.updateLocation(data);
        break;
      case 'Assign-Delivery-Boy':
        response = await deliveryTrackingController.assignOrder(data);
        break;
      case 'Update-Delivery-Boy-Location':
        response = await deliveryTrackingController.updateDeliveryBoyLocation(data);
        break;
      case 'Complete-Delivery':
        response = await deliveryTrackingController.completeDelivery(data);
        break;
      case 'Order-Earnings':
        response = await deliveryTrackingController.orderEarnings(data);
        break;
      case 'Add-Ride-Payment-Rule':
        response = await deliveryBoyController.addRidePaymentRule(data);
        break;
      case 'Get-Ride-Rate-Payment-Rules':
        response = await deliveryBoyController.getRidePaymentRules(data);
        break;
      case 'Update-Ride-Payment-Rule':
        response = await deliveryBoyController.updateRidePaymentRule(data);
        break;
      case 'Block-Ride-Payment-Rule':
        response = await deliveryBoyController.blockRidePaymentRule(data);
        break;
      case 'Unblock-Ride-Payment-Rule':
        response = await deliveryBoyController.unblockRidePaymentRule(data);
        break;
      case 'Check-In-Hand-Cash-Limit':
        response = await deliveryBoyController.checkTheInHandCashLimit(data);
        break;
      case 'Update-Delivery-Boy-Earnings':
        response = await deliveryBoyController.updatedeliveryBoyEarnings(data);
        break;
      case 'Clear-In-Hand-Cash':
        response = await deliveryBoyController.clearInHandCashOnDeliveryBoy(data);
        break;
      case 'User-Review-For-Delivery-Boy':
        response = await deliveryBoyController.userReviewFordeliveryBoy(data);
        break;
      case 'Get-The-DeliveryBoy-Review':
        response = await deliveryBoyController.getDeliveryBoyReview(data);
        break;
      case 'Delete-DeliveryBoy-Review':
        response = await deliveryBoyController.deleteDeliveryBoyReview(data);
        break;
      default:
        response = { error: 'Unknown operation' };
    }

    await RabbitMQClient.produce(response, correlationId, replyTo);
  }
}