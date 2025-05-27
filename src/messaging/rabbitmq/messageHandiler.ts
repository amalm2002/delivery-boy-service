import { DeliveryBoyController } from '../../controllers/implementations/delivery-boy.controller';
import { ZoneController } from '../../controllers/implementations/zone.controller';
import  RabbitMQClient  from './client';

export class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string,
    controllers: {
      deliveryBoyController: DeliveryBoyController;
      zoneController: ZoneController;
    }
  ) {
    const { deliveryBoyController, zoneController } = controllers;
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
      default:
        response = { error: 'Unknown operation' };
    }

    await RabbitMQClient.produce(response, correlationId, replyTo);
  }
}