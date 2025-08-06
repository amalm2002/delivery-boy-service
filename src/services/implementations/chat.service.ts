import { IChatRepository } from '../../repositories/interfaces/chat.repository.interfaces';
import { IChatService } from '../interfaces/chat.service.interfaces';
import { ChatState } from '../../models/chat.model';
import { Concern } from '../../models/concern.model';
import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';

export default class ChatService implements IChatService {
    private chatRepository: IChatRepository;
    private deliveryBoyrepository: IDeliveryBoyRepository;

    constructor(
        chatRepository: IChatRepository,
        deliveryBoyrepository: IDeliveryBoyRepository
    ) {
        this.chatRepository = chatRepository;
        this.deliveryBoyrepository = deliveryBoyrepository;
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

    async submitConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
    }): Promise<any> {
        try {
            const { deliveryBoyId, selectedOption, reason, description } = data;

            let chatState = await this.chatRepository.getChatState(deliveryBoyId);

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

            const concern = await this.chatRepository.saveConcern(concernData);

            if (!chatState) {
                chatState = await this.chatRepository.saveChatState(deliveryBoyId, {
                    deliveryBoyId,
                    messages: [],
                    currentStep: selectedOption?.title === 'Zone Change Request' ? 'zones' : 'completed',
                    selectedOption: selectedOption || null,
                    concernForm: { reason, description, isActive: true },
                    selectedZone: '',
                    concernId: concern._id.toString(),
                });
            } else {
                chatState = await this.chatRepository.saveChatState(deliveryBoyId, {
                    ...chatState,
                    currentStep: selectedOption?.title === 'Zone Change Request' ? 'zones' : 'completed',
                    selectedOption: selectedOption || chatState.selectedOption,
                    concernForm: { reason, description, isActive: true },
                    concernId: selectedOption?.title === 'Zone Change Request' ? concern._id.toString() : chatState.concernId,
                });
            }

            return { success: true, message: 'Concern submitted successfully', concernId: concern._id.toString() };
        } catch (error) {
            console.error('Error in submitConcern:', error);
            return { success: false, message: `Failed to submit concern: ${(error as Error).message}` };
        }
    }

    async submitZoneChangeRequest(data: {
        deliveryBoyId: string;
        concernId: string;
        zoneId: string;
        zoneName: string;
        reason: string;
        description: string;
    }): Promise<any> {
        try {
            const { deliveryBoyId, concernId, zoneId, zoneName } = data;

            let chatState = await this.chatRepository.getChatState(deliveryBoyId);

            await this.chatRepository.updateConcernZone(concernId, zoneId, zoneName);

            if (!chatState) {
                chatState = await this.chatRepository.saveChatState(deliveryBoyId, {
                    deliveryBoyId,
                    messages: [],
                    currentStep: 'completed',
                    selectedOption: { title: 'Zone Change Request' },
                    concernForm: { reason: data.reason, description: data.description, isActive: true },
                    selectedZone: zoneName,
                    concernId,
                });
            } else {
                chatState = await this.chatRepository.saveChatState(deliveryBoyId, {
                    ...chatState,
                    selectedZone: zoneName,
                    currentStep: 'completed',
                    concernForm: { reason: data.reason, description: data.description, isActive: true },
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
            const concern = await this.chatRepository.updateConcernZone(concernId, zoneId, zoneName);
            return concern;
        } catch (error) {
            throw new Error(`Failed to update concern zone: ${(error as Error).message}`);
        }
    }

    async getAllConcerns(data: void): Promise<any> {
        try {
            const response = await this.chatRepository.getAllConcerns(data)
            if (!response) {
                return { success: false, message: 'No concerns found' }
            }
            return { success: true, message: 'Success fully fetch', data: response }
        } catch (error) {
            throw new Error(`Failed to get all concern : ${(error as Error).message}`);
        }
    }

    async verifyTheConcern(data: { id: string; newStatus: 'approved' | 'rejected'; rejectionReason?: string; zoneId?: string; zoneName?: string; deliveryBoyId?: string }): Promise<any> {
        try {
            const { id, newStatus, rejectionReason, zoneId, zoneName, deliveryBoyId } = data;

            const updateData: any = { status: newStatus, updatedAt: new Date() };

            if (newStatus === 'rejected' && rejectionReason) {
                updateData.rejectionReason = rejectionReason;
            }
            const concern = await this.chatRepository.updateConcernStatus(id, updateData);
            if (!concern) {
                throw new Error('Concern not found');
            }

            if (newStatus === 'approved' && zoneId && zoneName && deliveryBoyId) {
                await this.deliveryBoyrepository.updateZone(deliveryBoyId, zoneId, zoneName);
            }

            return { success: true, message: `Concern ${newStatus} successfully`, data: concern };
        } catch (error) {
            console.error('Error in verifyTheConcern service:', error);
            throw new Error(`Failed to verify concern: ${(error as Error).message}`);
        }
    }

    async getDeliveryBoyConcerns(data: { deliveryBoyId: string }): Promise<any> {
        try {
            const { deliveryBoyId } = data
            const concern = await this.chatRepository.getConcernByDeliveryBoyId(deliveryBoyId)
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