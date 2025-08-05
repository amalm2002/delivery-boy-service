import mongoose, { Document, Schema } from 'mongoose';

export interface ChatState extends Document {
    deliveryBoyId: string;
    messages: {
        id: string;
        text: string;
        isBot: boolean;
        timestamp: string;
        options?: string[];
        showForm?: boolean;
        showZoneSelection?: boolean;
    }[];
    currentStep: 'welcome' | 'menu' | 'concern' | 'zones' | 'completed';
    selectedOption: {
        _id?: string;
        title: string;
        description?: string;
        category?: string;
        isActive?: boolean;
        responseMessage?: string;
    } | null;
    concernForm: {
        reason: string;
        description: string;
        isActive: boolean;
    };
    selectedZone: string;
    concernId?: string; 
    createdAt: Date;
    updatedAt: Date;
}

const ChatStateSchema = new mongoose.Schema({
    deliveryBoyId: { type: mongoose.Types.ObjectId, required: true },
    messages: [{
        id: { type: String, required: true },
        text: { type: String, required: true },
        isBot: { type: Boolean, required: true },
        timestamp: { type: String, required: true },
        options: [{ type: String }],
        showForm: { type: Boolean },
        showZoneSelection: { type: Boolean },
    }],
    currentStep: { type: String, enum: ['welcome', 'menu', 'concern', 'zones', 'completed'], default: 'welcome' },
    selectedOption: {
        _id: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        category: { type: String },
        isActive: { type: Boolean },
        responseMessage: { type: String },
    },
    concernForm: {
        reason: { type: String, required: true },
        description: { type: String, required: true },
        isActive: { type: Boolean, required: true },
    },
    selectedZone: { type: String, default: '' },
    concernId: { type: mongoose.Types.ObjectId }, 
}, { timestamps: true });

export const ChatStateModel = mongoose.model<ChatState>('ChatState', ChatStateSchema);