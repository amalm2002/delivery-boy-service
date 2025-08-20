import { GetChatDTO, GetChatResponseDTO } from '../../dto/chat/get-chat.dto';
import { GetConcernResponseDTO } from '../../dto/chat/get-concern.dto';
import { SaveChatDTO } from '../../dto/chat/save-chat.dto';
import { SubmitConcernDTO, SubmitConcernResponseDTO } from '../../dto/chat/submit-concern-chat.dto';
import { SubmitZoneChangeRequestDTO, SubmitZoneChangeRequestResponseDTO } from '../../dto/chat/submit-zone-request-chat.dto';
import { VerifyConcernDTO, VerifyConcernResponseDTO } from '../../dto/chat/verify-concern.dto';
import { Concern } from '../../models/concern.model';

export interface IChatService {
    getChatState(chatRequest: GetChatDTO): Promise<GetChatResponseDTO>;
    saveChatState(chatToSave: SaveChatDTO): Promise<GetChatResponseDTO>;
    clearChatState(chatToClear: GetChatDTO): Promise<GetChatResponseDTO>;
    submitConcern(concern:SubmitConcernDTO): Promise<SubmitConcernResponseDTO>;
    submitZoneChangeRequest(zoneRequest: SubmitZoneChangeRequestDTO): Promise<SubmitZoneChangeRequestResponseDTO>;
    updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern>;
    getAllConcerns(data: void): Promise<GetConcernResponseDTO>
    verifyTheConcern(verifyRequest: VerifyConcernDTO): Promise<VerifyConcernResponseDTO>
    getDeliveryBoyConcerns(deliveryBoyRequest: GetChatDTO): Promise<GetConcernResponseDTO>
}