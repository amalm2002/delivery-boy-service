import { IDeliveryBoyRepository } from '../../repositories/interfaces/delivery-boy.repository.interface';
import { IZoneRepository } from '../../repositories/interfaces/zone.repository.interface';
import { IDeliveryBoyService } from '../interfaces/delivery-boy.service.interface';
import { CreateDeliveryBoyDto, CreateDeliveryBoyResponseDTO } from '../../dto/delivery-boy/create.delivery-boy.dto';
import { DeliveryBoyDto, UpdateLocationDto, UpdateLocationResponseDto } from '../../dto/delivery-boy/update.location.dto';
import { UpdateDetailsDto, UpdateDetailsResponseDTO } from '../../dto/delivery-boy/update.details.dto';
import { UpdateVehicleDto, UpdateVehicleResponseDTO } from '../../dto/delivery-boy/update.vehicle.dto';
import { UpdateZoneDto, UpdateZoneResponseDTO } from '../../dto/delivery-boy/update.zone.dto';
import { VerifyDocumentsDto } from '../../dto/delivery-boy/verify.documents.dto';
import { GetRejectedDocumentDTO, GetRejectedDocumentServiceResponseDTO, RejectDocumentsDto } from '../../dto/delivery-boy/reject.documents.dto';
import { IDeliveryBoy } from '../../models/delivery-boy.model';
import { IAuthService } from '../interfaces/auth.service.interface';
import { FetchDeliveryBoyDTO } from '../../dto/delivery-boy/fetch-delivery-boy.dto';
import { AddRidePaymentRuleDTO, AddRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment-rule.dto';
import { IDeliveryRateModelRepository } from '../../repositories/interfaces/delivery-rate-model.repository.interfaces';
import { BlockRidePaymentRuleDTO, GetRideratePaymentRuleDTO, UnblockRidePaymentRuleDTO, UpdateRidePaymentRuleDTO, UpdateRidePaymentRuleResponseDTO } from '../../dto/delivery-boy/ride-payment.dto';
import { CheckTheInHandCashLimitDTO, CheckTheInHandCashLimitResponseDTO, UpdatedeliveryBoyEarningsDTO, UpdatedeliveryBoyEarningsResponseDTO } from '../../dto/delivery-boy/earnings-section.dto';
import { DeliveryBoyReviewResponseDTO, UserReviewDTO } from '../../dto/delivery-boy/user-review.dto';


export class DeliveryBoyService implements IDeliveryBoyService {
  constructor(
    private deliveryBoyRepository: IDeliveryBoyRepository,
    private zoneRepository: IZoneRepository,
    private authService: IAuthService,
    private deliveryRateRepository: IDeliveryRateModelRepository,
  ) { }

  private async handleLogin(deliveryBoy: IDeliveryBoy): Promise<CreateDeliveryBoyResponseDTO> {
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

  async registerDeliveryBoy(dto: CreateDeliveryBoyDto): Promise<CreateDeliveryBoyResponseDTO> {
    const { mobile } = dto;
    if (!mobile) {
      return { message: 'Mobile number is required', success: false };
    }

    let deliveryBoy = await this.deliveryBoyRepository.findByMobile(mobile);

    if (!deliveryBoy) {
      const deliveryBoyData: Partial<DeliveryBoyDto> = {
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

  async updateLocation(dto: UpdateLocationDto): Promise<UpdateLocationResponseDto> {
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

  async updateDetails(dto: UpdateDetailsDto): Promise<UpdateDetailsResponseDTO> {
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

  async updateVehicle(dto: UpdateVehicleDto): Promise<UpdateVehicleResponseDTO> {
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

  async updateZone(dto: UpdateZoneDto): Promise<UpdateZoneResponseDTO> {
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

  async getAllDeliveryBoys(): Promise<Partial<DeliveryBoyDto>[]> {
    try {
      return await this.deliveryBoyRepository.getAllDeliveryBoys();
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async getAllDeliveryBoy(): Promise<Partial<DeliveryBoyDto>[]> {
    try {
      return await this.deliveryBoyRepository.getAllDeliveryBoy();
    } catch (error) {
      throw new Error(`Error fetching delivery boys: ${(error as Error).message}`);
    }
  }

  async updateDeliveryBoyStatus(data: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null> {
    try {
      const { id } = data
      const deliveryBoyId = id
      return await this.deliveryBoyRepository.updateTheDeliveryBoyStatus(deliveryBoyId);
    } catch (error) {
      throw new Error(`Error updating delivery boy status: ${(error as Error).message}`);
    }
  }

  async fetchDeliveryBoyDetails(data: FetchDeliveryBoyDTO): Promise<DeliveryBoyDto | null> {
    try {
      const { id } = data
      const deliveryBoyId = id
      const response = await this.deliveryBoyRepository.findById(deliveryBoyId);
      console.log('response on the sevice side :', response);
      return response
    } catch (error) {
      throw new Error(`Error fetching delivery boy details: ${(error as Error).message}`);
    }
  }

  async verifyDocuments(dto: VerifyDocumentsDto): Promise<DeliveryBoyDto | { message: string }> {
    try {
      return await this.deliveryBoyRepository.verifyDeliveryBoyDocuments(dto.deliveryBoyId);
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async rejectDocuments(dto: RejectDocumentsDto): Promise<DeliveryBoyDto | { message: string }> {
    try {
      return await this.deliveryBoyRepository.rejectDeliveryBoyDocuments(dto.deliveryBoyId, dto.rejectionReason);
    } catch (error) {
      return { message: (error as Error).message };
    }
  }

  async getRejectedDocuments(data: GetRejectedDocumentDTO): Promise<GetRejectedDocumentServiceResponseDTO> {
    try {
      const response = await this.deliveryBoyRepository.getRejectedDocuments(data.id);
      return response
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async addRidePaymentRule(data: AddRidePaymentRuleDTO): Promise<AddRidePaymentRuleResponseDTO> {
    try {
      const response = await this.deliveryRateRepository.createRidePaymentRule(data)
      return {
        success: true,
        message: 'Ride payment rule created successfully',
        data: response
      }
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async getRideratePaymentRule(data: void): Promise<GetRideratePaymentRuleDTO> {
    try {
      const response = await this.deliveryRateRepository.getRideRatePaymentRules(data)
      return {
        success: true,
        message: 'Fetch the all ride rate payments successfully',
        data: response
      }
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async updateRidePaymentRule(data: UpdateRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {
      const existingRule = await this.deliveryRateRepository.findOne({ _id: data.id });
      if (!existingRule) {
        throw new Error(`Rule with ID "${data.id}" not found`);
      }
      const response = await this.deliveryRateRepository.updateOne(
        { _id: data.id },
        {
          minKm: data.KM,
          ratePerKm: data.ratePerKm,
          vehicleType: data.vehicleType as 'bike' | 'scooter' | 'cycle',
          isActive: data.isActive,
        }
      );
      return {
        success: true,
        message: 'Ride payment rule updated successfully',
        data: response,
      };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async blockRidePaymentRule(data: BlockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {

      const pendingOrders = await this.deliveryBoyRepository.countPendingOrdersByVehicleType(data.vehicleType);
      if (pendingOrders > 0) {
        throw new Error(`Cannot block rule for "${data.vehicleType}" because ${pendingOrders} delivery boy(s) have pending orders`);
      }

      const existingRule = await this.deliveryRateRepository.findOne({ _id: data.id });
      if (!existingRule) {
        throw new Error(`Rule with ID "${data.id}" not found`);
      }
      if (!existingRule.isActive) {
        throw new Error(`Rule with ID "${data.id}" is already blocked`);
      }

      const response = await this.deliveryRateRepository.updateOne(
        { _id: data.id },
        { isActive: false, updatedAt: new Date() }
      );
      return {
        success: true,
        message: 'Ride payment rule blocked successfully',
        data: response,
      };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async unblockRidePaymentRule(data: UnblockRidePaymentRuleDTO): Promise<UpdateRidePaymentRuleResponseDTO> {
    try {
      const existingRule = await this.deliveryRateRepository.findOne({ _id: data.id });
      if (!existingRule) {
        throw new Error(`Rule with ID "${data.id}" not found`);
      }
      if (existingRule.isActive) {
        throw new Error(`Rule with ID "${data.id}" is already active`);
      }

      const response = await this.deliveryRateRepository.updateOne(
        { _id: data.id },
        { isActive: true, updatedAt: new Date() }
      );
      return {
        success: true,
        message: 'Ride payment rule unblocked successfully',
        data: response,
      };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async checkTheInHandCashLimit(data: CheckTheInHandCashLimitDTO): Promise<CheckTheInHandCashLimitResponseDTO> {
    try {
      const { deliveryBoyId } = data
      const deliveryBoy = await this.deliveryBoyRepository.findOne(deliveryBoyId)
      if (!deliveryBoy) {
        return { success: false, message: 'No deliveryBoy Found!' }
      }

      if (deliveryBoy.inHandCash > 1000) {
        const isOnline = false
        await this.deliveryBoyRepository.setOffLineOnPartner(deliveryBoyId, isOnline)
        return { success: false, message: 'Your In-Hand cash limit is exceed please pay the cash after get your order' }
      }
      return { success: true, message: 'No Cash limit is exceed' }
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }

  async updatedeliveryBoyEarnings(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO> {
    try {
      const deliveryBoy = await this.deliveryBoyRepository.findById(data.deliveryBoyId);
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }

      const now = new Date();

      const originalCompleteAmount = deliveryBoy.completeAmount || 0;
      const originalMonthlyAmount = deliveryBoy.monthlyAmount || 0;
      const originalInHandCash = deliveryBoy.inHandCash || 0;

      const lastPaidAt = new Date(now);
      lastPaidAt.setDate(now.getDate() - 1);

      const nextPaidAt = deliveryBoy.nextPaidAt || new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const updatedHistory = deliveryBoy.earnings.history.map((entry: any) => {
        const entryDate = new Date(entry.date);
        if (entryDate < now && entry.paid === false) {
          return { ...entry, paid: true };
        }
        return entry;
      });


      deliveryBoy.earnings.today = 0;
      deliveryBoy.earnings.week = 0;
      deliveryBoy.earnings.history = updatedHistory;
      deliveryBoy.lastPaidAt = lastPaidAt;
      deliveryBoy.nextPaidAt = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      deliveryBoy.inHandCash = 0;
      deliveryBoy.amountToPayDeliveryBoy = 0;
      deliveryBoy.completeAmount = 0;
      deliveryBoy.monthlyAmount = 0;

      await deliveryBoy.save();

      // const paidEarnings = updatedHistory
      //   .filter((entry: any) => entry.paid === true && new Date(entry.date) <= lastPaidAt)
      //   .map((entry: any) => ({
      //     date: entry.date,
      //     amount: entry.amount,
      //     paymentId: entry._id.toString(),
      //   }));

      return {
        success: true,
        message: 'Earnings updated after payment',
        data: {
          completeAmount: originalCompleteAmount,
          monthlyAmount: originalMonthlyAmount,
          inHandCash: originalInHandCash,
          // earnings: paidEarnings
        }
      };

    } catch (error) {
      throw new Error(`Error in updatedeliveryBoyEarnings: ${(error as Error).message}`);
    }
  }

  async clearInHandCashOnDeliveryBoy(data: UpdatedeliveryBoyEarningsDTO): Promise<UpdatedeliveryBoyEarningsResponseDTO> {
    try {
      const { deliveryBoyId, amount } = data;

      const deliveryBoy = await this.deliveryBoyRepository.findById(deliveryBoyId);
      if (!deliveryBoy) {
        throw new Error('Delivery boy not found');
      }

      const originalInHandCash = deliveryBoy.inHandCash || 0;
      const originalAmountToPayDeliveryBoy = deliveryBoy.amountToPayDeliveryBoy || 0;

      if (amount !== originalInHandCash && amount !== originalAmountToPayDeliveryBoy) {
        throw new Error(`Invalid amount: ${amount}. Must match either inHandCash (${originalInHandCash}) or amountToPayDeliveryBoy (${originalAmountToPayDeliveryBoy}).`);
      }

      const updateResult = await this.deliveryBoyRepository.updateById(deliveryBoyId, {
        inHandCash: 0,
        amountToPayDeliveryBoy: 0,
        isOnline: true
      });

      if (!updateResult.success || !updateResult.data) {
        throw new Error(updateResult.message || 'Failed to update delivery boy');
      }

      return {
        success: true,
        data: {
          completeAmount: 0,
          monthlyAmount: 0,
          inHandCash: originalInHandCash,
          amountToPayDeliveryBoy: originalAmountToPayDeliveryBoy,
          earnings: [],
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Error in clearInHandCashOnDeliveryBoy: ${(error as Error).message}`,
      };
    }
  }

  async userReviewForDeliveryBoy(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const deliveryBoy = await this.deliveryBoyRepository.findById(data.deliveryBoyId);

      if (!deliveryBoy) {
        return { success: false, message: "Delivery boy not found" };
      }

      const updated = await this.deliveryBoyRepository.addReview(data.deliveryBoyId, {
        ...data,
        createdAt: new Date()
      });

      const latestReview = updated.reviews[updated.reviews.length - 1];

      const response: DeliveryBoyReviewResponseDTO = {
        success: true,
        message: "Review added",
        data: {
          deliveryBoyId: updated._id.toString(),
          review: {
            userId: latestReview.userId.toString(),
            orderId: latestReview.orderId.toString(),
            rating: latestReview.rating,
            comment: latestReview.comment,
            createdAt: latestReview.createdAt,
          }
        }
      };

      return response;
    } catch (error) {
      return {
        success: false,
        message: `Error in user review on delivery-boy side: ${(error as Error).message}`,
      }
    }
  }

  async getDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const { deliveryBoyId, userId, orderId } = data

      const deliveryBoy = await this.deliveryBoyRepository.findById(data.deliveryBoyId);

      if (!deliveryBoy) {
        return { success: false, message: "Delivery boy not found" };
      }

      const reviewData = await this.deliveryBoyRepository.findReviewByUserOrderAndDeliveryBoy(deliveryBoyId, userId, orderId);

      if (!reviewData || !reviewData.reviews?.length) {
        return { success: false, message: "Review not found" };
      }

      const review = reviewData.reviews[0];
      const { rating, comment, createdAt } = review;

      return {
        success: true,
        message: "Fetched successfully",
        data: {
          deliveryBoyId,
          review: {
            userId,
            orderId,
            rating,
            comment,
            createdAt,
          },
        },
      };

    } catch (error) {
      return {
        success: false,
        message: `Error in get user review on delivery-boy side: ${(error as Error).message}`,
      }
    }
  }

  async deleteDeliveryBoyReview(data: UserReviewDTO): Promise<DeliveryBoyReviewResponseDTO> {
    try {
      const { deliveryBoyId, userId, orderId } = data;

      const deliveryBoy = await this.deliveryBoyRepository.findById(deliveryBoyId);
      if (!deliveryBoy) {
        return { success: false, message: "Delivery boy not found" };
      }

      await this.deliveryBoyRepository.updateOne({ _id: deliveryBoyId },
        {
          $pull: {
            reviews: {
              userId: userId,
              orderId: orderId
            }
          }
        }
      );

      return {
        success: true,
        message: "Review deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting review: ${(error as Error).message}`,
      };
    }
  }

}
