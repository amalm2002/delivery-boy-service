import { IDeliveryRate, DeliveryRate } from "../../models/delivery-rate.model";
import { IDeliveryRateModelRepository } from "../interfaces/delivery-rate-model.repository.interfaces";
import { BaseRepository } from "./base.repository";

export class DeliveryRateModelRepository extends BaseRepository<IDeliveryRate> implements IDeliveryRateModelRepository {
    constructor() {
        super(DeliveryRate)
    }

    async createRidePaymentRule(data: { KM: number; ratePerKm: number; vehicleType: string; isActive: boolean; }): Promise<IDeliveryRate | null> {

        const existingRule = await this.model.findOne({ vehicleType: data.vehicleType });

        if (existingRule) {
            throw new Error(`Rule for vehicle type "${data.vehicleType}" already exists`);
        }

        const newRule = await this.create({
            minKm: data.KM,
            ratePerKm: data.ratePerKm,
            vehicleType: data.vehicleType as 'bike' | 'scooter' | 'cycle',
            isActive: data.isActive,
        });

        return newRule;
    }

}