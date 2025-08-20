import { AddHelpOptionControllerResponseDTO, AddHelpOptionDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOptionController } from "../interfaces/help-option.controller.interfacaes";
import { IHelpOptionService } from "../../services/interfaces/help-option.service.interfaces";
import { UpdateHelpOptionResponseDTO } from "../../dto/help-option/update-help-option.dto";
import { DeleteHelpOptionResponseDTO } from "../../dto/help-option/delete-help-option.dto";
import { GetHelpOptionResponseDTO } from "../../dto/help-option/get-help-option.dto";

export default class HelpOptionController implements IHelpOptionController {

    constructor(
        private readonly _helpOptionService: IHelpOptionService
    ) { }

    async addDeliveryBoyHelpOption(helpOptionDetails: AddHelpOptionDTO): Promise<AddHelpOptionControllerResponseDTO> {
        try {
            const helpOption = await this._helpOptionService.addDeliveryBoyHelpOptions(helpOptionDetails);
            return {
                success: true,
                data: helpOption,
                message: 'Help option created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create help option: ${(error as Error).message}`);
        }
    }

    async updateDeliveryBoyHelpOption(helpOptionId: string, updatedHelpOption: AddHelpOptionDTO): Promise<UpdateHelpOptionResponseDTO> {
        try {
            const helpOption = await this._helpOptionService.updateDeliveryBoyHelpOption(helpOptionId, updatedHelpOption);
            if (!helpOption) {
                return {
                    success: false,
                    message: 'Help option not found'
                };
            }
            return {
                success: true,
                data: helpOption,
                message: 'Help option updated successfully'
            };
        } catch (error) {
            throw new Error(`Failed to update help option: ${(error as Error).message}`);
        }
    }

    async deleteDeliveryBoyHelpOption(helpOptionId: string): Promise<DeleteHelpOptionResponseDTO> {
        try {
            const result = await this._helpOptionService.deleteDeliveryBoyHelpOption(helpOptionId);
            if (!result) {
                return {
                    success: false,
                    message: 'Help option not found'
                };
            }
            return {
                success: true,
                message: 'Help option deleted successfully'
            };
        } catch (error) {
            throw new Error(`Failed to delete help option: ${(error as Error).message}`);
        }
    }

    async getAllDeliveryBoyHelpOptions(): Promise<GetHelpOptionResponseDTO> {
        try {
            const result = await this._helpOptionService.getAllDeliveryBoyHelpOptions();
            if (!result) {
                return {
                    success: false,
                    message: 'Help option not found'
                };
            }
            return {
                success: true,
                message: 'Help option fetch successfully',
                data: result
            };
        } catch (error) {
            throw new Error(`Failed to delete help option: ${(error as Error).message}`);
        }
    }
}