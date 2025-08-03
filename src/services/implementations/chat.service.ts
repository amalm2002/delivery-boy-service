import { IChatRepository } from '../../repositories/interfaces/chat.repository.interfaces';
import { IChatService } from '../interfaces/chat.service.interfaces';
import { ChatState } from '../../models/chat.model';

export default class ChatService implements IChatService {
    private chatRepository: IChatRepository;

    constructor(chatRepository: IChatRepository) {
        this.chatRepository = chatRepository;
    }

    async getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: ChatState | null; message?: string }> {
        try {
            const chatState = await this.chatRepository.getChatState(data.deliveryBoyId);
            return { success: true, data: chatState };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }

    async saveChatState(data: { deliveryBoyId: string; state: Partial<ChatState> }): Promise<{ success: boolean; data?: ChatState; message?: string }> {
        try {
            const chatState = await this.chatRepository.saveChatState(data.deliveryBoyId, data.state);
            return { success: true, data: chatState };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }

    async clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }> {
        try {
            await this.chatRepository.clearChatState(data.deliveryBoyId);
            return { success: true, message: 'Chat state cleared' };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }
}