import { Channel, ConsumeMessage } from 'amqplib';
import { MessageHandler } from './messageHandiler';
import { DeliveryBoyController } from '../../controllers/implementations/delivery-boy.controller';
import { ZoneController } from '../../controllers/implementations/zone.controller';
import { DeliveryBoyRepository } from '../../repositories/implementations/delivery-boy.repository';
import { ZoneRepository } from '../../repositories/implementations/zone.repository';
import { DeliveryBoyService } from '../../services/implementations/delivery-boy.service';
import { ZoneService } from '../../services/implementations/zone.service';
import { AuthService } from '../../services/implementations/auth.service';
import { DeliveryTrackingController } from '../../controllers/implementations/delivery-tarcking.controller';
import { DeliveryBoyTrackingService } from '../../services/implementations/delivery-tracking.service';
import { DeliveryRateModelRepository } from '../../repositories/implementations/delivery-rate-model.repository';
import HelpOptionController from '../../controllers/implementations/help-option.controller';
import HelpOptionRepository from '../../repositories/implementations/help-option.repository';
import HelpOptionService from '../../services/implementations/help-option.services';
import ChatController from '../../controllers/implementations/chat.controller';
import ChatRepository from '../../repositories/implementations/chat.repository';
import ChatService from '../../services/implementations/chat.service';

export default class Consumer {
  private channel: Channel;
  private rpcQueue: string;
  private controllers: {
    deliveryBoyController: DeliveryBoyController;
    zoneController: ZoneController;
    deliveryTrackingController: DeliveryTrackingController;
    helpOptionController: HelpOptionController;
    chatController: ChatController;
  };

  constructor(channel: Channel, rpcQueue: string) {
    this.channel = channel;
    this.rpcQueue = rpcQueue;

    const authService = new AuthService();
    const deliveryBoyRepository = new DeliveryBoyRepository();
    const zoneRepository = new ZoneRepository();
    const deliveryRateModelRepository = new DeliveryRateModelRepository()
    const helpOptionRepository = new HelpOptionRepository()
    const chatRepository = new ChatRepository()


    const deliveryBoyService = new DeliveryBoyService(deliveryBoyRepository, zoneRepository, authService, deliveryRateModelRepository);
    const zoneService = new ZoneService(zoneRepository);
    const deliveryTrackingService = new DeliveryBoyTrackingService(deliveryBoyRepository, deliveryRateModelRepository);
    const helpOptionService = new HelpOptionService(helpOptionRepository)
    const chatService = new ChatService(chatRepository,deliveryBoyRepository)

    this.controllers = {
      deliveryBoyController: new DeliveryBoyController(deliveryBoyService),
      zoneController: new ZoneController(zoneService),
      deliveryTrackingController: new DeliveryTrackingController(deliveryTrackingService),
      helpOptionController: new HelpOptionController(helpOptionService),
      chatController: new ChatController(chatService)
    };
  }

  async consumeMessage() {
    console.log('Ready to consume messages...');

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if (!message) return;

        const { correlationId, replyTo } = message.properties;
        const operation = message.properties.headers?.function;

        if (!correlationId || !replyTo) {
          console.log('Missing correlationId or replyTo.');
          this.channel.ack(message);
          return;
        }

        try {
          const content = JSON.parse(message.content.toString());
          await MessageHandler.handle(operation, content, correlationId, replyTo, this.controllers);
          this.channel.ack(message);
        } catch (err) {
          console.error('Error handling message:', err);
          // this.channel.nack(message, false, true);
          this.channel.nack(message, false, false);
        }
      },
      { noAck: false }
    );
  }
}