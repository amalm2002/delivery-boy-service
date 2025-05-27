
// import { Channel, connect, Connection } from "amqplib";
// import Consumer from "./consumer";
// import Producer from "./producer";
// import rabbitMq from "../../config/rabbitmq.config";

// class RabbitMQClient {
//     private static instance: RabbitMQClient;
//     private isInitialized = false;
//     private producer: Producer | undefined;
//     private consumer: Consumer | undefined;
//     private connection: Connection | undefined;
//     private producerChannel: Channel | undefined;
//     private consumerChannel: Channel | undefined;

//     private constructor() {}

//     public static getInstance() {
//         if (!this.instance) {
//             this.instance = new RabbitMQClient();
//         }
//         return this.instance;
//     }

//     async initialize() {
//         if (this.isInitialized) {
//             return;
//         }

//         try {
//             this.connection = await connect(rabbitMq.rebbitMQ.url);

//             const [producerChannel, consumerChannel] = await Promise.all([
//                 this.connection.createChannel(),
//                 this.connection.createChannel()
//             ]);
//             this.producerChannel = producerChannel;
//             this.consumerChannel = consumerChannel;

//             const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
//                 rabbitMq.queue.deliveryBoyQueue,
//                 { exclusive: true }
//             );

//             this.producer = new Producer(this.producerChannel);
//             this.consumer = new Consumer(this.consumerChannel, rpcQueue);

//             this.consumer.consumeMessage();

//             this.isInitialized = true;
//         } catch (error) {
//             console.log('rabbitMQ error........', error);
//         }
//     }

//     async produce(data: any, correlationId: string, replyToQueue: string) {
//         if (!this.isInitialized) {
//             await this.initialize();
//         }

//         return await this.producer?.produceMessages(
//             data,
//             correlationId,
//             replyToQueue
//         );
//     }
// }

// export default RabbitMQClient.getInstance();



import { Channel, connect, Connection } from 'amqplib';
import Consumer from './consumer';
import Producer from './producer';
import rabbitMQConfig from '../../config/rabbitmq.config';

export class RabbitMQClient {
  private static instance: RabbitMQClient;
  private isInitialized = false;
  private producer?: Producer;
  private consumer?: Consumer;
  private connection?: Connection;
  private producerChannel?: Channel;
  private consumerChannel?: Channel;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQClient();
    }
    return this.instance;
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }

    try {
      this.connection = await connect(rabbitMQConfig.rebbitMQ.url);

      const [producerChannel, consumerChannel] = await Promise.all([
        this.connection.createChannel(),
        this.connection.createChannel(),
      ]);
      this.producerChannel = producerChannel;
      this.consumerChannel = consumerChannel;

      const { queue: rpcQueue } = await this.consumerChannel.assertQueue(rabbitMQConfig.queue.deliveryBoyQueue, { exclusive: true });

      this.producer = new Producer(this.producerChannel);
      this.consumer = new Consumer(this.consumerChannel, rpcQueue);

      this.consumer.consumeMessage();

      this.isInitialized = true;
    } catch (error) {
      console.error('RabbitMQ error:', error);
    }
  }

  async produce(data: any, correlationId: string, replyToQueue: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    return await this.producer?.produceMessages(data, correlationId, replyToQueue);
  }
}

export default RabbitMQClient.getInstance();