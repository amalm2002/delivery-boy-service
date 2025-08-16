

import 'dotenv/config'
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import connectDB from '../config/mongo.config';
import path from 'path';
import { DeliveryBoyController } from '../controllers/implementations/delivery-boy.controller';
import { DeliveryBoyService } from '../services/implementations/delivery-boy.service';
import { DeliveryBoyRepository } from '../repositories/implementations/delivery-boy.repository';
import { ZoneRepository } from '../repositories/implementations/zone.repository';
import { AuthService } from '../services/implementations/auth.service';
import { DeliveryRateModelRepository } from '../repositories/implementations/delivery-rate-model.repository';
import { DeliveryTrackingController } from '../controllers/implementations/delivery-tarcking.controller';
import { DeliveryBoyTrackingService } from '../services/implementations/delivery-tracking.service';


connectDB()

const deliveryBoyRepository = new DeliveryBoyRepository()
const deliveryBoyZoneRepository = new ZoneRepository()
const deliveryRateModelRepository = new DeliveryRateModelRepository()
const authService = new AuthService();
const deliveryBoyService = new DeliveryBoyService(deliveryBoyRepository, deliveryBoyZoneRepository, authService, deliveryRateModelRepository)
const deliveryBoytrackingService=new DeliveryBoyTrackingService(deliveryBoyRepository,deliveryRateModelRepository)

const deliveryBoyController = new DeliveryBoyController(deliveryBoyService)
const deliveryBoytrackingController=new DeliveryTrackingController(deliveryBoytrackingService)



const packageDef = protoLoader.loadSync(path.resolve(__dirname, '../proto/delivery.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as any
const deliveryProto = grpcObject.delivery_package;;

if (!deliveryProto || !deliveryProto.DeliveryBoyService || !deliveryProto.DeliveryBoyService.service) {
    console.error("Failed to load the Delivery-boy service from the proto file.");
    process.exit(1);
}

const server = new grpc.Server()

server.addService(deliveryProto.DeliveryBoyService.service, {
    FetchDeliveryBoy:deliveryBoyController.fetchDeliveryBoyDetailsGrpc.bind(deliveryBoyController),
    DeliveryBoyUpdate:deliveryBoytrackingController.assignOrder.bind(deliveryBoytrackingController)
})

export const grpcServer = () => {
    const port = process.env.DELIVERY_GRPC_PORT || '4000'
    const Domain = process.env.NODE_ENV === 'dev' ? process.env.DEV_DOMAIN : process.env.PRO_DOMAIN_USER;

    server.bindAsync(`${Domain}:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
        if (err) {
            console.error("Error starting gRPC server:", err)
            return
        }
        console.log(`gRPC DeliveryBoy server started on ${Domain}:${bindPort}`);
    })
}



