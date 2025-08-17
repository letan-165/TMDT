import { IsNotEmpty } from "class-validator";

export class CreateStoreDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;
}

