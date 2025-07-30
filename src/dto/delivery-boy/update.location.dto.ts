
export interface UpdateLocationDto {
  latitude: number;
  longitude: number;
  deliveryBoyId: string;
}

export interface UpdateLocationResponseDto {
  success?: boolean;
  data?: DeliveryBoyDto;
  message?: string;
  error?: string;
}

export interface DeliveryBoyDto {
  name: string;
  mobile: string;
  email?: string;
  panCard: {
    number: string;
    images: string[];
  };
  license: {
    number: string;
    images: string[];
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName?: string;
    branch?: string;
  };
  profileImage?: string;
  vehicle: 'bike' | 'scooter' | 'cycle';
  location: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'verified' | 'active' | 'inactive' | 'rejected';
  isOnline: boolean;
  isVerified: boolean;
  isActive: boolean;
  rejectionReason?: string;
  zone: {
    id: string;
    name: string;
  };
  rating?: number;
  earnings?: {
    today: number;
    week: number;
    history: {
      date: Date;
      amount: number;
      paid:boolean;
    }[];
  };
  // earnings?: {
  //   today: number;
  //   week: number;
  // };
  lastPaidAt?:Date
  loginHours?: string;
  ordersCompleted?: number;
  pendingOrders?: number;
}
