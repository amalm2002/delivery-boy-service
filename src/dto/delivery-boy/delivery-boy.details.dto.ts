export interface DeliveryBoyDetailsDTO {
    _id?:any|undefined;
    name: string;
    email?: string;
    mobile: string;
    rating?: number;
    isOnline: boolean;
    earnings?: {
        today: number;
        week: number;
    };
    loginHours?: string;
    ordersCompleted?: number;
    pendingOrders?: number;
    location?: {
        latitude: number;
        longitude: number;
    };
    zone?: {
    id: string; 
    name: string;
  }
}