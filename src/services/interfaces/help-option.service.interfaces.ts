import { AddHelpOptionDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOption } from "../../models/help-option.model";

export interface IHelpOptionService {
    addDeliveryBoyHelpOptions(data: AddHelpOptionDTO): Promise<IHelpOption>;
    updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<IHelpOption | null>;
    deleteDeliveryBoyHelpOption(id: string): Promise<boolean>;
    getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]>;
}