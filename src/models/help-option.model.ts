import { Schema, model, Document, Types } from 'mongoose';

export interface IHelpOption extends Document {
    id?: string;
    title: string;
    description?: string;
    category: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const HelpOptionSchema = new Schema<IHelpOption>({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const HelpOptionModel = model<IHelpOption>('HelpOption', HelpOptionSchema);