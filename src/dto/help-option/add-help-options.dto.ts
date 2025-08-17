export interface AddHelpOptionDTO {
    title: string;
    description: string;
    category: string;
    isActive: boolean;
}

export interface AddHelpOptionResponseDTO {
    id?: string;
    title: string;
    description?: string;
    category: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AddHelpOptionControllerResponseDTO {
    success: boolean;
    data: AddHelpOptionResponseDTO;
    message: string;
}