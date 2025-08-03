import { ChatState } from '../../models/chat.model';

export interface IChatRepository {
    getChatState(deliveryBoyId: string): Promise<ChatState | null>;
    saveChatState(deliveryBoyId: string, state: Partial<ChatState>): Promise<ChatState>;
    clearChatState(deliveryBoyId: string): Promise<void>;
}