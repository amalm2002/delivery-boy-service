import mongoose, { Document, UpdateQuery, Model } from 'mongoose';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await this.model.findById(id).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async updateById(
    id: string,
    update: Partial<T> | UpdateQuery<T>
  ): Promise<{ success: boolean; data?: T; message?: string }> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return { success: false, message: 'Invalid ID' };
      }

      const isOperatorUpdate = Object.keys(update).some(key => key.startsWith('$'));
      const response = await this.model
        .findByIdAndUpdate(id, isOperatorUpdate ? update : { $set: update }, { new: true })
        .exec();

      if (!response) {
        return { success: false, message: 'Document not found or update failed' };
      }

      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: (error as Error).message };
    }
  }
}