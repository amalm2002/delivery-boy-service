import mongoose, { Document, Schema } from 'mongoose';

export interface Message extends Document {
    id: string;
    text: string;
    isBot: boolean;
    timestamp: string;
    options?: string[];
    showForm?: boolean;
    showZoneSelection?: boolean;
}

export interface ChatState extends Document {
    deliveryBoyId: string;
    messages: Message[];
    currentStep: 'welcome' | 'menu' | 'concern' | 'zones' | 'completed';
    selectedOption: {
        _id: string;
        title: string;
        description: string;
        category: string;
        isActive: boolean;
        responseMessage: string;
    } | null;
    concernForm: {
        reason: string;
        description: string;
    };
    selectedZone: string;
}

const ChatStateSchema = new mongoose.Schema({
    deliveryBoyId: { type: String, required: true, unique: true },
    messages: [{
        id: String,
        text: String,
        isBot: Boolean,
        timestamp: String,
        options: [String],
        showForm: Boolean,
        showZoneSelection: Boolean,
    }],
    currentStep: { type: String, enum: ['welcome', 'menu', 'concern', 'zones', 'completed'], default: 'welcome' },
    selectedOption: {
        _id: String,
        title: String,
        description: String,
        category: String,
        isActive: Boolean,
        responseMessage: String,
    },
    concernForm: {
        reason: String,
        description: String,
    },
    selectedZone: String,
}, { timestamps: true });

export const ChatStateModel = mongoose.model<ChatState>('ChatState', ChatStateSchema);
