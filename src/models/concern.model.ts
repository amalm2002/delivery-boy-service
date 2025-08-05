import mongoose, { Document, Schema } from 'mongoose';

export interface Concern extends Document {
    deliveryBoyId: string;
    selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
    reason: string;
    description: string;
    zoneId?: string;
    zoneName?: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ConcernSchema = new mongoose.Schema({
    deliveryBoyId: { type: mongoose.Types.ObjectId, ref: 'DeliveryBoy', required: true },
    selectedOption: {
        _id: { type: String },
        title: { type: String },
        description: { type: String },
        category: { type: String },
        isActive: { type: Boolean },
        responseMessage: { type: String },
    },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    zoneId: { type: mongoose.Types.ObjectId, ref: 'Zone' },
    zoneName: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    rejectionReason: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const ConcernModel = mongoose.model<Concern>('Concern', ConcernSchema);