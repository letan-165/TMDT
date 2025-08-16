import { IsNotEmpty } from "class-validator";

export class CreateStoreDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    address: string;
}

