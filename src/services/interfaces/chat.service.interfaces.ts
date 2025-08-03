import { ChatState } from '../../models/chat.model';

export interface IChatService {
    getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: ChatState | null; message?: string }>;
    saveChatState(data: { deliveryBoyId: string; state: Partial<ChatState> }): Promise<{ success: boolean; data?: ChatState; message?: string }>;
    clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }>;
}