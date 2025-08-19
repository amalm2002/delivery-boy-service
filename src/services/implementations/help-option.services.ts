import { AddHelpOptionDTO, AddHelpOptionResponseDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOptionRepository } from "../../repositories/interfaces/help-option.repository.interfaces";
import { IHelpOptionService } from "../interfaces/help-option.service.interfaces";
import { IHelpOption } from "../../models/help-option.model";

export default class HelpOptionService implements IHelpOptionService {

    constructor(
        private readonly _helpOptionRepository: IHelpOptionRepository
    ) { }

    async addDeliveryBoyHelpOptions(data: AddHelpOptionDTO): Promise<AddHelpOptionResponseDTO> {
        const { title, description, category, isActive } = data;
        return await this._helpOptionRepository.addDeliveryBoyHelpOption(title, description, isActive, category);
    }

    async updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<IHelpOption | null> {
        const { title, description, category, isActive } = data;
        // console.log('update data :', await this._helpOptionRepository.updateDeliveryBoyHelpOption(id, { title, description, category, isActive }))
        return await this._helpOptionRepository.updateDeliveryBoyHelpOption(id, { title, description, category, isActive });
    }

    async deleteDeliveryBoyHelpOption(id: string): Promise<boolean> {
        return await this._helpOptionRepository.deleteDeliveryBoyHelpOption(id);
    }

    async getAllDeliveryBoyHelpOptions(): Promise<IHelpOption[]> {
        return await this._helpOptionRepository.getAllDeliveryBoyHelpOptions();
    }
}