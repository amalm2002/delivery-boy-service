import { IChatService } from '../../services/interfaces/chat.service.interfaces';
import { IChatController } from '../interfaces/chat.controller.interfaces';

export default class ChatController implements IChatController {
    private chatService: IChatService;

    constructor(chatService: IChatService) {
        this.chatService = chatService;
    }

    async getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: any; message?: string }> {
        console.log('getChatState data:', data);
        return await this.chatService.getChatState(data);
    }

    async saveChatState(data: { deliveryBoyId: string; state: any }): Promise<{ success: boolean; data?: any; message?: string }> {
        console.log('saveChatState data:', data);
        return await this.chatService.saveChatState(data);
    }

    async clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }> {
        console.log('clearChatState data:', data);
        return await this.chatService.clearChatState(data);
    }
}