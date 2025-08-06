import { ChatState } from '../../models/chat.model';
import { Concern } from '../../models/concern.model';

export interface IChatService {
    getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: ChatState | null; message?: string }>;
    saveChatState(data: { deliveryBoyId: string; state: Partial<ChatState> }): Promise<{ success: boolean; data?: ChatState; message?: string }>;
    clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }>;
    submitConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
    }): Promise<any>;
    submitZoneChangeRequest(data: { deliveryBoyId: string; concernId: string; zoneId: string; zoneName: string; reason: string; description: string }): Promise<any>;
    updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern>;
    getAllConcerns(data: void): Promise<any>
    verifyTheConcern(data: any): Promise<any>
    getDeliveryBoyConcerns(data: {deliveryBoyId:string}): Promise<any>
}