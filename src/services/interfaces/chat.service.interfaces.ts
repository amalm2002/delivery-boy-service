import { GetChatDTO, GetChatResponseDTO } from '../../dto/chat/get-chat.dto';
import { GetConcernResponseDTO } from '../../dto/chat/get-concern.dto';
import { SaveChatDTO } from '../../dto/chat/save-chat.dto';
import { SubmitConcernDTO, SubmitConcernResponseDTO } from '../../dto/chat/submit-concern-chat.dto';
import { SubmitZoneChangeRequestDTO, SubmitZoneChangeRequestResponseDTO } from '../../dto/chat/submit-zone-request-chat.dto';
import { VerifyConcernDTO, VerifyConcernResponseDTO } from '../../dto/chat/verify-concern.dto';
import { Concern } from '../../models/concern.model';

export interface IChatService {
    getChatState(data: GetChatDTO): Promise<GetChatResponseDTO>;
    saveChatState(data: SaveChatDTO): Promise<GetChatResponseDTO>;
    clearChatState(data: GetChatDTO): Promise<GetChatResponseDTO>;
    submitConcern(data:SubmitConcernDTO): Promise<SubmitConcernResponseDTO>;
    submitZoneChangeRequest(data: SubmitZoneChangeRequestDTO): Promise<SubmitZoneChangeRequestResponseDTO>;
    updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern>;
    getAllConcerns(data: void): Promise<GetConcernResponseDTO>
    verifyTheConcern(data: VerifyConcernDTO): Promise<VerifyConcernResponseDTO>
    getDeliveryBoyConcerns(data: GetChatDTO): Promise<GetConcernResponseDTO>
}