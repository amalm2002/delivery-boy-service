import { Schema, model } from 'mongoose';
import { ISchema } from './interfaces/schema.interface';

export interface IDeliveryBoy extends ISchema {
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
  reviews?: {
    userId: string;
    orderId: string;
    rating: number;
    comment?: string;
    createdAt?: Date;
  }[];
  earnings?: {
    today: number;
    week: number;
    history: {
      date: Date;
      amount: number;
      paid: boolean;
      orderId: string
    }[];
  };
  lastPaidAt?: Date;
  nextPaidAt?: Date;
  completeAmount?: number;
  loginHours?: string;
  monthlyAmount?: number;
  ordersCompleted?: number;
  pendingOrders?: number;
  inHandCash?: number;
  amountToPayDeliveryBoy?: number;
}

const deliveryBoySchema = new Schema<IDeliveryBoy>(
  {
    name: { type: String },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, unique: true, sparse: true },
    panCard: {
      number: { type: String },
      images: { type: [String], default: [] },
    },
    license: {
      number: { type: String },
      images: { type: [String], default: [] },
    },
    bankDetails: {
      accountNumber: { type: String },
      ifscCode: { type: String },
      bankName: { type: String, trim: true },
      branch: { type: String, trim: true },
    },
    profileImage: { type: String },
    vehicle: {
      type: String,
      enum: {
        values: ['bike', 'scooter', 'cycle'],
        message: 'Vehicle must be bike, scooter, or cycle',
      },
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'active', 'inactive', 'rejected'],
      default: 'pending',
    },
    isOnline: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    rejectionReason: { type: String },
    zone: {
      id: { type: Schema.Types.ObjectId, ref: 'Zone' },
      name: { type: String },
    },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
    earnings: {
      today: { type: Number, default: 0 },
      week: { type: Number, default: 0 },
      history: [
        {
          date: { type: Date },
          amount: { type: Number },
          paid: { type: Boolean, default: false },
          orderId: { type: Schema.Types.ObjectId, ref: 'Order' }
        },
      ],
    },
    lastPaidAt: { type: Date, default: null },
    nextPaidAt: { type: Date, default: null },
    loginHours: { type: String, default: "0:00" },
    completeAmount: { type: Number, default: 0 },
    ordersCompleted: { type: Number, default: 0 },
    amountToPayDeliveryBoy: { type: Number, default: 0 },
    monthlyAmount: { type: Number, default: 0 },
    pendingOrders: { type: Number, default: 0 },
    inHandCash: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

deliveryBoySchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const DeliveryBoy = model<IDeliveryBoy>('DeliveryBoy', deliveryBoySchema);