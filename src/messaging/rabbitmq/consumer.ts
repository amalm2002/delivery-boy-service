import { Channel, ConsumeMessage } from 'amqplib';
import { MessageHandler } from './messageHandiler';
import { DeliveryBoyController } from '../../controllers/implementations/delivery-boy.controller';
import { ZoneController } from '../../controllers/implementations/zone.controller';
import { DeliveryBoyRepository } from '../../repositories/implementations/delivery-boy.repository';
import { ZoneRepository } from '../../repositories/implementations/zone.repository';
import { DeliveryBoyService } from '../../services/implementations/delivery-boy.service';
import { ZoneService } from '../../services/implementations/zone.service';
import { AuthService } from '../../services/implementations/auth.service';

export default class Consumer {
  private channel: Channel;
  private rpcQueue: string;
  private controllers: {
    deliveryBoyController: DeliveryBoyController;
    zoneController: ZoneController;
  };

  constructor(channel: Channel, rpcQueue: string) {
    this.channel = channel;
    this.rpcQueue = rpcQueue;

    const authService = new AuthService();
    const deliveryBoyRepository = new DeliveryBoyRepository();
    const zoneRepository = new ZoneRepository();
    const deliveryBoyService = new DeliveryBoyService(deliveryBoyRepository, zoneRepository, authService);
    const zoneService = new ZoneService(zoneRepository);

    this.controllers = {
      deliveryBoyController: new DeliveryBoyController(deliveryBoyService),
      zoneController: new ZoneController(zoneService),
    };
  }

  async consumeMessage() {
    console.log('Ready to consume messages...');

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if (message) {
          if (message.properties) {
            const { correlationId, replyTo } = message.properties;
            const operation = message.properties.headers?.function;

            if (!correlationId || !replyTo) {
              console.log('Missing some properties...');
              return;
            }

            if (message.content) {
              await MessageHandler.handle(
                operation,
                JSON.parse(message.content.toString()),
                correlationId,
                replyTo,
                this.controllers
              );
            } else {
              console.log('Received message content is null or undefined.');
            }
          } else {
            console.log('Received message is null');
          }
        } else {
          console.log('Missing message properties');
        }
      },
      { noAck: true }
    );
  }
}