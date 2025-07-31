import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateDiscountDto {
    @IsNotEmpty()
    @IsMongoId()
    sellerId: string;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    value: number;
    
    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    minOrder: number;

    @IsNotEmpty()
    maxDiscount: number;

    @IsNotEmpty()
    expiryDate: Date;
}
