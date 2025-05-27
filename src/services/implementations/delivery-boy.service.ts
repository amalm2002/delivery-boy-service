import mongoose from 'mongoose';
import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';
import { IZoneRepository } from '../../repositories/interfaces/zone.repository.interface';
import { IDeliveryBoyService } from '../interfaces/delivery-boy.service.interface';
import { CreateDeliveryBoyDto } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { UpdateLocationDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { IAuthService } from '../interfaces/auth.service.interface';
import { response } from 'express';

export class DeliveryBoyService implements IDeliveryBoyService {
  constructor(
    private deliveryBoyRepository: IDeliveryBoyRepository,
    private zoneRepository: IZoneRepository,
    private authService: IAuthService
  ) { }

  private async handleLogin(deliveryBoy: IDeliveryBoy): Promise<{
    message: string;
    deliveryBoyName?: string;
    mobile?: string;
    token?: string;
    _id?: string;
    isOnline?: boolean;
    isVerified?: boolean;
    refreshToken?: string;
    isActive?: boolean;
    isRejected?: boolean;
    deliveryBoy?: IDeliveryBoy;
    role?: string;
    rejectionReason?: string;
  }> {
    const role = 'DeliveryBoy';
    const token = await this.authService.createToken(deliveryBoy._id.toString(), '15m', role);
    const refreshToken = await this.authService.createToken(deliveryBoy._id.toString(), '7d', role);

    return {
      message: 'Success',
      deliveryBoyName: deliveryBoy.name,
      mobile: deliveryBoy.mobile,
      token,
      _id: deliveryBoy._id.toString(),
      isOnline: deliveryBoy.isOnline,
      isVerified: deliveryBoy.isVerified,
      refreshToken,
      isActive: deliveryBoy.isActive,
      isRejected: !!deliveryBoy.rejectionReason,
      deliveryBoy,
      role,
      rejectionReason: deliveryBoy.rejectionReason,
    };
  }

  async registerDeliveryBoy(dto: CreateDeliveryBoyDto): Promise<{
    success: boolean;
    message: string;
    deliveryBoyName?: string;
    mobile?: string;
    token?: string;
    _id?: string;
    isOnline?: boolean;
    isVerified?: boolean;
    refreshToken?: string;
    isActive?: boolean;
    isRejected?: boolean;
    deliveryBoy?: IDeliveryBoy;
    role?: string;
    rejectionReason?: string;
    missingFields?: string;
  }> {
    const { mobile } = dto;
    if (!mobile) {
      return { message: 'Mobile number is required', success: false };
    }

    let deliveryBoy = await this.deliveryBoyRepository.findByMobile(mobile);

    if (!deliveryBoy) {
      const deliveryBoyData: Partial<IDeliveryBoy> = {
        mobile,
        isOnline: false,
        isVerified: false,
        status: 'pending',
      };
      deliveryBoy = await this.deliveryBoyRepository.create(deliveryBoyData);
    }

    let missingMessages = '';
    if (!deliveryBoy.location?.latitude || !deliveryBoy.location?.longitude) {
      missingMessages = 'location';
    } else if (!deliveryBoy.name) {
      missingMessages = 'details';
    } else if (
      !deliveryBoy.panCard?.number ||
      !deliveryBoy.panCard?.images?.length ||
      !deliveryBoy.license?.number ||
      !deliveryBoy.license?.images?.length ||
      !deliveryBoy.bankDetails?.accountNumber ||
      !deliveryBoy.bankDetails?.ifscCode ||
      !deliveryBoy.profileImage
    ) {
      missingMessages = 'details';
    } else if (!deliveryBoy.vehicle) {
      missingMessages = 'vehicle';
    } else if (!deliveryBoy.zone?.id) {
      missingMessages = 'zone';
    }

    const loginData = await this.handleLogin(deliveryBoy);

    if (missingMessages) {
      return {
        ...loginData,
        success: false,
        message: 'Incomplete registration',
        missingFields: missingMessages,
      };
    }

    return {
      ...loginData,
      message: 'You are already registered',
      success: true,
    };
  }

  async updateLocation(dto: UpdateLocationDto) {
    try {
      const result = await this.deliveryBoyRepository.deliveryBoyLocationUpdate(dto);

      if (!result.success) {
        return {
          success: false,
          message: result.message || 'DeliveryBoy not found or update failed',
        };
      }

      return {
        success: true,
        message: 'Location updated successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async updateDetails(dto: UpdateDetailsDto) {
    try {
      const { deliveryBoyId, ...updateFields } = dto;
      //   const updateData: Partial<IDeliveryBoy> = {};
      const updateData: any = {};

      if (updateFields.name) updateData.name = updateFields.name;
      if (updateFields.panCard) {
        if (updateFields.panCard.number) updateData['panCard.number'] = updateFields.panCard.number;
        if (updateFields.panCard.images) updateData['panCard.images'] = updateFields.panCard.images;
      }
      if (updateFields.license) {
        if (updateFields.license.number) updateData['license.number'] = updateFields.license.number;
        if (updateFields.license.images) updateData['license.images'] = updateFields.license.images;
      }
      if (updateFields.bankDetails) {
        if (updateFields.bankDetails.accountNumber) updateData['bankDetails.accountNumber'] = updateFields.bankDetails.accountNumber;
        if (updateFields.bankDetails.ifscCode) updateData['bankDetails.ifscCode'] = updateFields.bankDetails.ifscCode;
        if (updateFields.bankDetails.bankName) updateData['bankDetails.bankName'] = updateFields.bankDetails.bankName;
        if (updateFields.bankDetails.branch) updateData['bankDetails.branch'] = updateFields.bankDetails.branch;
      }
      if (updateFields.profileImage) updateData.profileImage = updateFields.profileImage;

      const result = await this.deliveryBoyRepository.updateById(deliveryBoyId, updateData);

      if (!result.success) {
        return {
          success: false,
          message: result.message || 'DeliveryBoy not found or update failed',
        };
      }

      return {
        success: true,
        message: 'Details updated successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async updateVehicle(dto: UpdateVehicleDto) {
    try {
      const { deliveryBoyId, vehicle } = dto;
      const updateData: Partial<IDeliveryBoy> = { vehicle };

      const result = await this.deliveryBoyRepository.updateById(deliveryBoyId, updateData);

      if (!result.success) {
        return {
          success: false,
          message: result.message || 'DeliveryBoy not found or update failed',
        };
      }

      return {
        success: true,
        message: 'Vehicle updated successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async updateZone(dto: UpdateZoneDto) {
    try {
      const { deliveryBoyId, zone } = dto;

      const zoneDoc = await this.zoneRepository.findById(zone);
      if (!zoneDoc) {
        return {
          success: false,
          message: 'Zone not found',
        };
      }

      const updateData: Partial<IDeliveryBoy> = {
        zone: {
          id: zoneDoc._id.toString(),
          name: zoneDoc.name,
        },
      };

      const result = await this.deliveryBoyRepository.updateById(deliveryBoyId, updateData);

      if (!result.success) {
        return {
          success: false,
          message: result.message || 'DeliveryBoy not found or update failed',
        };
      }

      return {
        success: true,
        message: 'Zone updated successfully',
        data: result.data,
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message,
      };
    }
  }

  async getAllDeliveryBoys(): Promise<Partial<IDeliveryBoy>[]> {
    try {
      return await this.deliveryBoyRepository.getAllDeliveryBoys();
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateDeliveryBoyStatus(deliveryBoyId: string): Promise<IDeliveryBoy | null> {
    try {
      return await this.deliveryBoyRepository.updateTheDeliveryBoyStatus(deliveryBoyId);
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async fetchDeliveryBoyDetails(deliveryBoyId: string): Promise<IDeliveryBoy | null> {
    try {
      return await this.deliveryBoyRepository.findById(deliveryBoyId);
    } catch (error) {
      throw new Error(`Error fetching delivery boy details: ${(error as Error).message}`);
    }
  }

  async verifyDocuments(dto: VerifyDocumentsDto): Promise<IDeliveryBoy | { message: string }> {
    try {
      return await this.deliveryBoyRepository.verifyDeliveryBoyDocuments(dto.deliveryBoyId);
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async rejectDocuments(dto: RejectDocumentsDto): Promise<IDeliveryBoy | { message: string }> {
    try {
      return await this.deliveryBoyRepository.rejectDeliveryBoyDocuments(dto.deliveryBoyId, dto.rejectionReason);
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async getRejectedDocuments(deliveryBoyId: string): Promise<{ success: boolean; data?: Partial<IDeliveryBoy>; message?: string }> {
    try {
      const response = await this.deliveryBoyRepository.getRejectedDocuments(deliveryBoyId);
      console.log('service side response :',response);
      
      return response
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}