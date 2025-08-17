import { AddHelpOptionDTO, AddHelpOptionResponseDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOption } from "../../models/help-option.model";

export interface IHelpOptionService {
    addDeliveryBoyHelpOptions(data: AddHelpOptionDTO): Promise<AddHelpOptionResponseDTO>;
    updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<IHelpOption | null>;
    deleteDeliveryBoyHelpOption(id: string): Promise<boolean>;
    getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]>;
}