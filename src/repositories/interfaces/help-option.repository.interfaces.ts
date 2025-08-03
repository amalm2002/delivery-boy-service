import { IHelpOption } from "../../models/help-option.model";

export interface IHelpOptionRepository {
    addDeliveryBoyHelpOption(title: string, description: string, isActive: boolean, category: string): Promise<IHelpOption>;
    updateDeliveryBoyHelpOption(id: string, data: Partial<IHelpOption>): Promise<IHelpOption | null>;
    deleteDeliveryBoyHelpOption(id: string): Promise<boolean>;
    getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]>;
}