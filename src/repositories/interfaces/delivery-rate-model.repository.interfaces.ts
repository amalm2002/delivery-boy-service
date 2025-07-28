import { IDeliveryRate } from "../../models/delivery-rate.model";

export interface IDeliveryRateModelRepository {
    createRidePaymentRule(data: { KM: number, ratePerKm: number, vehicleType: string, isActive: boolean }): Promise<IDeliveryRate | null>
}