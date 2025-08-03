import { HelpOptionModel, IHelpOption } from "../../models/help-option.model";
import { IHelpOptionRepository } from "../interfaces/help-option.repository.interfaces";
import { BaseRepository } from "./base.repository";

export default class HelpOptionRepository extends BaseRepository<IHelpOption> implements IHelpOptionRepository {
    constructor() {
        super(HelpOptionModel);
    }

    async addDeliveryBoyHelpOption(title: string, description: string, isActive: boolean, category: string): Promise<IHelpOption> {
        const helpOption = await this.create({
            title,
            description,
            isActive,
            category,
            createdAt: new Date()
        });
        return helpOption;
    }

    async updateDeliveryBoyHelpOption(id: string, data: Partial<IHelpOption>): Promise<IHelpOption | null> {
        try {
            const updatedOption = await this.model.findByIdAndUpdate(
                id,
                { $set: { ...data, updatedAt: new Date() } },
                { new: true }
            ).exec();
            return updatedOption;
        } catch (error) {
            console.error('Error updating help option:', error);
            return null;
        }
    }

    async deleteDeliveryBoyHelpOption(id: string): Promise<boolean> {
        try {
            const result = await this.model.findByIdAndDelete(id).exec();
            return !!result;
        } catch (error) {
            console.error('Error deleting help option:', error);
            return false;
        }
    }

    async getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]> {
        return await this.model.find().exec();
    }
}