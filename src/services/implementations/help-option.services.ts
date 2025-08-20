import { AddHelpOptionDTO, AddHelpOptionResponseDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOptionRepository } from "../../repositories/interfaces/help-option.repository.interfaces";
import { IHelpOptionService } from "../interfaces/help-option.service.interfaces";
import { IHelpOption } from "../../models/help-option.model";

export default class HelpOptionService implements IHelpOptionService {

    constructor(
        private readonly _helpOptionRepository: IHelpOptionRepository
    ) { }

    async addDeliveryBoyHelpOptions(helpOptionDetails: AddHelpOptionDTO): Promise<AddHelpOptionResponseDTO> {
        const { title, description, category, isActive } = helpOptionDetails;
        return await this._helpOptionRepository.addDeliveryBoyHelpOption(title, description, isActive, category);
    }

    async updateDeliveryBoyHelpOption(helpOptionId: string, updatedHelpOption: AddHelpOptionDTO): Promise<IHelpOption | null> {
        const { title, description, category, isActive } = updatedHelpOption;
        return await this._helpOptionRepository.updateDeliveryBoyHelpOption(helpOptionId, { title, description, category, isActive });
    }

    async deleteDeliveryBoyHelpOption(helpOptionId: string): Promise<boolean> {
        return await this._helpOptionRepository.deleteDeliveryBoyHelpOption(helpOptionId);
    }

    async getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]> {
        return await this._helpOptionRepository.getAllDeliveryBoyHelpOptions();
    }
}