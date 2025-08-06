import { ChatState } from '../../models/chat.model';
import { Concern } from '../../models/concern.model';

export interface IChatRepository {
    getChatState(deliveryBoyId: string): Promise<ChatState | null>;
    saveChatState(deliveryBoyId: string, state: Partial<ChatState>): Promise<ChatState>;
    clearChatState(deliveryBoyId: string): Promise<void>;
    saveConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
        zoneId?: string;
        zoneName?: string;
        status: 'pending' | 'approved' | 'rejected';
        createdAt: Date;
    }): Promise<Concern>;
    updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern>;
    getAllConcerns(data: void): Promise<any>
    updateConcernStatus(concernId: string, updateData: { status: 'approved' | 'rejected'; rejectionReason?: string; updatedAt: Date }): Promise<Concern | null>
    getConcernByDeliveryBoyId(deliveryBoyId: string): Promise<Concern[] | null>
}