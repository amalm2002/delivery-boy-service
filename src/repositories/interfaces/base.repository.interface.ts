import { Document, UpdateQuery, Model } from 'mongoose';

export interface IBaseRepository<T extends Document> {
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, update: Partial<T> | UpdateQuery<T>): Promise<{ success: boolean; data?: T; message?: string }>;
}