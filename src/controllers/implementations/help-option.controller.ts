import { AddHelpOptionControllerResponseDTO, AddHelpOptionDTO } from "../../dto/help-option/add-help-options.dto";
import { IHelpOptionController } from "../interfaces/help-option.controller.interfacaes";
import { IHelpOptionService } from "../../services/interfaces/help-option.service.interfaces";
import { UpdateHelpOptionResponseDTO } from "../../dto/help-option/update-help-option.dto";
import { DeleteHelpOptionResponseDTO } from "../../dto/help-option/delete-help-option.dto";
import { GetHelpOptionResponseDTO } from "../../dto/help-option/get-help-option.dto";

export default class HelpOptionController implements IHelpOptionController {
    private helpOptionService: IHelpOptionService;

    constructor(helpOptionService: IHelpOptionService) {
        this.helpOptionService = helpOptionService;
    }

    async addDeliveryBoyHelpOption(data: AddHelpOptionDTO): Promise<AddHelpOptionControllerResponseDTO> {
        try {
            const helpOption = await this.helpOptionService.addDeliveryBoyHelpOptions(data);
            return {
                success: true,
                data: helpOption,
                message: 'Help option created successfully'
            };
        } catch (error) {
            throw new Error(`Failed to create help option: ${(error as Error).message}`);
        }
    }

    async updateDeliveryBoyHelpOption(id: string, data: AddHelpOptionDTO): Promise<UpdateHelpOptionResponseDTO> {
        try {
            const helpOption = await this.helpOptionService.updateDeliveryBoyHelpOption(id, data);
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

    async deleteDeliveryBoyHelpOption(id: string): Promise<DeleteHelpOptionResponseDTO> {
        try {
            const result = await this.helpOptionService.deleteDeliveryBoyHelpOption(id);
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
            const result = await this.helpOptionService.getAllDeliveryBoyHelpOptions();
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