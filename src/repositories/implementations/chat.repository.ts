import { ChatState, ChatStateModel } from '../../models/chat.model';
import { Concern, ConcernModel } from '../../models/concern.model';
import { IChatRepository } from '../interfaces/chat.repository.interfaces';
import { BaseRepository } from './base.repository';

export default class ChatRepository extends BaseRepository<ChatState> implements IChatRepository {
    constructor() {
        super(ChatStateModel);
    }

    async getChatState(deliveryBoyId: string): Promise<ChatState | null> {
        try {
            const chatState = await this.model.findOne({ deliveryBoyId }).exec();
            return chatState;
        } catch (error) {
            throw new Error(`Failed to fetch chat state: ${(error as Error).message}`);
        }
    }

    async saveChatState(deliveryBoyId: string, state: Partial<ChatState>): Promise<ChatState> {
        try {
            const chatState = await this.model.findOneAndUpdate(
                { deliveryBoyId },
                { $set: state },
                { upsert: true, new: true }
            ).exec();
            return chatState;
        } catch (error) {
            throw new Error(`Failed to save chat state: ${(error as Error).message}`);
        }
    }

    async clearChatState(deliveryBoyId: string): Promise<void> {
        try {
            await this.model.deleteOne({ deliveryBoyId }).exec();
        } catch (error) {
            throw new Error(`Failed to clear chat state: ${(error as Error).message}`);
        }
    }

    async saveConcern(data: {
        deliveryBoyId: string;
        selectedOption: { _id?: string; title: string; description?: string; category?: string; isActive?: boolean; responseMessage?: string } | null;
        reason: string;
        description: string;
        zoneId?: string;
        zoneName?: string;
        status: 'pending' | 'approved' | 'rejected';
        createdAt: Date;
    }): Promise<Concern> {
        try {
            const concern = await ConcernModel.create(data);
            return concern;
        } catch (error) {
            throw new Error(`Failed to save concern: ${(error as Error).message}`);
        }
    }

    async updateConcernZone(concernId: string, zoneId: string, zoneName: string): Promise<Concern> {
        try {
            const concern = await ConcernModel.findByIdAndUpdate(
                concernId,
                { $set: { zoneId, zoneName, updatedAt: new Date() } },
                { new: true }
            ).exec();
            if (!concern) {
                throw new Error('Concern not found');
            }
            return concern;
        } catch (error) {
            throw new Error(`Failed to update concern zone: ${(error as Error).message}`);
        }
    }
}