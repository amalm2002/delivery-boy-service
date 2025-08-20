import { AddHelpOptionDTO, AddHelpOptionResponseDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOption } from "../../models/help-option.model";

export interface IHelpOptionService {
    addDeliveryBoyHelpOptions(helpOptionDetails: AddHelpOptionDTO): Promise<AddHelpOptionResponseDTO>;
    updateDeliveryBoyHelpOption(helpOptionId: string, updatedHelpOption: AddHelpOptionDTO): Promise<IHelpOption | null>;
    deleteDeliveryBoyHelpOption(helpOptionId: string): Promise<boolean>;
    getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]>;
}