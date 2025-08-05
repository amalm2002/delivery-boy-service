import { IChatService } from '../../services/interfaces/chat.service.interfaces';
import { IChatController } from '../interfaces/chat.controller.interfaces';

export default class ChatController implements IChatController {
    private chatService: IChatService;

    constructor(chatService: IChatService) {
        this.chatService = chatService;
    }

    async getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: any; message?: string }> {
        return await this.chatService.getChatState(data);
    }

    async saveChatState(data: { deliveryBoyId: string; state: any }): Promise<{ success: boolean; data?: any; message?: string }> {
        return await this.chatService.saveChatState(data);
    }

    async clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }> {
        return await this.chatService.clearChatState(data);
    }

    async submitConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
    }): Promise<any> {
        return await this.chatService.submitConcern(data);
    }

    async submitZoneChangeRequest(data: { deliveryBoyId: string; concernId: string; zoneId: string; zoneName: string; reason: string; description: string }): Promise<any> {
        return await this.chatService.submitZoneChangeRequest(data);
    }
}