import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryRate extends Document {
    minKm: number;
    ratePerKm: number;
    vehicleType: 'bike' | 'scooter' | 'cycle';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const DeliveryRateSchema: Schema = new Schema(
    {
        minKm: { type: Number, required: true },
        ratePerKm: { type: Number, required: true },
        vehicleType: {
            type: String,
            enum: ['bike', 'scooter', 'car', 'cycle'],
            required: true,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const DeliveryRate = mongoose.model<IDeliveryRate>('DeliveryRate', DeliveryRateSchema);
