import { AddHelpOptionDTO } from "../../dto/help-option/add-help-options.dto";

export interface IHelpOptionController {
    addDeliveryBoyHelpOption(data: AddHelpOptionDTO): Promise<any>;
    updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<any>;
    deleteDeliveryBoyHelpOption(id: string): Promise<any>;
    getAllDeliveryBoyHelpOptions(): Promise<any>;
}