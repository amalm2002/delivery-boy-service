import { AddHelpOptionControllerResponseDTO, AddHelpOptionDTO } from "../../dto/help-option/add-help-options.dto";
import { DeleteHelpOptionResponseDTO } from "../../dto/help-option/delete-help-option.dto";
import { GetHelpOptionResponseDTO } from "../../dto/help-option/get-help-option.dto";
import { UpdateHelpOptionResponseDTO } from "../../dto/help-option/update-help-option.dto";

export interface IHelpOptionController {
    addDeliveryBoyHelpOption(data: AddHelpOptionDTO): Promise<AddHelpOptionControllerResponseDTO>;
    updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<UpdateHelpOptionResponseDTO>;
    deleteDeliveryBoyHelpOption(id: string): Promise<DeleteHelpOptionResponseDTO>;
    getAllDeliveryBoyHelpOptions(): Promise<GetHelpOptionResponseDTO>;
}