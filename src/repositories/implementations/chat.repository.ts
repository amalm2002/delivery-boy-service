import { ChatState, ChatStateModel } from '../../models/chat.model';
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
}