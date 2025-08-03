export interface IChatController {
    getChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; data?: any; message?: string }>
    saveChatState(data: { deliveryBoyId: string; state: any }): Promise<{ success: boolean; data?: any; message?: string }>
    clearChatState(data: { deliveryBoyId: string }): Promise<{ success: boolean; message?: string }>
}