import { GetChatDTO, GetChatResponseDTO } from '../../dto/chat/get-chat.dto';
import { GetConcernResponseDTO } from '../../dto/chat/get-concern.dto';
import { SaveChatDTO } from '../../dto/chat/save-chat.dto';
import { SubmitConcernDTO, SubmitConcernResponseDTO } from '../../dto/chat/submit-concern-chat.dto';
import { SubmitZoneChangeRequestDTO, SubmitZoneChangeRequestResponseDTO } from '../../dto/chat/submit-zone-request-chat.dto';
import { VerifyConcernDTO, VerifyConcernResponseDTO } from '../../dto/chat/verify-concern.dto';
import { IChatService } from '../../services/interfaces/chat.service.interfaces';
import { IChatController } from '../interfaces/chat.controller.interfaces';

export default class ChatController implements IChatController {
   constructor(
        private readonly _chatService: IChatService
    ) {}

    async getChatState(chatRequest: GetChatDTO): Promise<GetChatResponseDTO> {
        return await this._chatService.getChatState(chatRequest);
    }

    async saveChatState(chatToSave: SaveChatDTO): Promise<{ success: boolean; data?: any; message?: string }> {
        return await this._chatService.saveChatState(chatToSave);
    }

    async clearChatState(chatToClear:GetChatDTO): Promise<GetChatResponseDTO> {
        return await this._chatService.clearChatState(chatToClear);
    }

    async submitConcern(concern:SubmitConcernDTO): Promise<SubmitConcernResponseDTO> {
        return await this._chatService.submitConcern(concern);
    }

    async submitZoneChangeRequest(zoneRequest: SubmitZoneChangeRequestDTO): Promise<SubmitZoneChangeRequestResponseDTO> {
        return await this._chatService.submitZoneChangeRequest(zoneRequest);
    }

    async getAllConcerns(data: void): Promise<GetConcernResponseDTO> {
        return await this._chatService.getAllConcerns(data)
    }

    async verifyTheConcern(verifyRequest: VerifyConcernDTO): Promise<VerifyConcernResponseDTO> {
        return await this._chatService.verifyTheConcern(verifyRequest)
    }

    async getDeliveryBoyConcerns(deliveryBoyRequest: GetChatDTO): Promise<GetConcernResponseDTO> {
        return await this._chatService.getDeliveryBoyConcerns(deliveryBoyRequest)
    }
}