import { GetChatDTO, GetChatResponseDTO } from '../../dto/chat/get-chat.dto';
import { GetConcernResponseDTO } from '../../dto/chat/get-concern.dto';
import { SaveChatDTO } from '../../dto/chat/save-chat.dto';
import { SubmitConcernDTO, SubmitConcernResponseDTO } from '../../dto/chat/submit-concern-chat.dto';
import { SubmitZoneChangeRequestDTO, SubmitZoneChangeRequestResponseDTO } from '../../dto/chat/submit-zone-request-chat.dto';
import { VerifyConcernDTO, VerifyConcernResponseDTO } from '../../dto/chat/verify-concern.dto';
import { IChatService } from '../../services/interfaces/chat.service.interfaces';
import { IChatController } from '../interfaces/chat.controller.interfaces';

export default class ChatController implements IChatController {
    private chatService: IChatService;

    constructor(chatService: IChatService) {
        this.chatService = chatService;
    }

    async getChatState(data: GetChatDTO): Promise<GetChatResponseDTO> {
        return await this.chatService.getChatState(data);
    }

    async saveChatState(data: SaveChatDTO): Promise<{ success: boolean; data?: any; message?: string }> {
        return await this.chatService.saveChatState(data);
    }

    async clearChatState(data:GetChatDTO): Promise<GetChatResponseDTO> {
        return await this.chatService.clearChatState(data);
    }

    async submitConcern(data:SubmitConcernDTO): Promise<SubmitConcernResponseDTO> {
        return await this.chatService.submitConcern(data);
    }

    async submitZoneChangeRequest(data: SubmitZoneChangeRequestDTO): Promise<SubmitZoneChangeRequestResponseDTO> {
        return await this.chatService.submitZoneChangeRequest(data);
    }

    async getAllConcerns(data: void): Promise<GetConcernResponseDTO> {
        return await this.chatService.getAllConcerns(data)
    }

    async verifyTheConcern(data: VerifyConcernDTO): Promise<VerifyConcernResponseDTO> {
        return await this.chatService.verifyTheConcern(data)
    }

    async getDeliveryBoyConcerns(data: GetChatDTO): Promise<GetConcernResponseDTO> {
        return await this.chatService.getDeliveryBoyConcerns(data)
    }
}