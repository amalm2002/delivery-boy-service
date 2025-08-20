import { IChatRepository } from '../../repositories/interfaces/chat.repository.interfaces';
import { IChatService } from '../interfaces/chat.service.interfaces';
import { Concern } from '../../models/concern.model';
import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';
import { GetChatDTO, GetChatResponseDTO } from '../../dto/chat/get-chat.dto';
import { SaveChatDTO } from '../../dto/chat/save-chat.dto';
import { SubmitConcernDTO, SubmitConcernResponseDTO } from '../../dto/chat/submit-concern-chat.dto';
import { SubmitZoneChangeRequestDTO, SubmitZoneChangeRequestResponseDTO } from '../../dto/chat/submit-zone-request-chat.dto';
import { GetConcernResponseDTO } from '../../dto/chat/get-concern.dto';
import { VerifyConcernDTO, VerifyConcernResponseDTO } from '../../dto/chat/verify-concern.dto';

export default class ChatService implements IChatService {

    constructor(
        private readonly _chatRepository: IChatRepository,
        private readonly _deliveryBoyrepository: IDeliveryBoyRepository
    ) { }

    async getChatState(chatRequest: GetChatDTO): Promise<GetChatResponseDTO> {
        try {
            const chatState = await this._chatRepository.getChatState(chatRequest.deliveryBoyId);
            return { success: true, data: chatState };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }

    async saveChatState(chatToSave: SaveChatDTO): Promise<GetChatResponseDTO> {
        try {
            const chatState = await this._chatRepository.saveChatState(chatToSave.deliveryBoyId, chatToSave.state);
            return { success: true, data: chatState };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }

    async clearChatState(chatToClear: GetChatDTO): Promise<GetChatResponseDTO> {
        try {
            await this._chatRepository.clearChatState(chatToClear.deliveryBoyId);
            return { success: true, message: 'Chat state cleared' };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        }
    }

    async submitConcern(concern: SubmitConcernDTO): Promise<SubmitConcernResponseDTO> {
        try {
            const { deliveryBoyId, selectedOption, reason, description } = concern;

            let chatState = await this._chatRepository.getChatState(deliveryBoyId);

            const concernData: {
                deliveryBoyId: string;
                selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
                reason: string;
                description: string;
                status: 'pending' | 'approved' | 'rejected';
                createdAt: Date;
            } = {
                deliveryBoyId,
                selectedOption: selectedOption || null,
                reason,
                description,
                status: 'pending',
                createdAt: new Date(),
            };

            const concerns = await this._chatRepository.saveConcern(concernData);

            if (!chatState) {
                chatState = await this._chatRepository.saveChatState(deliveryBoyId, {
                    deliveryBoyId,
                    messages: [],
                    currentStep: selectedOption?.title === 'Zone Change Request' ? 'zones' : 'completed',
                    selectedOption: selectedOption || null,
                    concernForm: { reason, description, isActive: true },
                    selectedZone: '',
                    concernId: concerns._id.toString(),
                });
            } else {
                chatState = await this._chatRepository.saveChatState(deliveryBoyId, {
                    ...chatState,
                    currentStep: selectedOption?.title === 'Zone Change Request' ? 'zones' : 'completed',
                    selectedOption: selectedOption || chatState.selectedOption,
                    concernForm: { reason, description, isActive: true },
                    concernId: selectedOption?.title === 'Zone Change Request' ? concerns._id.toString() : chatState.concernId,
                });
            }

            return { success: true, message: 'Concern submitted successfully', concernId: concerns._id.toString() };
        } catch (error) {
            console.error('Error in submitConcern:', error);
            return { success: false, message: `Failed to submit concern: ${(error as Error).message}` };
        }
    }

    async submitZoneChangeRequest(zoneRequest: SubmitZoneChangeRequestDTO): Promise<SubmitZoneChangeRequestResponseDTO> {
        try {
            const { deliveryBoyId, concernId, zoneId, zoneName } = zoneRequest;

            let chatState = await this._chatRepository.getChatState(deliveryBoyId);

            await this._chatRepository.updateConcernZone(concernId, zoneId, zoneName);

            if (!chatState) {
                chatState = await this._chatRepository.saveChatState(deliveryBoyId, {
                    deliveryBoyId,
                    messages: [],
                    currentStep: 'completed',
                    selectedOption: { title: 'Zone Change Request' },
                    concernForm: { reason: zoneRequest.reason, description: zoneRequest.description, isActive: true },
                    selectedZone: zoneName,
                    concernId,
                });
            } else {
                chatState = await this._chatRepository.saveChatState(deliveryBoyId, {
                    ...chatState,
                    selectedZone: zoneName,
                    currentStep: 'completed',
                    concernForm: { reason: zoneRequest.reason, description: zoneRequest.description, isActive: true },
                    concernId,
                });
            }

            console.log(`Zone change request updated for deliveryBoyId: ${deliveryBoyId}, concernId: ${concernId}, zoneId: ${zoneId}, zoneName: ${zoneName}`);

            return { success: true, message: 'Zone change request updated successfully' };
        } catch (error) {
            console.error('Error in submitZoneChangeRequest:', error);
            return { success: false, message: `Failed to submit zone change request: ${(error as Error).message}` };
        }
    }

    async updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern> {
        try {
            const concern = await this._chatRepository.updateConcernZone(concernId, zoneId, zoneName);
            return concern;
        } catch (error) {
            throw new Error(`Failed to update concern zone: ${(error as Error).message}`);
        }
    }

    async getAllConcerns(data: void): Promise<GetConcernResponseDTO> {
        try {
            const response = await this._chatRepository.getAllConcerns(data)
            if (!response) {
                return { success: false, message: 'No concerns found' }
            }
            return { success: true, message: 'Success fully fetch', data: response }
        } catch (error) {
            throw new Error(`Failed to get all concern : ${(error as Error).message}`);
        }
    }

    async verifyTheConcern(verifyRequest: VerifyConcernDTO): Promise<VerifyConcernResponseDTO> {
        try {
            const { id, newStatus, rejectionReason, zoneId, zoneName, deliveryBoyId } = verifyRequest;

            const updateData: any = { status: newStatus, updatedAt: new Date() };

            if (newStatus === 'rejected' && rejectionReason) {
                updateData.rejectionReason = rejectionReason;
            }
            const concern = await this._chatRepository.updateConcernStatus(id, updateData);
            if (!concern) {
                throw new Error('Concern not found');
            }

            if (newStatus === 'approved' && zoneId && zoneName && deliveryBoyId) {
                await this._deliveryBoyrepository.updateZone(deliveryBoyId, zoneId, zoneName);
            }

            return { success: true, message: `Concern ${newStatus} successfully`, data: concern };
        } catch (error) {
            console.error('Error in verifyTheConcern service:', error);
            throw new Error(`Failed to verify concern: ${(error as Error).message}`);
        }
    }

    async getDeliveryBoyConcerns(deliveryBoyRequest: GetChatDTO): Promise<GetConcernResponseDTO> {
        try {
            const { deliveryBoyId } = deliveryBoyRequest
            const concern = await this._chatRepository.getConcernByDeliveryBoyId(deliveryBoyId)
            if (!concern) {
                return { success: false, message: 'No concern found' }
            }
            return { success: true, message: 'Concern fetch successfully', data: concern }
        } catch (error) {
            console.error('Error in get delivery-boy concerns service:', error);
            throw new Error(`Failed to fetch delivery-boy concern: ${(error as Error).message}`);

        }
    }
}