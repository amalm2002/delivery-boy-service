import { ChatState } from "./get-chat.dto";

export interface SaveChatDTO {
    deliveryBoyId: string;
    state: Partial<ChatState>
}